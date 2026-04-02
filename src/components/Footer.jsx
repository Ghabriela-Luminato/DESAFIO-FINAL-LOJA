

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* LOGO */}
        <div className="footer-col">
         <img src="/panda.svg" alt="Logo Panda" className="footer-logo" />
          <p className="desc">
            Sua loja online com produtos de qualidade e entrega garantida.
          </p>
        </div>

          {/* CONTATO */}
<div className="footer-col">
  <h3>Contato</h3>

  <p>Email: ghabriela.santosluminato@gmail.com</p>

  <a
    href="https://www.instagram.com/ghabii_23/"
    target="_blank"
    rel="noopener noreferrer"
    className="insta-link"
  >
    <i className="fa-brands fa-instagram"></i>
  </a>
</div>

        {/* QUEM SOMOS */}
        <div className="footer-col">
          <h3>Quem somos</h3>
          <p>
            Somos uma loja dedicada a oferecer os melhores produtos com
            segurança e praticidade para nossos clientes.
          </p>
        </div>

      </div>

      {/* 2ª PARTE */}
      <div className="footer-bottom">
        <p>
          Desenvolvido por <strong>Ghabriela Luminato</strong> © Todos os direitos reservados ™
        </p>
      </div>

    </footer>
  );
}

export default Footer;