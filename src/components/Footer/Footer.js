import React from "react";

const Footer = () => {
  return (
    <div
      className="py-2"
      style={{
        background: "#001529",
        position: "fixed",
        bottom: "0%",
        width: "100%",
        zIndex: 100,
      }}
    >
      <div className="container">
        <p className="m-0 text-right text-white">
          &copy; {new Date().getFullYear()} SD BANK | Todos los derechos
          reservados.
        </p>
      </div>
    </div>
  );
};

export default Footer;
