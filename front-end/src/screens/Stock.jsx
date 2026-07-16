import "./Stock.css"
import SideBar from '../components/SideBar'
import HeaderButton from '../components/HeaderButton';

export default function Stock(){
    return(
        <>
            <div className="stock-container">
                <SideBar/>
                <div className="stock-panel">
                <HeaderButton title="Estoque" button="+ Novo Item"/>
                <section className="informative">
                    <div className="box-one">
                        <h3>Produtos Cadastrados</h3>
                        <p>300</p>
                    </div>
                    <div className="box-two">
                        <h3>Produtos em Alerta</h3>
                    </div>
                    <div className="box-three">
                        <h3>Produtos em Crítico</h3>
                    </div>
                </section>
                </div>
            </div>
        </>
    );
}