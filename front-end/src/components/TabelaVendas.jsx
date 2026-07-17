import React from "react";
import "./TabelaVendas.css";

const pedidos = [
  {
    id: "#V0001",
    data: "12/07/2026 14:10",
    cliente: "Maria Silva",
    itens: 3,
    total: "R$ 250,00",
    status: "Concluído",
  },
  {
    id: "#V0002",
    data: "12/07/2026 14:15",
    cliente: "João Santos",
    itens: 1,
    total: "R$ 75,50",
    status: "Pendente",
  },
  {
    id: "#V0003",
    data: "12/07/2026 14:20",
    cliente: "Ana Costa",
    itens: 5,
    total: "R$ 510,00",
    status: "Concluído",
  },
  {
    id: "#V0004",
    data: "12/07/2026 14:25",
    cliente: "Beatriz Costa",
    itens: 2,
    total: "R$ 520,00",
    status: "Concluído",
  },
    {
    id: "#V0005",
    data: "12/07/2026 14:30",
    cliente: "Angela Barbosa",
    itens: 4,
    total: "R$ 2320,00",
    status: "Concluído",
  },
];

export default function ListaVendas() {
  return (
    <div className="tabela-vendas">
      <h3 className="tabela-titulo">Lista de Pedidos Recentes</h3>
      
      <div className="filtros-container">
        <div className="filtro-busca">
          <svg className="filtro-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#9ca3af">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
          <input type="text" placeholder="Buscar por ID, Cliente..." />
        </div>
        
        <div className="filtro-select">
          <svg className="filtro-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#9ca3af">
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"/>
          </svg>
          <select>
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
            <option>Hoje</option>
            <option>Este mês</option>
          </select>
        </div>
        
        <div className="filtro-select">
          <select>
            <option>Todos</option>
            <option>Concluído</option>
            <option>Pendente</option>
          </select>
        </div>
      </div>
      
      <div className="tabela-container">
        <table>
          <thead>
            <tr>
              <th>ID</th> 
              <th>Data</th>
              <th>Cliente</th>
              <th>Itens</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}> 
                <td>{pedido.id}</td> 
                <td>{pedido.data}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.itens}</td>
                <td>{pedido.total}</td>
                <td>{pedido.status}</td>
                <td> 
                  <div className="acoes-container">
                    <button className="btn-acao">
                      <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#4B5563"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/></svg>
                    </button>
                    <button className="btn-acao">
                      <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#4B5563"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </button>
                    <button className="btn-acao">
                      <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#4B5563"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120Z"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
