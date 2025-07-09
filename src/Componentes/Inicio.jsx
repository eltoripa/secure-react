import React, { useState, useEffect } from 'react';
import axios from 'axios'; // ✅ Importamos axios

//Funciones del app.js para mostrar funciones en la pagina
const Inicio = ({ onMostrarSeccion }) => {
  const [mostrarFunciones, setMostrarFunciones] = useState(false);
  const [animarFunciones, setAnimarFunciones] = useState(false); 
  const [noticias, setNoticias] = useState([]); // ✅ Estado para almacenar noticias
  const [modalAbierto, setModalAbierto] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);


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

  // ✅ Llamada a API GNews con axios (noticias de ciberseguridad en español)
  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const res = await axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: 'ciberseguridad',
            lang: 'es',
            country: 'cl',
            max: 5,
            token: '88d46afc17c3ed682ab6715102f6460f' // 🔑 Reemplazar con tu clave
          }
        });
        setNoticias(res.data.articles);
      } catch (error) {
        console.error('Error al obtener noticias:', error);
      }
    };

    obtenerNoticias();
  }, []);

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
    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("ruta-a-tu-imagen.jpg") center/cover no-repeat',
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

  {/* ✅ Noticias de Ciberseguridad aquí */}
  <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
    <h3 style={{ color: '#ffd700' }}>📰 Últimas noticias sobre ciberseguridad</h3>
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      {noticias.map((noticia, index) => (
        <li key={index} style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => {
              setNoticiaSeleccionada(noticia);
              setModalAbierto(true);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#00aced',
              fontWeight: 'bold',
              cursor: 'pointer',
              textAlign: 'left',
              padding: 0,
              fontSize: '1em'
            }}
          >
            {noticia.title}
          </button>
          <p style={{ margin: '5px 0', color: '#ddd' }}>
            {noticia.description.replace(/\[\d+ chars\]$/, '')} {/* Elimina el contador de caracteres */}
          </p>
        </li>
      ))}
    </ul>
  </div>

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
      textDecoration: 'none',
      marginTop: '30px'
    }}
  >
    Conoce nuestros planes de protección
  </a>
</section>

{modalAbierto && noticiaSeleccionada && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}
    onClick={() => setModalAbierto(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: '#fff',
        padding: '25px',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90%',
        overflowY: 'auto',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        color: '#333' /* Color de texto oscuro para mejor legibilidad */
      }}
    >
      <h2 style={{ 
        marginBottom: '15px',
        color: '#222' /* Texto más oscuro */
      }}>
        {noticiaSeleccionada.title}
      </h2>
      <p style={{ 
        lineHeight: '1.6',
        color: '#444' /* Texto oscuro pero no negro puro */
      }}>
        {(noticiaSeleccionada.content || noticiaSeleccionada.description).replace(/\[\d+ chars\]$/, '')}
      </p>
      
      <div style={{ marginTop: '25px' }}>
        <a
          href={noticiaSeleccionada.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            color: '#1976d2',
            fontWeight: 'bold',
            textDecoration: 'none',
            marginBottom: '15px'
          }}
        >
          Ver noticia completa
        </a>
      </div>

      <div style={{ 
        marginTop: '20px', 
        textAlign: 'right',
        borderTop: '1px solid #eee',
        paddingTop: '15px'
      }}>
        <button
          onClick={() => onMostrarSeccion('planes')}
          style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
            fontWeight: 'bold'
          }}
        >
          Conoce nuestros planes
        </button>
        <button
          onClick={() => setModalAbierto(false)}
          style={{
            backgroundColor: '#888',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}


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

