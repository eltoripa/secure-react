import React, { useState, useEffect } from 'react';

const RegistroUsuarios = ({ codigoGenerado }) => {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensajeInstalacion, setMensajeInstalacion] = useState('');
  const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false);

      useEffect(() => {
        if (codigoGenerado) {
          setMostrarMensajeExito(true);
          const timer = setTimeout(() => {
            setMostrarMensajeExito(false);
          }, 40000);
          return () => clearTimeout(timer);
        }
      }, [codigoGenerado]);
  //Verifica si no se genero un codigo y no renderiza esa parte del componente
  if (!codigoGenerado) return null;
      //función para copiar el codigo
  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoGenerado)
      .then(() => {
        setMostrarPopup(true);
        setTimeout(() => setMostrarPopup(false), 3000);
      })
      .catch(() => {
        console.log('Error al copiar el código.');
      });
  };

  const simularDescarga = () => {
    setMensajeInstalacion('🚀 Tu aplicación se instalará en breves...');
    setTimeout(() => setMensajeInstalacion(''), 4000); // Oculta el mensaje luego de 4 segundos
  };

  return (
    <section id="registroUsuarios" className="seccion" style={{ position: 'relative' }}>
      {/* Popup al copiar código */}
      {mostrarPopup && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          ✅ ¡Código copiado al portapapeles!
        </div>
      )}

      {/* Mensaje de instalación */}
      {mensajeInstalacion && (
        <div style={{
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: '#1976d2',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '1.1em'
        }}>
          {mensajeInstalacion}
        </div>
      )}

        {mostrarMensajeExito && (
          <div className="mensaje-suscripcion">

        <p><strong>¡Suscripción realizada con éxito!</strong></p>
        <p>
          Tu código de cliente es: <strong>{codigoGenerado}</strong>{' '}
          <button onClick={copiarCodigo} style={{ marginLeft: '10px' }}>
            Copiar código
          </button>
        </p>
        <p>Descarga nuestra aplicación para comenzar:</p>

        <button
          className="boton-descarga"
          onClick={simularDescarga}
        >
          Descargar Aplicación
        </button>
      </div>
        )}</section>
  );
  
};

export default RegistroUsuarios;


