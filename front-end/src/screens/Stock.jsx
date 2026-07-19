import { useState } from "react";
import "./Stock.css"
import SideBar from '../components/SideBar'
import Header from '../components/Header';
import CardResumo from "../components/cardResumo";
import TabelaEstoque from "../components/TabelaEstoque";
import { FiSearch } from "react-icons/fi";
import OrderModal from "../components/OrderModal";
import ItemModal from "../components/ItemModal";


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
                <Header title="Estoque" buttonText="Novo Item"
                onButtonClick={handleNovoItem}
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
            <ItemModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}