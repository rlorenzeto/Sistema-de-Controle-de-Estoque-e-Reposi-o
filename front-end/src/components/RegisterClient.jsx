import { useState } from "react";
import "./RegisterClient.css";
import { formatCPFCNPJ, validateCPFCNPJ } from "../utils/validators";

export default function RegisterClient({ isOpen, onClose }) {
    const [nome, setNome] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleCpfCnpjChange = (e) => {
        const formatted = formatCPFCNPJ(e.target.value);
        setCpfCnpj(formatted);
        setError("");
    };

    const handleSalvar = () => {
        if (!nome.trim()) {
            setError("Nome é obrigatório");
            return;
        }

        if (!cpfCnpj.trim()) {
            setError("CPF/CNPJ é obrigatório");
            return;
        }

        if (!validateCPFCNPJ(cpfCnpj)) {
            setError("CPF/CNPJ inválido");
            return;
        }

        console.log("Cliente salvo:", { nome, cpfCnpj });
        setNome("");
        setCpfCnpj("");
        setError("");
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Cadastro Rápido de Cliente</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label className="form-label">Nome Completo</label>
                        <input 
                            type="text" 
                            className="form-input"
                            placeholder="João Marcos"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">CPF/CNPJ</label>
                        <input 
                            type="text" 
                            className={`form-input input-cpf ${error ? 'input-error' : ''}`}
                            placeholder="000.000.000-00 ou 00.000.000/0000-00"
                            value={cpfCnpj}
                            onChange={handleCpfCnpjChange}
                            maxLength={18}
                        />
                        {error && <span className="error-message">{error}</span>}
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" onClick={onClose} className="btn-cancelar">
                        Cancelar
                    </button>
                    <button type="button" onClick={handleSalvar} className="btn-salvar">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}