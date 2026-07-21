import pool from '../config/database.js';
import jwt from 'jsonwebtoken';

const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token não fornecido ou mal formatado');
  }

  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const createSupplier = async (req, res) => {
  const {
    nome_fornecedor,
    rua,
    bairro,
    cidade,
    estado,
    pais,
    cep,
    email,
    telefone,
    documento,
    tipo_pessoa
  } = req.body;

  if (!nome_fornecedor || nome_fornecedor.trim() === '') {
    return res.status(400).json({ message: 'Nome do fornecedor é obrigatório' });
  }

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const supplierExists = await pool.query(
      `SELECT id_fornecedor
       FROM public.fornecedor
       WHERE nome_fornecedor = $1 AND id_usuario = $2`,
      [nome_fornecedor, id_usuario]
    );

    if (supplierExists.rows.length > 0) {
      return res.status(400).json({ message: 'Fornecedor já existe' });
    }

    const result = await pool.query(
      `INSERT INTO public.fornecedor
       (nome_fornecedor, rua, bairro, cidade, estado, pais, cep, email, telefone, documento, tipo_pessoa, id_usuario)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        nome_fornecedor,
        rua,
        bairro,
        cidade,
        estado,
        pais,
        cep,
        email,
        telefone,
        documento,
        tipo_pessoa,
        id_usuario
      ]
    );

    return res.status(201).json({
      message: 'Fornecedor cadastrado com sucesso',
      fornecedor: result.rows[0]
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token inválido ou expirado',
        error: error.message
      });
    }

    return res.status(500).json({
      message: 'Erro ao cadastrar fornecedor',
      error: error.message
    });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const result = await pool.query(
      `SELECT *
       FROM public.fornecedor
       WHERE id_usuario = $1
       ORDER BY nome_fornecedor ASC`,
      [id_usuario]
    );

    return res.status(200).json({
      message: 'Fornecedores listados com sucesso',
      fornecedores: result.rows
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar fornecedores',
      error: error.message
    });
  }
};

export const getSupplierById = async (req, res) => {
  const { id } = req.params;

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const result = await pool.query(
      `SELECT *
       FROM public.fornecedor
       WHERE id_fornecedor = $1 AND id_usuario = $2`,
      [id, id_usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }

    return res.status(200).json({
      message: 'Fornecedor encontrado com sucesso',
      fornecedor: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar fornecedor',
      error: error.message
    });
  }
};

export const searchSuppliers = async (req, res) => {
  const { search } = req.query;

  if (!search || search.trim() === '') {
    return res.status(200).json([]);
  }

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const result = await pool.query(
      `SELECT id_fornecedor, nome_fornecedor, email, telefone
       FROM public.fornecedor
       WHERE id_usuario = $1
         AND nome_fornecedor ILIKE $2
       ORDER BY nome_fornecedor ASC`,
      [id_usuario, `%${search}%`]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar fornecedores',
      error: error.message
    });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const {
    nome_fornecedor,
    rua,
    bairro,
    cidade,
    estado,
    pais,
    cep,
    email,
    telefone,
    documento,
    tipo_pessoa
  } = req.body;

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const checkSupplier = await pool.query(
      `SELECT *
       FROM public.fornecedor
       WHERE id_fornecedor = $1 AND id_usuario = $2`,
      [id, id_usuario]
    );

    if (checkSupplier.rows.length === 0) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }

    const fornecedorAtual = checkSupplier.rows[0];

    const result = await pool.query(
      `UPDATE public.fornecedor
       SET nome_fornecedor = $1,
           rua = $2,
           bairro = $3,
           cidade = $4,
           estado = $5,
           pais = $6,
           cep = $7,
           email = $8,
           telefone = $9,
           documento = $10,
           tipo_pessoa = $11
       WHERE id_fornecedor = $12 AND id_usuario = $13
       RETURNING *`,
      [
        nome_fornecedor ?? fornecedorAtual.nome_fornecedor,
        rua ?? fornecedorAtual.rua,
        bairro ?? fornecedorAtual.bairro,
        cidade ?? fornecedorAtual.cidade,
        estado ?? fornecedorAtual.estado,
        pais ?? fornecedorAtual.pais,
        cep ?? fornecedorAtual.cep,
        email ?? fornecedorAtual.email,
        telefone ?? fornecedorAtual.telefone,
        documento ?? fornecedorAtual.documento,
        tipo_pessoa ?? fornecedorAtual.tipo_pessoa,
        id,
        id_usuario
      ]
    );

    return res.status(200).json({
      message: 'Fornecedor atualizado com sucesso',
      fornecedor: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar fornecedor',
      error: error.message
    });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const decoded = getUserFromToken(req);
    const id_usuario = decoded.id_usuario;

    const result = await pool.query(
      `DELETE FROM public.fornecedor
       WHERE id_fornecedor = $1 AND id_usuario = $2
       RETURNING *`,
      [id, id_usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }

    return res.status(200).json({
      message: 'Fornecedor excluído com sucesso',
      fornecedor: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao excluir fornecedor',
      error: error.message
    });
  }
};