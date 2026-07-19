import { useState } from "react";
import "./RegisterSupplier.css";

export default function RegisterSupplier({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nome_fornecedor: "",
    tipo_pessoa: "",
    email: "",
    documento: "",
    rua: "",
    numero: "",
    bairro: "",
    cep: "",
    estado: "",
    pais: "",
    telefone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="supplier-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="supplier-modal-header">
          <h2>Cadastro Fornecedor</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="supplier-modal-body" onSubmit={handleSubmit}>
          <div className="supplier-form-grid">
            <div className="form-group full-width">
              <label>Nome Fornecedor</label>
              <input
                type="text"
                name="nome_fornecedor"
                value={formData.nome_fornecedor}
                onChange={handleChange}
                placeholder="Seu Nome Completo"
              />
            </div>

            <div className="form-group full-width">
              <label>Pessoa</label>
              <select
                name="tipo_pessoa"
                value={formData.tipo_pessoa}
                onChange={handleChange}
              >
                <option value="">Física ou Jurídica</option>
                <option value="Fisica">Física</option>
                <option value="Juridica">Jurídica</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seuemail@empresa.com"
              />
            </div>

            <div className="form-group full-width">
              <label>CPF/CNPJ</label>
              <input
                type="text"
                name="cpf_cnpj"
                value={formData.cpf_cnpj}
                onChange={handleChange}
                placeholder="Digite seu CPF ou CNPJ"
              />
            </div>

            <div className="form-group">
              <label>Rua</label>
              <input
                type="text"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                placeholder="Rua Adalberto"
              />
            </div>

            <div className="form-group small-field">
              <label>Número</label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Bairro</label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Centro"
              />
            </div>

            <div className="form-group small-field">
              <label>CEP</label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="00000-000"
              />
            </div>

            <div className="form-group">
              <label>Estado</label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                placeholder="Minas Gerais"
              />
            </div>

            <div className="form-group small-field">
              <label>País</label>
              <input
                type="text"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                placeholder="Brasil"
              />
            </div>

            <div className="form-group full-width">
              <label>Telefone</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(XX) X XXXX-XXXX"
              />
            </div>
          </div>

          <div className="supplier-modal-footer">
            <button type="button" onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-confirmar">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}