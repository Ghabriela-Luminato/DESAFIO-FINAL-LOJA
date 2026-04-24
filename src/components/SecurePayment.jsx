import { FaTruck } from "react-icons/fa";
import payments from "../assets/cartoes.png";

function SecurePayment() {
  return (
    <div className="secure-container">

      <div className="secure-box frete-secure">
        <div className="frete-seguranca">
          
        
          <span className="frete-title">Formas de pagamento</span>

    

          <img
            src={payments}
            alt="Formas de pagamento"
            className="cartoes-img"
          />

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