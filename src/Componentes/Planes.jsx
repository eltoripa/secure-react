import React, { useEffect, useState } from 'react';

// Componente que muestra los planes de suscripción disponibles.
// Permite al usuario elegir uno y suscribirse, llamando a una función recibida como prop.
const Planes = ({ onSuscribirse }) => {
  const [planes, setPlanes] = useState([]); // Estado local para almacenar los planes mostrados

  // useEffect que se ejecuta una sola vez al cargar el componente.
  // Intenta obtener los planes desde el localStorage.
  // Si no existen, carga los planes por defecto.
  useEffect(() => {
    const planesGuardados = JSON.parse(localStorage.getItem('planes'));
    if (planesGuardados && planesGuardados.length > 0) {
      setPlanes(planesGuardados); // Usa los planes guardados si existen
    } else {
      // Esta lista puede ser modificada luego desde la sección de gestión.
      setPlanes([
        {
          nombre: "Básico",
          precio: "$1.290/mes",
          descripcion: [
            "Rastreo activo 24/7",
            "Bloqueo remoto",
            "Alertas por correo",
            "Historial de ubicación",
          ],
        },
        {
          nombre: "Avanzado",
          precio: "$1.790/mes",
          descripcion: [
            "Funciones del plan básico",
            "Alarma remota",
            "Borrado de datos",
            "Acciones automáticas",
            "Geocercas y alertas",
          ],
        },
        {
          nombre: "Premium",
          precio: "$2.100/mes",
          descripcion: [
            "Funciones de los planes anteriores",
            "Soporte técnico 24/7",
            "Administrador de préstamos",
            "Kill Switch",
            "Cifrado remoto y restauración de fábrica",
            "SSO & SAML corporativo",
          ],
        },
      ]);
    }
  }, []);

  // Se muestra una tabla con nombre, precio, características y botón de suscripción por cada plan.
  return (
    <section id="planes" className="seccion">
      <h2>Planes de Protección</h2>
      <p>Elige el plan que se ajuste a tu nivel de seguridad y número de dispositivos:</p>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Precio Mensual</th>
            <th>Incluye</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {planes.map((plan, index) => (
            <tr key={index}>
              <td><strong>{plan.nombre}</strong></td>
              <td>{plan.precio}<br />Por cada dispositivo</td>
              <td>
                {/* Se muestra la lista de beneficios del plan como un listado */}
                <ul style={{ textAlign: 'left' }}>
                  {Array.isArray(plan.descripcion)
                    ? plan.descripcion.map((item, i) => <li key={i}>{item}</li>)
                    : <li>{plan.descripcion}</li>}
                </ul>
              </td>
              <td>
                {/* Botón para suscribirse, llama a la función pasada por props con el nombre del plan */}
                <button
                  className="btn-suscribirse"
                  onClick={() => onSuscribirse(plan.nombre)}
                >
                  Suscribirse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Planes;


