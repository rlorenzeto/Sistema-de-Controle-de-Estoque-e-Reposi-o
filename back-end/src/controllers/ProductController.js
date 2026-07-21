import pool from '../config/database.js'
import jwt from 'jsonwebtoken'

const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token não fornecido ou mal formatado");
  }

  const token = authHeader.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET);
};

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
  } = req.body;

  if (!nome_produto || nome_produto.trim() === '') {
    return res.status(400).json({ message: 'Nome do produto é obrigatório' });
  }

  if (nome_produto.length > 255) {
    return res.status(400).json({ message: 'Nome do produto não pode ter mais de 255 caracteres' });
  }

  if (!categoria || categoria.trim() === '') {
    return res.status(400).json({ message: 'Categoria é obrigatória' });
  }

  if (preco_compra === undefined || preco_compra === null || preco_compra <= 0) {
    return res.status(400).json({ message: 'Preço de compra deve ser maior que zero' });
  }

  if (preco_venda === undefined || preco_venda === null || preco_venda <= 0) {
    return res.status(400).json({ message: 'Preço de venda deve ser maior que zero' });
  }

  if (quantidade_inicial === undefined || quantidade_inicial === null) {
    return res.status(400).json({ message: 'Quantidade inicial é obrigatória' });
  }

  if (!id_estoque) {
    return res.status(400).json({ message: 'ID do estoque é obrigatório' });
  }

  const client = await pool.connect();

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    await client.query('BEGIN');

    const estoqueResult = await client.query(
      `SELECT id_estoque
       FROM public.estoque
       WHERE id_estoque = $1 AND id_usuario = $2`,
      [id_estoque, id_usuario]
    );

    if (estoqueResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(403).json({ message: 'Estoque não encontrado para este usuário' });
    }

    const resultProduct = await client.query(
      `INSERT INTO public.produto
       (nome_produto, categoria, peso, preco_compra, volume, descricao, lote, data_cadastro, preco_venda, id_usuario)
       VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE, $8, $9)
       RETURNING *`,
      [
        nome_produto,
        categoria || null,
        peso || null,
        preco_compra,
        volume || null,
        descricao || null,
        lote || null,
        preco_venda,
        id_usuario
      ]
    );

    const produto = resultProduct.rows[0];

    await client.query(
      `INSERT INTO public.possui_estoque
       (id_estoque, id_produto, quantidade_estoque_total, quantidade_estoque_atual)
       VALUES ($1, $2, $3, $4)`,
      [id_estoque, produto.id_produto, quantidade_inicial, quantidade_inicial]
    );

    await client.query('COMMIT');

    return res.status(201).json({
      message: 'Produto cadastrado com sucesso',
      produto
    });
  } catch (error) {
    await client.query('ROLLBACK');

    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token inválido ou expirado',
        error: error.message
      });
    }

    return res.status(500).json({
      message: 'Erro ao cadastrar produto',
      error: error.message
    });
  } finally {
    client.release();
  }
};

export const getProducts = async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const result = await pool.query(
      `SELECT
         id_produto,
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
       WHERE id_usuario = $1
       ORDER BY nome_produto`,
      [id_usuario]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar produtos',
      error: error.message
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const result = await pool.query(
      `SELECT *
       FROM public.produto
       WHERE id_produto = $1 AND id_usuario = $2`,
      [id, id_usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar produto',
      error: error.message
    });
  }
};

export const getProductByName = async (req, res) => {
  const { nome } = req.query;

  if (!nome || nome.trim() === '') {
    return res.status(400).json({ message: 'Nome do produto é obrigatório' });
  }

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const result = await pool.query(
      `SELECT *
       FROM public.produto
       WHERE id_usuario = $1
         AND LOWER(nome_produto) LIKE LOWER($2)
       ORDER BY nome_produto`,
      [id_usuario, `%${nome}%`]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar produtos por nome',
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    nome_produto,
    categoria,
    peso,
    preco_compra,
    volume,
    descricao,
    lote,
    preco_venda
  } = req.body;

  if (!nome_produto && !categoria && peso === undefined && preco_compra === undefined &&
      volume === undefined && !descricao && !lote && preco_venda === undefined) {
    return res.status(400).json({ message: 'Informe ao menos um campo para atualizar' });
  }

  if (nome_produto !== undefined && (nome_produto.trim() === '' || nome_produto.length > 255)) {
    return res.status(400).json({ message: 'Nome inválido' });
  }

  if (preco_compra !== undefined && preco_compra <= 0) {
    return res.status(400).json({ message: 'Preço de compra deve ser maior que zero' });
  }

  if (preco_venda !== undefined && preco_venda <= 0) {
    return res.status(400).json({ message: 'Preço de venda deve ser maior que zero' });
  }

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const atual = await pool.query(
      `SELECT *
       FROM public.produto
       WHERE id_produto = $1 AND id_usuario = $2`,
      [id, id_usuario]
    );

    if (atual.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const produtoAtual = atual.rows[0];

    const result = await pool.query(
      `UPDATE public.produto
       SET nome_produto = $1,
           categoria = $2,
           peso = $3,
           preco_compra = $4,
           volume = $5,
           descricao = $6,
           lote = $7,
           preco_venda = $8
       WHERE id_produto = $9 AND id_usuario = $10
       RETURNING *`,
      [
        nome_produto ?? produtoAtual.nome_produto,
        categoria ?? produtoAtual.categoria,
        peso ?? produtoAtual.peso,
        preco_compra ?? produtoAtual.preco_compra,
        volume ?? produtoAtual.volume,
        descricao ?? produtoAtual.descricao,
        lote ?? produtoAtual.lote,
        preco_venda ?? produtoAtual.preco_venda,
        id,
        id_usuario
      ]
    );

    return res.status(200).json({
      message: 'Produto atualizado com sucesso',
      produto: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar produto',
      error: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const result = await pool.query(
      `DELETE FROM public.produto
       WHERE id_produto = $1 AND id_usuario = $2
       RETURNING id_produto`,
      [id, id_usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao excluir produto',
      error: error.message
    });
  }
};