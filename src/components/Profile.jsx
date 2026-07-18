export default function Profile() {
  return (
    <main className="content">
      <h1>Meu Perfil</h1>

      <p className="subtitle">
        Gerencie suas informações pessoais e configurações da conta.
      </p>

      <div className="card">
        {/* Lado esquerdo */}
        <div className="left">
          <div className="avatar">
            MA
          </div>

          <h2>Marco Alves</h2>

          <button className="outline">
            Trocar Foto
          </button>
        </div>

        {/* Lado direito */}
        <div className="right">
          <h3>Informações Pessoais</h3>

          <div className="grid">
            <div>
              <label>Nome Completo</label>
              <input type="text" defaultValue="Marco Alves" />
            </div>

            <div>
              <label>Nome da Empresa</label>
              <input type="text" defaultValue="Natura" />
            </div>

            <div>
              <label>E-mail</label>
              <input
                type="email"
                defaultValue="marco.alves@empresa.com"
              />
            </div>

            <div>
              <label>CPF/CNPJ</label>
              <input type="text" defaultValue="78788888888888" />
            </div>

            <div>
              <label>Telefone</label>
              <input type="text" defaultValue="(32)99999-0000" />
            </div>

            <div></div>
          </div>

          <div className="address">
            <div className="street">
              <label>Rua</label>
              <input
                type="text"
                defaultValue="Rua Altamiro Rodrigues"
              />
            </div>

            <div>
              <label>Número</label>
              <input type="text" defaultValue="100" />
            </div>

            <div>
              <label>CEP</label>
              <input type="text" defaultValue="00000-000" />
            </div>
          </div>

          <div className="grid">
            <div>
              <label>Cidade</label>
              <input type="text" defaultValue="Leopoldina" />
            </div>

            <div>
              <label>Bairro</label>
              <input type="text" defaultValue="Vila Miralda" />
            </div>

            <div>
              <label>País</label>
              <input type="text" defaultValue="Brasil" />
            </div>

            <div>
              <label>Estado</label>
              <input type="text" defaultValue="Minas Gerais" />
            </div>
          </div>

          <div className="buttons">
            <a href="/">Alterar minha senha</a>

            <button className="save">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}