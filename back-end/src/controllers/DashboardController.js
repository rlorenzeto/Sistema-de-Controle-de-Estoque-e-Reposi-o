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
            'SELECT COUNT(*) AS total FROM public.fornecedor'
        )

        const lowStock = await pool.query(`
            SELECT
                p.id_produto,
                p.nome_produto,
                e.quantidade_estoque_total,
                e.quantidade_estoque_atual,
                CASE
                    WHEN e.quantidade_estoque_total <= e.quantidade_estoque_atual * 0.25 THEN 'Crítico'
                    WHEN e.quantidade_estoque_total <= e.quantidade_estoque_atual * 0.5 THEN 'Alerta'
                END AS status
            FROM public.produto p
            JOIN public.possui_estoque e
                ON e.id_produto = p.id_produto
            WHERE e.quantidade_estoque_atual <= e.quantidade_estoque_total * 0.5
            ORDER BY e.quantidade_estoque_atual ASC
            LIMIT 5
        `)

        const salesEvolution = await pool.query(`
            WITH dias AS (
                SELECT generate_series(
                current_date - interval '6 days',
                current_date,
                interval '1 day'
                )::date AS dia
            )
            SELECT
                dias.dia,
                COALESCE(COUNT(v.id_venda), 0) AS total_vendas,
                COALESCE(SUM(v.valor_venda), 0) AS valor_total
            FROM dias
            LEFT JOIN public.venda v
                ON v.data_venda::date = dias.dia
            GROUP BY dias.dia
            ORDER BY dias.dia
        `)

        const recentProducts = await pool.query(`
            SELECT COUNT(*) AS total
            FROM public.produto
            WHERE data_cadastro >= current_date - interval '6 days'
        `);

        const recentSales = await pool.query(`
            SELECT COUNT(*) AS total
            FROM public.venda
            WHERE data_venda >= current_date - interval '6 days'
        `);

        const recentSuppliers = await pool.query(`
            SELECT COUNT(*) AS total
            FROM public.fornecedor
            WHERE data_cadastro >= current_date - interval '6 days'
        `);

        return res.status(200).json({
            totalProductsStock: totalProductsStock.rows[0].total,
            totalSales: totalSales.rows[0].total,
            totalSuppliers: totalSuppliers.rows[0].total,
            lowStock: lowStock.rows,
            salesEvolution: salesEvolution.rows,
            recentProducts: recentProducts.rows[0].total,
            recentSales: recentSales.rows[0].total,
            recentSuppliers: recentSuppliers.rows[0].total
        })
    } catch (error){
        return res.status(500).json({
            message: 'Erro ao buscar dados do dashboard',
            error: error.message
        })
    }
}

export const replacement = async (req, res) => {
    const { id_produto, id_estoque, quantidade_reposicao } = req.body;

    if(!id_produto || !id_estoque || !quantidade_reposicao || quantidade_reposicao == null)
        return res.status(400).json({ message: 'Dados inexistentes' })

    try{
        const result = await pool.query(
            `
            UPDATE public.possui_estoque
            SET quantidade_estoque_atual = quantidade_estoque_atual + $1
            WHERE id_produto = $2 AND id_estoque = $3
            RETURNING *;
            `,
            [quantidade_reposicao, id_produto, id_estoque]
        )

        if(result.rowCount === 0)
            return res.status(404).json({ message: "Relação produto/estoque não encontrada"})

        return res.status(200).json({ message: "Reposição realizada com sucesso",
            data: result.rows[0],
        })

    } catch (error){
        return res.status(500).json({
            message: "Erro ao realizar reposição",
            error: error.message
        })
    }
}