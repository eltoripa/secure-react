import React from 'react';

function Encabezado({ onMostrarSeccion }) {
  //Seccion del encabezado
  return (
    <header className="encabezado">
      <div className="contenedor-logo">
        <img
          src="fbf4f6a8-af97-4d6f-a162-be520e6b2071.jpg"
          alt="logo de Secure"
          className="logo"
        />
        <h1>Secure</h1>
      </div>
      <p className="subtitulo">Protege tus dispositivos</p>
      {/** Esta parte controla los click del usuario e interactua con las funciones de app.js para que se renderizen */}
      <nav>
        <ul>
          <li><button onClick={() => onMostrarSeccion('inicio')}>Inicio</button></li>
          <li><button onClick={() => onMostrarSeccion('quienes')}>Quiénes somos</button></li>
          <li><button onClick={() => onMostrarSeccion('contacto')}>Contacto</button></li>
          <li><button onClick={() => onMostrarSeccion('planes')}>Planes</button></li>
          <li><button onClick={() => onMostrarSeccion('simulador')}>Servicios Extra</button></li>
          <li><button onClick={() => onMostrarSeccion('faq')}>Preguntas Frecuentes</button></li>
          <li><button onClick={() => onMostrarSeccion('gestion')}>Gestion</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Encabezado;
