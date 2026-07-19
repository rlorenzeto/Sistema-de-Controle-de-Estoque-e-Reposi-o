import { useEffect, useState } from "react";
import "./ItemModal.css";
import RegisterSupplier from "./RegisterSupplier";

export default function ItemModal({ isOpen, onClose, onSave }) {
    const initialFormData = {
    nome_produto: "",
    categoria: "",
    quantidade_inicial: "",
    preco_compra: "",
    preco_venda: "",
    fornecedor: "",
    descricao: "",
    peso: "",
    volume: "",
    lote: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const [openItemModal, setOpenItemModal] = useState(false);
    const [openSupplierModal, setOpenSupplierModal] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setFormData(initialFormData);
            setFornecedores([]);
            setFornecedorSelecionado(null);
            setMostrarSugestoes(false);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const handleFornecedorChange = async (e) => {
        const value = e.target.value;

        setFormData((prev) => ({
        ...prev,
        fornecedor: value
        }));

        setFornecedorSelecionado(null);

        if (value.trim().length < 2) {
        setFornecedores([]);
        setMostrarSugestoes(false);
        return;
        }

        try {
        const response = await fetch(
            `http://localhost:3001/api/fornecedor?search=${encodeURIComponent(value)}`
        );

        if (!response.ok) {
            setFornecedores([]);
            setMostrarSugestoes(false);
            return;
        }

        const data = await response.json();
        setFornecedores(data);
        setMostrarSugestoes(true);
        } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        setFornecedores([]);
        setMostrarSugestoes(false);
        }
    };

    const handleSelecionarFornecedor = (fornecedor) => {
        setFornecedorSelecionado(fornecedor);

        setFormData((prev) => ({
        ...prev,
        fornecedor: fornecedor.nome_fornecedor
        }));

        setFornecedores([]);
        setMostrarSugestoes(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
        ...formData,
        id_fornecedor: fornecedorSelecionado ? fornecedorSelecionado.id_fornecedor : null
        };

        if (onSave) onSave(payload);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="item-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="item-modal-header">
                    <h2>Cadastrar Novo Item</h2>
                    <button className="close-btn" onClick={onClose} type="button">
                        ✕
                    </button>
                </div>

                <form className="item-modal-body" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nome do Produto</label>
                            <input
                                type="text"
                                name="nome_produto"
                                value={formData.nome_produto}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Categoria</label>
                            <select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                            >
                                <option value="">Selecione</option>
                                <option value="Ferramenta">Ferramenta</option>
                                <option value="Elétrica">Elétrica</option>
                                <option value="Acessório">Acessório</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Quantidade Inicial</label>
                            <input
                                type="number"
                                name="quantidade_inicial"
                                value={formData.quantidade_inicial}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Lote</label>
                            <input
                                type="number"
                                name="lote"
                                value={formData.lote}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Peso</label>
                            <input
                                type="number"
                                step="0.01"
                                name="peso"
                                value={formData.peso}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Volume</label>
                            <input
                                type="number"
                                step="0.01"
                                name="volume"
                                value={formData.volume}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Preço de Compra</label>
                            <input
                                type="number"
                                step="0.01"
                                name="preco_compra"
                                value={formData.preco_compra}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Preço de Venda</label>
                            <input
                                type="number"
                                step="0.01"
                                name="preco_venda"
                                value={formData.preco_venda}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group fornecedor-group">
                            <label>Fornecedor</label>
                            <div className="fornecedor-autocomplete">
                                <input
                                type="text"
                                name="fornecedor"
                                value={formData.fornecedor}
                                onChange={handleFornecedorChange}
                                placeholder="Digite o nome do fornecedor"
                                autoComplete="off"
                                />

                                {mostrarSugestoes && fornecedores.length > 0 && (
                                <div className="fornecedor-dropdown">
                                    {fornecedores.map((fornecedor) => (
                                    <button
                                        type="button"
                                        key={fornecedor.id_fornecedor}
                                        className="fornecedor-option"
                                        onClick={() => handleSelecionarFornecedor(fornecedor)}
                                    >
                                        {fornecedor.nome_fornecedor}
                                    </button>
                                    ))}
                                </div>
                                )}
                            </div>
                        </div>

                        <div className="form-group fornecedor-btn-group">
                            <button type="button" className="btn-secondary"onClick={() => setOpenSupplierModal(true)}>
                                + Cadastrar Fornecedor
                            </button>
                            <RegisterSupplier
                                    isOpen={openSupplierModal}
                                    onClose={() => setOpenSupplierModal(false)}
                                    onSave={(supplierData) => console.log(supplierData)}
                                />
                        </div>

                        <div className="form-group full-width">
                            <label>Descrição ou Especificações</label>
                            <textarea
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                    </div>

                    <div className="item-modal-footer">
                        <button type="button" onClick={onClose} className="btn-cancelar">
                            Cancelar
                        </button>
                        <button type="submit" className="btn-confirmar">
                            Salvar Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}