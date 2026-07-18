import { useState } from "react";
import "./Stock.css"
import SideBar from '../components/SideBar'
import HeaderButton from '../components/HeaderButton';
import CardResumo from "../components/cardResumo";
import TabelaEstoque from "../components/TabelaEstoque";
import { FiSearch } from "react-icons/fi";
import OrderModal from "../components/OrderModal";


export default function Stock(){
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNovoItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
    return(
        <>
            <div className="stock-container">
                <SideBar/>
                <div className="stock-panel">
                <HeaderButton title="Estoque" button="+ Novo Item"
                onButtonClick={handleNovoPedido}
                />
                
                <main className="stock-main">
                    <div className="stock-cards">
                    <CardResumo title="Produtos Cadastrados" value="300" />
                    <CardResumo title="Produtos em Alerta" value="10" />
                    <CardResumo title="Produtos em Crítico" value="2" />
                    </div>
                    <TabelaEstoque/>
                </main>
                </div>               
            </div>
            <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}