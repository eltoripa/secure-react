import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Ícono personalizado
const iconoDispositivo = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61168.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Mapa = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState(null);

  const cerrarModal = () => setDispositivoSeleccionado(null);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const simulados = usuarios.map((u, i) => ({
      id: i,
      nombre: u.nombre,
      plan: u.plan,
      lat: -33.4 + Math.random() * 0.1,
      lng: -70.6 + Math.random() * 0.1,
    }));
    setDispositivos(simulados);
  }, []);

  //Funciones heredadas por plan
  const obtenerFuncionesPorPlan = (plan) => {
    const funciones = {
      Básico: [
        '🔍 Rastreo activo 24/7',
        '🔒 Bloqueo remoto',
        '📧 Alertas por correo',
        '🕓 Historial de ubicación',
      ],
      Avanzado: [
        '🚨 Alarma remota',
        '🗑 Borrado de datos',
        '⚙️ Acciones automáticas',
        '📍 Geocercas y alertas',
      ],
      Premium: [
        '📞 Soporte técnico 24/7',
        '📋 Administrador de préstamos',
        '💣 Kill Switch',
        '🔐 Cifrado remoto',
        '🛠 Restauración de fábrica',
        '🆔 SSO & SAML corporativo',
      ],
    };

    if (plan === 'Avanzado') {
      return [...funciones.Básico, ...funciones.Avanzado];
    } else if (plan === 'Premium') {
      return [...funciones.Básico, ...funciones.Avanzado, ...funciones.Premium];
    }
    return funciones.Básico;
  };

  // Simulación de API
  const simularAPI = async (usuario, funcion) => {
    console.log(`📡 Enviando a API: Usuario=${usuario}, Función=${funcion}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`✅ Función ejecutada en servidor: ${funcion}`);
        resolve({ ok: true });
      }, 1000); // Simula la espera de confirmacion del servidor
    });
  };

  return (
    // aca se muestra el mapa y la gestion del dispositivo 
    <section className="seccion">
      <h2>📍 Dispositivos en el mapa</h2>
      <MapContainer center={[-33.45, -70.65]} zoom={12} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {dispositivos.map((d) => (
          <Marker key={d.id} position={[d.lat, d.lng]} icon={iconoDispositivo}>
            <Popup>
              <strong>{d.nombre}</strong><br />
              Plan: {d.plan}<br />
              <ul style={{ paddingLeft: '1rem', textAlign: 'left' }}>
                {obtenerFuncionesPorPlan(d.plan).map((funcion, i) => (
                  <li key={i}>{funcion}</li>
                ))}
              </ul>
              <button onClick={() => setDispositivoSeleccionado(d)}>
                Gestionar dispositivo
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal de gestión */}
      {dispositivoSeleccionado && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          overflow: 'auto',
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '500px',
            textAlign: 'left',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <h3 style={{ fontSize: '1.5rem', color: '#1976d2', marginBottom: '1rem' }}>📱 Gestión de dispositivo</h3>
            <p>
              <span style={{ color: '#333', fontWeight: 'bold' }}>👤 Usuario: </span>
              <span style={{ color: '#333' }}>{dispositivoSeleccionado.nombre}</span>
            </p>
            <p>
              <span style={{ color: '#333', fontWeight: 'bold' }}>📦 Plan: </span>
              <span style={{ color: '#333' }}>{dispositivoSeleccionado.plan}</span>
            </p>

            <h4 style={{ marginTop: '1rem', color: '#333' }}>⚙️ Funciones disponibles:</h4>
            <ul style={{ paddingLeft: '1.2rem' }}>
              {obtenerFuncionesPorPlan(dispositivoSeleccionado.plan).map((funcion, i) => (
                <li key={i} style={{ marginBottom: '10px', color: '#333' }}>
                  {funcion}
                  <button
                    style={{
                      marginLeft: '10px',
                      padding: '4px 10px',
                      backgroundColor: '#1976d2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={async () => {
                      //simulacion en consola de la api recibiendo datos
                      await simularAPI(dispositivoSeleccionado.nombre, funcion);
                      alert(`Acción ejecutada: ${funcion}`);
                    }}
                  >
                    Ejecutar
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={cerrarModal}
              style={{
                marginTop: '20px',
                backgroundColor: '#1976d2',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Mapa;
