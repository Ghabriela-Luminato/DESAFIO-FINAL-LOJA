import { FaTruck } from "react-icons/fa";

function SecurePayment() {
  return (
    <div className="secure-container">
<div className="secure-box frete-secure">
  <div className="frete">
    <FaTruck className="truck-icon" />

    <span className="frete-title">Frete Grátis</span>

    <p className="frete-text">
      Disponível para entregas em Minas Gerais
    </p>
  </div>
</div>


      <div className="secure-box">
        <h3>Compra 100% segura</h3>

        <div className="seguranca">
          <div className="badge">
            <span className="lock">🔒</span>
            <div>
              <p>Ambiente seguro</p>
              <strong>Site 100% PROTEGIDO</strong>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SecurePayment;
