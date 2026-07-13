import "./SideBar.css"
import Logo from '../assets/sidebarLogo.png'

import { NavLink, useNavigate} from "react-router-dom"

function SideBar (){

    const navigate = useNavigate();

    function handleLogout(){
        navigate('/')
    }

    return (
        <>
            <section className="sidebar">
                
                <div className="sidebar-top">
                    <div className="sidebar-brand">
                        <img src={Logo} alt="Logo StockControl" className="sidebar-logo" />
                    </div>

                    <nav className="sidebar-nav">
                        <p className="sidebar-title">MENU</p>

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                            >
                            <img
                                src="https://img.icons8.com/?size=20&id=sUJRwjfnGwbJ&format=png&color=ffffff"
                                alt="Ícone do Dashboard"
                                className="nav-icon"
                            />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink
                            to="/stock"
                            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                            >
                            <img
                                src="https://img.icons8.com/?size=20&id=106914&format=png&color=ffffff"
                                alt="Ícone do Estoque"
                                className="nav-icon"
                            />
                            <span>Estoque</span>
                        </NavLink>

                        <NavLink
                            to="/sale"
                            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                            >
                            <img
                                src="https://img.icons8.com/?size=20&id=cIzsD9VTMVOe&format=png&color=ffffff"
                                alt="Ícone de Vendas"
                                className="nav-icon"
                            />
                            <span>Vendas</span>
                        </NavLink>
                    </nav>
                </div>

                <div className="sidebar-bottom">
                    <div className="logout-wrapper">
                        <img  src="https://img.icons8.com/?size=20&id=22112&format=png&color=ffffff" alt="Ícone de sair" className="logout-icon"/>
                        <button className="logout-button" onClick={handleLogout}>
                            Sair
                        </button>
                    </div>
                
                    <div className="user-box">
                        <div className="user-avatar">MA</div>
                        <div className="user-info">
                            <strong>Marco Alves</strong>
                            <span>Lojas Cacique</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SideBar