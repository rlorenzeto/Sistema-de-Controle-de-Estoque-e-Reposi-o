import { useState } from "react";
import "./OrderModal.css";

export default function OrderModal({ isOpen, onClose }) {
    const [items, setItems] = useState([
        { id: 1, nome: "Parafusadeira Makita 12V", preco: 380.00, quantidade: 1 },
        { id: 2, nome: "Broca de Aço Rápido 8mm", preco: 15.00, quantidade: 2 }
    ]);

    const handleIncrement = (itemId) => {
        setItems(items.map(item => 
            item.id === itemId ? { ...item, quantidade: item.quantidade + 1 } : item
        ));
    };

    const handleDecrement = (itemId) => {
        setItems(items.map(item => 
            item.id === itemId && item.quantidade > 1 
                ? { ...item, quantidade: item.quantidade - 1 } 
                : item
        ));
    };

    const calcularSubtotal = () => {
        return items.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    };

    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-title">
                        <h2>Novo Pedido</h2>
                        <span className="badge-rascunho">Rascunho</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    <div className="customer-field">
                        <label>Cliente <span className="optional">(Opcional)</span></label>
                        <div className="input-wrapper">
                            <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#9ca3af">
                                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                            </svg>
                            <input type="text" placeholder="Buscar por nome, CPF ou deixar em branco" />
                        </div>
                    </div>

                    <div className="product-field">
                        <label>Buscar Produtos</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#9ca3af">
                                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                            </svg>
                            <input type="text" placeholder="Digite o nome ou o código" />
                        </div>
                    </div>

                    <div className="items-section">
                        <h3 className="items-title">ITENS ADICIONADOS ({items.length})</h3>
                        
                        {items.map(item => (
                            <div key={item.id} className="item-card">
                                <div className="item-info">
                                    <h4 className="item-nome">{item.nome}</h4>
                                    <p className="item-preco">{formatarMoeda(item.preco)} / un</p>
                                </div>
                                <div className="item-actions">
                                    <button className="qty-btn" onClick={() => handleDecrement(item.id)}>-</button>
                                    <span className="qty-value">{item.quantidade}</span>
                                    <button className="qty-btn" onClick={() => handleIncrement(item.id)}>+</button>
                                    <span className="item-total">{formatarMoeda(item.preco * item.quantidade)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="resumo-section">
                        <div className="resumo-line">
                            <span>Subtotal</span>
                            <span>{formatarMoeda(calcularSubtotal())}</span>
                        </div>
                        <div className="resumo-line">
                            <span>Descontos</span>
                            <span className="desconto">- R$ 0,00</span>
                        </div>
                        <div className="resumo-total">
                            <span>Total do Pedido</span>
                            <span>{formatarMoeda(calcularSubtotal())}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" onClick={onClose} className="btn-cancelar">
                        Cancelar
                    </button>
                    <button type="button" className="btn-confirmar">
                        Confirmar Pedido
                    </button>
                </div>
            </div>
        </div>
    );
}