import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          📦 <span>StockControl</span>
        </div>

        <p className="menu-title">MENU</p>

        <ul>
          <li>
            <LayoutDashboard size={18} />
            Dashboard
          </li>

          <li>
            <Boxes size={18} />
            Estoque
          </li>

          <li>
            <ShoppingCart size={18} />
            Vendas
          </li>
        </ul>
      </div>

      <div className="bottom">
        <button className="logout">
          <LogOut size={18} />
          Sair
        </button>

        <div className="user">
          <div className="avatar-small">
            MA
          </div>

          <div>
            <strong>Marco Alves</strong>
            <small>Administrador</small>
          </div>
        </div>
      </div>
    </aside>
  );
}