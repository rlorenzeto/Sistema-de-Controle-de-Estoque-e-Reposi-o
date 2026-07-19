import { useState } from "react";
import "./ReplacementModal.css";

export default function ReplacementModal({
  openModal,
  setOpenModal,
  product,
  onReplacement,
  loadingReplacement
}) {
  const [quantidade, setQuantidade] = useState("");

  if (!openModal || !product) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!quantidade || Number(quantidade) <= 0) {
      alert("Informe uma quantidade válida");
      return;
    }

    await onReplacement({
      id_produto: product.id_produto,
      id_estoque: product.id_estoque,
      quantidade_reposicao: Number(quantidade),
    });
  }

  return (
    <div className="replacement-overlay">
      <div className="replacement-modal">
        <div className="replacement-header">
          <h2>Solicitar Reposição</h2>
          <img
            src="https://img.icons8.com/?size=20&id=45&format=png&color=104F3A"
            alt="Ícone Fechar Modal"
            className="close-button"
            onClick={()=> setOpenModal(false)}
        />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="replacement-body">
            <div className="input-group">
              <label>Nome Produto</label>
              <input
                type="text"
                value={product.nome}
                readOnly
              />
            </div>

            <div className="input-group">
              <label>Quantidade</label>
              <input
                type="number"
                min="1"
                placeholder="Digite a quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>
          </div>

          <div className="replacement-footer">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="confirm-button"
              disabled={loadingReplacement}
            >
              {loadingReplacement ? "Confirmando..." : "Confirmar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}