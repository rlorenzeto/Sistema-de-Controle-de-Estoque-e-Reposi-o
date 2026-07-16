import pool from '../config/database.js'

export const getDashboardData = async (req, res) => {
    try{
        const totalProductsStock = await pool.query(
            'SELECT COALESCE (SUM(quantidade_estoque_atual), 0) AS total FROM public.possui_estoque'
        )

        const totalSales = await pool.query(
            'SELECT COALESCE (SUM(quantidade_venda), 0) AS total FROM public.possui_venda'
        )

        const totalSuppliers = await pool.query(
            'SELECT COUNT(*) AS total FROM public.fornecedores'
        )

        const getLowStock = await pool.query(`
            SELECT
                p.id_produto,
                p.nome_produto,
                e.quantidade_estoque_total,
                e.quantidade_inicial_atual,
                CASE
                    WHEN e.quantidade_estoque_total <= e.quantidade_estoque_atual * 0.25 THEN 'Crítico'
                    WHEN e.quantidade_estoque_total <= e.quantidade_estoque_atual * 0.5 THEN 'Alerta'
                END AS status
            FROM public.produto p
            JOIN public.estoque e
                ON e.id_produto = p.id_produto
            WHERE e.quantidade_estoque_atual <= e.quantidade_estoque_total * 0.5
            ORDER BY e.quantidade_estoque_atual ASC
            LIMIT 5
        `)

        return res.status(200).json({
            totalProductsStock: totalProductsStock.row[0].total,
            totalSales: totalSales.rows[0].total,
            totalSuppliers: totalSuppliers.rows[0].total,
            lowStock: lowStock.rows
        })
    } catch (error){
        return res.status(500).json({
            message: 'Erro ao buscar dados do dashboard',
            error: error.message
        })
    }
}