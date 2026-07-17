import pool from '../config/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    const { email, password } = req.body;

    try{
      const result = await pool.query(
        'SELECT id_usuario, nome_usuario, email, senha FROM public.usuario WHERE email = $1',
        [email]
      )

      if(result.rows.length === 0){
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const usuario = result.rows[0];

      const senhaCorreta = await bcrypt.compare (password, usuario.senha)

      if(!senhaCorreta){
        return res.status(401).json({ message: 'Senha incorreta' })
      }

      const token = jwt.sign(
        {
          id_usuario: usuario.id_usuario,
          email: usuario.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return res.status(200).json({ 
        message: 'Login realizado com sucesso',
        token,
        usuario: {
          id_usuario: usuario.id_usuario,
          nome_usuario: usuario.nome_usuario,
          email: usuario.email
        }
       })

    } catch(error){
      return res.status(500).json({
        message: 'Erro ao fazer login',
        error: error.message
      })
    }
}

export const register = async (req, res) => {
    const { nome_usuario, nome_empresa, email, cpf, rua, estado, cidade, pais,
    telefone, cep, bairro, senha } = req.body;

    try {
      const userExists = await pool.query(
        'SELECT id_usuario FROM public.usuario WHERE email = $1',
        [email]
      )

      if(userExists.rows.length > 0){
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      const hashedSenha = await bcrypt.hash(senha, 10);

      const result = await pool.query(
        'INSERT INTO public.usuario (nome_usuario, nome_empresa, email, cpf, rua, estado, cidade, pais, telefone, cep, bairro, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
        [nome_usuario, nome_empresa, email, cpf, rua, estado, cidade, pais,
        telefone, cep, bairro, hashedSenha]
      )

      res.status(201).json({ message: "Usuário cadastrado com sucesso", usuario: result.rows[0]})
    
    } catch(error){
      return res.status(500).json({
        message: 'Erro ao cadastrar usuário',
        error: error.message
      })
    } 

}