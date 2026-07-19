import pool from '../config/database.js'

export const createProduct = async (req, res) => {
  const { 
    nome_produto, 
    categoria, 
    peso, 
    preco_compra, 
    volume, 
    descricao, 
    lote, 
    preco_venda,
    quantidade_inicial,
    id_estoque
  } = req.body

  if (!nome_produto || nome_produto.trim() === '') {
    return res.status(400).json({ message: 'Nome do produto é obrigatório' })
  }

  if (nome_produto.length > 255) {
    return res.status(400).json({ message: 'Nome do produto não pode ter mais de 255 caracteres' })
  }

  if (!categoria || categoria.trim() === '') {
    return res.status(400).json({ message: 'Categoria é obrigatória' })
  }

  if (preco_compra === undefined || preco_compra === null) {
    return res.status(400).json({ message: 'Preço de compra é obrigatório' })
  }

  if (preco_compra <= 0) {
    return res.status(400).json({ message: 'Preço de compra deve ser maior que zero' })
  }

  if (preco_venda === undefined || preco_venda === null) {
    return res.status(400).json({ message: 'Preço de venda é obrigatório' })
  }

  if (preco_venda <= 0) {
    return res.status(400).json({ message: 'Preço de venda deve ser maior que zero' })
  }

  if (quantidade_inicial === undefined || quantidade_inicial === null) {
    return res.status(400).json({ message: 'Quantidade inicial é obrigatória' })
  }

  if (!id_estoque) {
    return res.status(400).json({ message: 'ID do estoque é obrigatório' })
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const resultProduct = await client.query(
      `INSERT INTO public.produto 
       (nome_produto, categoria, peso, preco_compra, volume, descricao, lote, data_cadastro, preco_venda)
       VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE, $8)
       RETURNING *`,
      [
        nome_produto,
        categoria || null,
        peso || null,
        preco_compra || null,
        volume || null,
        descricao || null,
        lote || null,
        preco_venda || null
      ]
    )

    const produto = resultProduct.rows[0]

    // Verifica se o estoque e a quantidade inicial foram fornecidos
    if (id_estoque && quantidade_inicial !== undefined) {
      await client.query(
        `INSERT INTO public.possui_estoque 
         (id_estoque, id_produto, quantidade_estoque_total, quantidade_estoque_atual)
         VALUES ($1, $2, $3, $4)`,
        [id_estoque, produto.id_produto, quantidade_inicial, quantidade_inicial]
      )
    }

    await client.query('COMMIT')

    return res.status(201).json({
      message: 'Produto cadastrado com sucesso',
      produto: produto
    })
  } catch (error) {
    await client.query('ROLLBACK')
    return res.status(500).json({
      message: 'Erro ao cadastrar produto',
      error: error.message
    })
  } finally {
    client.release()
  }
}

export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        nome_produto, 
        categoria, 
        peso, 
        preco_compra, 
        volume, 
        descricao, 
        lote, 
        data_cadastro, 
        preco_venda 
       FROM public.produto 
       ORDER BY nome_produto`
    )

    return res.status(200).json(result.rows)
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar produtos',
      error: error.message
    })
  }
}

export const getProductById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      `SELECT * FROM public.produto WHERE id_produto = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    return res.status(200).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar produto',
      error: error.message
    })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const { 
    nome_produto, 
    categoria, 
    peso, 
    preco_compra, 
    volume, 
    descricao, 
    lote, 
    preco_venda 
  } = req.body

  if (!nome_produto && !categoria && peso === undefined && preco_compra === undefined && 
      volume === undefined && !descricao && !lote && preco_venda === undefined) {
    return res.status(400).json({ message: 'Informe ao menos um campo para atualizar' })
  }

  if (nome_produto !== undefined && (nome_produto.trim() === '' || nome_produto.length > 255)) {
    return res.status(400).json({ message: 'Nome inválido' })
  }

  if (preco_compra !== undefined && preco_compra <= 0) {
    return res.status(400).json({ message: 'Preço de compra deve ser maior que zero' })
  }

  if (preco_venda !== undefined && preco_venda <= 0) {
    return res.status(400).json({ message: 'Preço de venda deve ser maior que zero' })
  }

  try {
    const result = await pool.query(
      `UPDATE public.produto 
       SET nome_produto = $1, categoria = $2, peso = $3, preco_compra = $4, 
           volume = $5, descricao = $6, lote = $7, preco_venda = $8
       WHERE id_produto = $9
       RETURNING *`,
      [nome_produto, categoria, peso, preco_compra, volume, descricao, lote, preco_venda, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    return res.status(200).json({
      message: 'Produto atualizado com sucesso',
      produto: result.rows[0]
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar produto',
      error: error.message
    })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'DELETE FROM public.produto WHERE id_produto = $1 RETURNING id_produto',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    return res.status(200).json({ message: 'Produto excluído com sucesso' })
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao excluir produto',
      error: error.message
    })
  }
}
