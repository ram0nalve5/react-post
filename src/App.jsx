import { useState } from 'react'

function App() {
  // Estado para alternar entre as telas: 'login' ou 'cadastro'
  const [tela, setTela] = useState('login')

  // Estado do formulário de login
  const [nomeLogin, setNomeLogin] = useState('')
  const [emailLogin, setEmailLogin] = useState('')
  const [senhaLogin, setSenhaLogin] = useState('')

  // Estado de cadastro
  const [nomeCadastro, setNomeCadastro] = useState('')
  const [emailCadastro, setEmailCadastro] = useState('')
  const [senhaCadastro, setSenhaCadastro] = useState('')
  const [setorCadastro, setSetorCadastro] = useState('')
  const [matriculaCadastro, setMatriculaCadastro] = useState('')
  const [turnoCadastro, setTurnoCadastro] = useState('')

  // Estados de feedback visual da API
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  // RF02: Login (POST)
  const lidarComLogin = (e) => {
    e.preventDefault()
    setCarregando(true)
    setMensagem('')

    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailLogin,
        password: senhaLogin
      })
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Falha no login')
        }

        return resposta.json()
      })
      .then((dados) => {
        setMensagem(
          `Login realizado com sucesso! Token: ${dados.token}`
        )
        setCarregando(false)
      })
      .catch((erro) => {
        setMensagem(`Erro: ${erro.message}`)
        setCarregando(false)
      })
  }

  // RF03: Cadastro (POST)
  const lidarComCadastro = (e) => {
    e.preventDefault()
    setCarregando(true)
    setMensagem('')

    fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailCadastro,
        password: senhaCadastro
      })
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Falha no cadastro')
        }

        return resposta.json()
      })
      .then((dados) => {
        setMensagem('Cadastro realizado com sucesso!')
        setCarregando(false)
      })
      .catch((erro) => {
        setMensagem(`Erro: ${erro.message}`)
        setCarregando(false)
      })
  }

  return (
    <>
      <div
        className="container mt-5"
        style={{ maxWidth: '450px' }}
      >
        <div className="card shadow-sm p-4">
          <h3 className="text-center mb-1">
            Portal do Operador
          </h3>

          <p className="text-center text-muted mb-4">
            Indústria 4.0 - Autenticação
          </p>

          {mensagem && (
            <div
              className={
                mensagem.includes('sucesso')
                  ? 'alert alert-success'
                  : 'alert alert-danger'
              }
            >
              {mensagem}
            </div>
          )}

          {tela === 'login' ? (
            <form onSubmit={lidarComLogin}>
              <h5 className="mb-3">
                Acesso ao Sistema
              </h5>

              <div className="mb-3">
                <label className="form-label">
                  E-mail Corporativo
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="operador@fabrica.com"
                  value={emailLogin}
                  onChange={(e) =>
                    setEmailLogin(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Senha
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="******"
                  value={senhaLogin}
                  onChange={(e) =>
                    setSenhaLogin(e.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={carregando}
              >
                {carregando
                  ? 'Autenticando...'
                  : 'Entrar no Sistema'}
              </button>

              <hr />

              <p className="text-center mb-0">
                Novo na fábrica?{' '}

                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => {
                    setTela('cadastro')
                    setMensagem('')
                  }}
                >
                  Cadastrar Operador
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={lidarComCadastro}>
              <h5 className="mb-3">
                Novo Operador
              </h5>

              <div className="mb-3">
                <label className="form-label">
                  Nome Completo
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Carlos Silva"
                  value={nomeCadastro}
                  onChange={(e) =>
                    setNomeCadastro(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  E-mail Corporativo
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="operador@fabrica.com"
                  value={emailCadastro}
                  onChange={(e) =>
                    setEmailCadastro(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Senha
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="******"
                  value={senhaCadastro}
                  onChange={(e) =>
                    setSenhaCadastro(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Matrícula
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="1234"
                  value={matriculaCadastro}
                  onChange={(e) =>
                    setMatriculaCadastro(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Setor Operacional
                </label>

                <select
                  className="form-select"
                  value={setorCadastro}
                  onChange={(e) =>
                    setSetorCadastro(e.target.value)
                  }
                >
                  <option value="Usinagem">
                    Usinagem
                  </option>
                  <option value="Solda">
                    Solda
                  </option>
                  <option value="Manutenção">
                    Manutenção
                  </option>
                  <option value="Almoxarifado">
                    Almoxarifado
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Turno
                </label>

                <select
                  className="form-select"
                  value={turnoCadastro}
                  onChange={(e) =>
                    setTurnoCadastro(e.target.value)
                  }
                >
                  <option value="Manhã">
                    Manhã
                  </option>
                  <option value="Tarde">
                    Tarde
                  </option>
                  <option value="Noite">
                    Noite
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={carregando}
              >
                {carregando
                  ? 'Cadastrando...'
                  : 'Finalizar Cadastro'}
              </button>

              <hr />

              <p className="text-center mb-0">
                Já possui conta?{' '}

                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => {
                    setTela('login')
                    setMensagem('')
                  }}
                >
                  Voltar ao Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default App
