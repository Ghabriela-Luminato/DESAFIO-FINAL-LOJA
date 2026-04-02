import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);


  function handleLogin() {
    setLoading(true);

    setTimeout(() => {
      const savedUser = JSON.parse(localStorage.getItem("userData"));

      if (!email || !senha) {
        setErro("Preencha todos os campos");
        setLoading(false);
        return;
      }

      if (!savedUser) {
        setErro("Usuário não encontrado");
        setLoading(false);
        return;
      }

      if (email !== savedUser.email || senha !== savedUser.senha) {
        setErro("Email ou senha incorretos");
        setLoading(false);
        return;
      }

      localStorage.setItem("loggedUser", savedUser.nome);
      navigate("/");
    }, 800);
  }

 
  function handleRegister() {
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (!email.includes("@")) {
      setErro("Email inválido");
      return;
    }

    if (savedUser && savedUser.email === email) {
      setErro("Email já cadastrado");
      return;
    }

    const user = { nome, email, senha };
    localStorage.setItem("userData", JSON.stringify(user));

    // 🔥 volta pro login
    setIsRegister(false);
    setErro("");
    setNome("");
    setEmail("");
    setSenha("");
  }

  return (
    <div className="loginPage">
      <div className="loginBox">

        <div className="backButton" onClick={() => navigate("/")}>
          ← Voltar
        </div>

        <div className="logoArea">
          <img src="/logo.svg" alt="Panda Store" />
        </div>

      
        <h2>{isRegister ? "Criar conta" : "Entrar na conta"}</h2>

       
        {isRegister && (
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        )}

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

        <button
          className="btnLogin"
          onClick={isRegister ? handleRegister : handleLogin}
        >
          {isRegister
            ? "Criar conta"
            : loading
            ? "Entrando..."
            : "Entrar"}
        </button>

        <div className="divider">
          <span>ou</span>
        </div>

    
        <button
          className="btnCreate"
          onClick={() => {
            setIsRegister(!isRegister);
            setErro("");
          }}
        >
          {isRegister ? "Já tenho conta" : "Criar conta"}
        </button>

      </div>
    </div>
  );
}

export default Login;