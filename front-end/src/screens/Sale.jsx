import { useState } from "react";
import "./Sale.css";
import SideBar from "../components/SideBar";
import TabelaVendas from "../components/TabelaVendas";
import Header from "../components/Header";
import CardResumo from "../components/cardResumo";
import OrderModal from "../components/OrderModal";

export default function Sale() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNovoPedido = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="sale-container">
        <SideBar />
        <div className="sale-panel">
          <Header 
            title="Painel de Vendas" 
            buttonText="Novo Pedido"
            onButtonClick={handleNovoPedido}
          />
          <main className="sale-main">
            <div className="sale-cards">
              <CardResumo title="Total de Vendas" value="R$ 1.500,00"/>
              <CardResumo title="Pedidos Pendentes" value="8"/>
              <CardResumo title="Ticket Médio" value="R$ 70,00"/>
            </div>
            <TabelaVendas/>
          </main>
        </div>
      </div>
      <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
