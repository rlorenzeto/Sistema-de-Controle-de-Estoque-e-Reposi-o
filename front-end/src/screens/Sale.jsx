import "./Sale.css";
import SideBar from "../components/SideBar";
import TabelaVendas from "../components/TabelaVendas";
import Header from "../components/Header";
import CardResumo from "../components/cardResumo";

export default function Sale() {
  return (
    <>
      <div className="sale-container">
        <SideBar />
        <div className="sale-panel">
          <Header title="Painel de Vendas" />
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
    </>
  );
}
