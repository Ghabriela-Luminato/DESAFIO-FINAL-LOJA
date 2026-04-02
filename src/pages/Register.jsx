import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleRegister() {
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    // ❌ validação básica
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (!email.includes("@")) {
      setErro("Email inválido");
      return;
    }

    // ❌ impedir email duplicado
    if (savedUser && savedUser.email === email) {
      setErro("Esse email já está cadastrado");
      return;
    }

    // ✅ salvar usuário
    const user = { nome, email, senha };
    localStorage.setItem("userData", JSON.stringify(user));

    // 🔥 já loga automaticamente
    localStorage.setItem("loggedUser", nome);

    navigate("/");
  }

  return (
    <div className="loginPage">
      <div className="loginBox">

        <div className="backButton" onClick={() => navigate("/login")}>
          ← Voltar
        </div>

        <div className="logoArea">
          <img src="/logo.svg" alt="Panda Store" />
        </div>

        <h2>Criar conta</h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <span className="errorMsg">{erro}</span>}

        <button className="btnLogin" onClick={handleRegister}>
          Criar conta
        </button>

      </div>
    </div>
  );
}

export default Register;