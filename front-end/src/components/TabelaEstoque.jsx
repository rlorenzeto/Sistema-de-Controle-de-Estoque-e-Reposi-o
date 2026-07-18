import React from "react";
import "./TabelaEstoque.css";

const itens = [
    {
        id:"#P1001",
        status:"",
        nome:"Cabo USB-c 2m",
        estoque:"3 itens",
        valorCompra:"R$125,00",
        valorVenda:"R$250,00",    
    },
    {
        id:"#O1002",
        status:"",
        nome:"Papel A4 500 fls",
        estoque:"1 item",
        valorCompra:"R$75,50",
        valorVenda:"R$150,00",    
    },
    {
        id:"#O1003",
        status:"",
        nome:"Cabo HDMI 2m",
        estoque:"5 itens",
        valorCompra:"R$510,00",
        valorVenda:"R$736,00",    
    },
    {
        id:"#O1004",
        status:"",
        nome:"Filtro de Linha",
        estoque:"2 itens",
        valorCompra:"R$180,00",
        valorVenda:"R$220,00",    
    },
    {
        id:"#O1005",
        status:"",
        nome:"Cabo VGA",
        estoque:"1 item",
        valorCompra:"R$45,00",
        valorVenda:"R$84,00",    
    },
    {
        id:"#O1006",
        status:"",
        nome:"Teclado Mecânico",
        estoque:"1 item",
        valorCompra:"R$45,00",
        valorVenda:"R$98,00",    
    },
];

export default function ListaVendas() {
  return (
    <div className="tabela-vendas">
      <h3 className="tabela-titulo">Lista de Produtos</h3>
      
      <div className="filtros-container">
        <div className="filtro-busca">
          <svg className="filtro-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#9ca3af">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
          <input type="text" placeholder="Buscar por ID, Produto..." />
        </div>
        
        <div className="filtro-select">
          <select>
            <option disabled selected hidden>Categoria</option>
            <option>Categoria A</option>
            <option>Categoria B</option>
            <option>Categoria C</option>
          </select>
        </div>
        
        <div className="filtro-select">
          <select>
            <option disabled selected hidden>Status</option>
            <option>Regular</option>
            <option>Alerta</option>
            <option>Crítico</option>
          </select>
        </div>
      </div>
      
      <div className="tabela-container">
        <table>
          <thead>
            <tr>
              <th>ID</th> 
              <th>Status</th>
              <th>Nome</th>
              <th>Estoque</th>
              <th>Valor Compra</th>
              <th>Valor Venda</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.id}> 
                <td>{item.id}</td> 
                <td>{item.status}</td>
                <td>{item.nome}</td>
                <td>{item.estoque}</td>
                <td>{item.valorCompra}</td>
                <td>{item.valorVenda}</td>
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
