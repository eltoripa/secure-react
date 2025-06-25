import React, { useState, useEffect } from 'react';
//Funciones del app.js para mostrar funciones en la pagina
const Inicio = ({ onMostrarSeccion }) => {
  const [mostrarFunciones, setMostrarFunciones] = useState(false);
  const [animarFunciones, setAnimarFunciones] = useState(false); 

  const toggleFunciones = () => {
    setMostrarFunciones(!mostrarFunciones);
  };

  // Agregamos animación al mostrar funciones
  useEffect(() => {
    if (mostrarFunciones) {
      setAnimarFunciones(true);
    } else {
      setAnimarFunciones(false);
    }
  }, [mostrarFunciones]);


  return (
    <section id="inicio" className="seccion">
      <h2>Bienvenido a Secure</h2>
      <p>Con nuestros planes, protege y controla tus dispositivos a distancia.</p>
      <img src="dispo.png" alt="Dispositivo móvil protegido" width="500px" />

      <h3>¿Cómo funciona?</h3>
      <p>
        Secure funciona a través de una aplicación que permite rastrear, bloquear y recibir alertas
        de tus dispositivos en caso de pérdida o robo.
      </p>

      <ul>
        <li>Instala la app Secure en tu dispositivo móvil o computadora para activar la protección.</li>
        <li>Detecta automáticamente el <strong>IMEI</strong> en móviles, o <strong>MAC/número de serie</strong> en PCs.</li>
        <li>Te asigna un <strong>código único</strong> para vincular tus dispositivos a tu cuenta.</li>
        <li>Permite activar funciones como rastreo, bloqueo, alertas o borrado con un clic.</li>
        <li>Toda la información está <strong>cifrada de extremo a extremo</strong>.</li>
      </ul>

      <h3>Beneficios destacados</h3>
      <ul>
        <li>Control total del dispositivo robado</li>
        <li>Alertas automáticas por correo</li>
        <li>Borrado remoto de datos</li>
        <img src="telefono.jpg" alt="seguridad" width="300px" />
      </ul>

      <section
        id="alertaRobo"
        style={{
          background:
            'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("ruta-a-tu-imagen.jpg") center/cover no-repeat',
          color: 'white',
          textAlign: 'center',
          padding: '60px 20px'
        }}
      >
        <h2 style={{ fontSize: '2.5em', marginBottom: '20px' }}>
          📱 Cada día, miles de celulares son robados en Chile
        </h2>
        <p
          style={{
            fontSize: '1.2em',
            maxWidth: '800px',
            margin: '0 auto 30px'
          }}
        >
          En promedio, se reportan <strong>60.000 robos de celulares al mes</strong> en nuestro país.
          Las comunas más afectadas incluyen Santiago, San Miguel y Maipú. ¡Protégete!
        </p>
        {/* ✅ Este botón ahora usa onClick para mostrar la sección de planes */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onMostrarSeccion('planes');
          }}
          className="boton-descarga"
          style={{
            display: 'inline-block',
            padding: '15px 30px',
            backgroundColor: '#2c3e50',
            color: 'white',
            fontSize: '1.2em',
            borderRadius: '5px',
            textDecoration: 'none'
          }}
        >
          Conoce nuestros planes de protección
        </a>
      </section>

      <button className="ver-mas" onClick={toggleFunciones}>
        {mostrarFunciones ? 'Menos Información <' : 'Más Información >'}
      </button>

      {mostrarFunciones && (
  <div
    id="funcionalidades"
    className={animarFunciones ? 'funcionalidades animar' : 'funcionalidades'}
  >
    <div className="funcionalidad">
      <h3>🔐 Cifrado Remoto</h3>
      <p>Protege tu información activando el cifrado de disco de manera remota.</p>
    </div>
    <div className="funcionalidad">
      <h3>📍 Geocercas (Geofencing)</h3>
      <p>Define zonas seguras y recibe alertas si tu dispositivo sale de esas áreas.</p>
    </div>
    <div className="funcionalidad">
      <h3>🚨 Acciones Remotas de Seguridad</h3>
      <ul>
        <li>🔒 Bloqueo remoto</li>
        <li>🔊 Alarma sonora</li>
        <li>📩 Mensajes en pantalla</li>
      </ul>
    </div>
    <div className="funcionalidad">
      <h3>🗑️ Borrado de Datos y Restauración</h3>
      <p>Elimina datos sensibles o restaura tu equipo por completo.</p>
    </div>
    <div className="funcionalidad">
      <h3>🧭 Historial y Rastreo Activo</h3>
      <p>Consulta ubicaciones anteriores y rastrea en tiempo real.</p>
    </div>
    <div className="funcionalidad">
      <h3>📅 Automatización Inteligente</h3>
      <ul>
        <li>⏱️ Acciones programadas</li>
        <li>🗂️ Gestión de préstamos</li>
        <li>🔐 Integración empresarial (SSO, SAML)</li>
      </ul>
    </div>
  </div>
)}

    </section>
  );
};

export default Inicio;
