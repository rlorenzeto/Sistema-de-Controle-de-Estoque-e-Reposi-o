import './Login.css'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate();

  function handleLogin(){
    navigate('/dashboard')
  }

  return (
    <>
      <div className="login-container">

        <section className="left-panel">
          <div className="description">
            <h1>Controle total <br/>
              do seu  
              <span> estoque.</span>
            </h1>
            <p>
              Monitore entradas, saídas e reposições em tempo real.
              Tome decisões com dados precisos e evite rupturas de estoque.
            </p>
          </div>
        </section>

        <section className="right-panel">
          <img src={Logo} alt="Logo" className="logo" />

          <div className="login-form">
            <h2>Login</h2>
            <h3>Entre com suas credenciais para acessar o sistema</h3>

            <label htmlFor="email">Email</label>
            <input className="input" type="email" id="email" placeholder="seuemail@empresa.com" />
            <label htmlFor="password">Senha</label>
            <input className="input" type="password" id="password" placeholder="********" />
            <div className="form-options">
              <label htmlFor="remember" className="remember-me">
                <input type="checkbox" id="remember" />
                <span>Manter conectado</span>
              </label>

              <a href='/' className="missing-password">
                Esqueci minha senha
              </a>
            </div>

            <button type="submit" onClick={handleLogin} className="login-button">
              <span>Entrar</span>
              <span className='arrow'>→</span>
            </button>

            <p className='register-text'>
              Não tem acesso? <a href='/'>Cadastre-se</a>
            </p>
            
          </div>
        </section>

      </div>
    </>
  )
}
