import React from "react";

const Footer = () => {
  return (
    <article>
      <footer className="flex gap-2 p-4 justify-center border-t-2 ">
        <a
          className="text-4xl hover:text-red-500"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/oscar91511/"
        >
          <i className="bx bxl-github "></i>
        </a>
        <a
          className="text-4xl hover:text-red-500"
          target="_blank" // permite abrir en nueva pestaña
          rel="noopener noreferrer" //evita malwares maliciosos al abrir ventanas
          href="https://www.linkedin.com/in/oscar-eduardo-lopez-restrepo-968a91265/"
        >
          <i className="bx bxl-linkedin "></i>
        </a>
        <a
          className="text-4xl hover:text-red-500"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/oscar915lr/"
        >
          <i className="bx bxl-instagram"></i>
        </a>
      </footer>

      <span className="  text-black font-semibold pb-2 flex items-center justify-center">
        © Todos los derechos reservados 2023{" "}
      </span>
    </article>
  );
};

export default Footer;
