import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ComponenteBoton from './Nuevoe';
import LogicaCompleta from './LogicaCompleta';
import './styles.css';


function App() {
  const [seccionActual, setSeccionActual] = useState('inicio');
  const [mostrarFunciones, setMostrarFunciones] = useState(false);
  const [planElegido, setPlanElegido] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarFuncionalidades, setMostrarFuncionalidades] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState('');
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios registrados
  const [mensajeFinalVisible, setMensajeFinalVisible] = useState(false); // Mostrar mensaje de éxito
  const [codigoCliente, setCodigoCliente] = useState(''); // Código único generado
  const [seccionVisible, setSeccionVisible] = useState('inicio'); // Control de secciones visibles




const toggleFunciones = () => {
  setMostrarFuncionalidades(prev => !prev);
};


  const mostrarSeccion = (id) => {
    setSeccionActual(id);
  };



  const cerrarModalFormulario = () => {
    setMostrarModal(false);
  };
const [formData, setFormData] = useState({
  nombre: '',
  correo: '',
  telefono: '',
  terminos: false,
});

const [mensajeExito, setMensajeExito] = useState(false);

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Aquí podrías enviar datos a una API o simular envío
  console.log('Formulario enviado:', formData);
  setMensajeExito(true);
  // Opcional: resetear formulario
  setFormData({
    nombre: '',
    correo: '',
    telefono: '',
    terminos: false,
  });
  
};
const handleSuscripcion = (planSeleccionado) => {
  console.log(`Usuario eligió el plan: ${planSeleccionado}`);
  // Aquí podrías abrir un modal, guardar la selección, o navegar a otro paso
  // Por ejemplo:
  setPlanElegido(planSeleccionado);
  setMostrarModal(true); // si usas modal
};
const [simulador, setSimulador] = useState({
  dispositivos: '',
  seguridad: '',
  uso: '',
});
const manejarSuscripcionExitosa = (nuevoUsuario) => {
  const fechaHora = new Date().toLocaleString();
  const codigo = Math.random().toString(36).substring(2, 10).toUpperCase();

  setUsuarios([...usuarios, { ...nuevoUsuario, fechaHora, codigo }]);
  setCodigoCliente(codigo);
  setMensajeFinalVisible(true);
  setSeccionVisible('registroUsuarios');
};

const [resultadoRecomendacion, setResultadoRecomendacion] = useState('');
const handleSimuladorSubmit = (e) => {
  e.preventDefault();

  const { dispositivos, seguridad, uso } = simulador;
  const numDispositivos = parseInt(dispositivos, 10);

  let plan = 'Básico';

  if (seguridad === 'alto' || uso === 'constante') {
    plan = 'Premium';
  } else if (seguridad === 'medio' || numDispositivos > 3) {
    plan = 'Avanzado';
  }

  setResultadoRecomendacion(`Te recomendamos el plan: ${plan}`);
};

const handleClickSuscribirse = (plan) => {
  setPlanSeleccionado(plan);
  setModalAbierto(true);
};

const handleSubmitSuscripcion = (e) => {
  e.preventDefault();
  alert('Formulario enviado correctamente');
  setModalAbierto(false);
};
  return (
    <div className="App">
      <LogicaCompleta />

      {/* ... tu header aquí ... */}
      <nav>
        <ul>
          <li><a href="#" onClick={() => mostrarSeccion('inicio')}>Inicio</a></li>
          <li><a href="#" onClick={() => mostrarSeccion('quienes')}>Quiénes somos</a></li>
          <li><a href="#" onClick={() => mostrarSeccion('contacto')}>Contacto</a></li>
          <li><a href="#" onClick={() => mostrarSeccion('planes')}>Planes</a></li>
          <li><a href="#" onClick={() => mostrarSeccion('simulador')}>Servicios Extra</a></li>
          <li><a href="#" onClick={() => mostrarSeccion('faq')}>Preguntas Frecuentes</a></li>
        </ul>
      </nav>

      {/* Secciones visibles condicionalmente */}
{seccionActual === 'inicio' && (
  <section id="inicio" className="seccion">
    <h2>Bienvenido a Secure</h2>
    <p>Con nuestros planes, protege y controla tus dispositivos a distancia.</p>
    <img src="dispo.png" alt="Dispositivo móvil protegido" width="500px" />

    <h3>¿Cómo funciona?</h3>
    <p>
      Secure funciona a través de una aplicación que permite rastrear, bloquear y recibir alertas de tus dispositivos en caso de pérdida o robo.
    </p>

    <ul>
      <li>Instala la app Secure en tu dispositivo móvil o computadora para activar la protección.</li>
      <li>
        Para dispositivos móviles, la app detecta automáticamente el <strong>IMEI</strong> (Identificador Internacional de Equipo Móvil), lo que permite identificar el dispositivo de manera única, incluso si se cambia el número SIM.
      </li>
      <li>
        En el caso de laptops y PCs, se utilizan identificadores de hardware como la <strong>dirección MAC</strong> y el número de serie del sistema para asegurar una identificación precisa.
      </li>
      <li>
        Al instalar la app, se te asignará un <strong>código único</strong> que enlaza tus dispositivos a tu cuenta de usuario.
      </li>
      <li>
        Desde tu cuenta personal podrás activar o desactivar funciones como rastreo, bloqueo remoto, alertas, y borrado de datos con un solo clic.
      </li>
      <li>
        Todo el proceso está cifrado de extremo a extremo, garantizando tu privacidad y la integridad de tu información.
      </li>
    </ul>

    <h3>Beneficios destacados</h3>
    <ul>
      <li>Control total del dispositivo robado</li>
      <li>Alertas automáticas a tu correo solo en caso de actividad sospechosa</li>
      <li>Posibilidad de borrar datos remotamente</li>
      <li>
        <img src="telefono.jpg" alt="seguridad" width="300px" />
      </li>
    </ul>

    <section
      id="alertaRobo"
      style={{
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('ruta-a-tu-imagen.jpg') center/cover no-repeat",
        color: "white",
        textAlign: "center",
        padding: "60px 20px"
      }}
    >
      <h2 style={{ fontSize: "2.5em", marginBottom: "20px" }}>
        📱 Cada día, miles de celulares son robados en Chile
      </h2>
      <p style={{ fontSize: "1.2em", maxWidth: "800px", margin: "0 auto 30px" }}>
        En promedio, se reportan <strong>60.000 robos de celulares al mes</strong> en nuestro país. Las comunas más afectadas incluyen Santiago, San Miguel y Maipú. Proteger tu dispositivo ya no es una opción, ¡es una necesidad!
      </p>
      <a
        href="#"
        onClick={() => mostrarSeccion('planes')}
        className="boton-descarga"
        style={{
          display: "inline-block",
          padding: "15px 30px",
          backgroundColor: "#ff6600",
          color: "white",
          fontSize: "1.2em",
          borderRadius: "5px",
          textDecoration: "none"
        }}
      >
        Conoce nuestros planes de protección
      </a>
    </section>

    {/* Botón para mostrar/ocultar funcionalidades */}
    <button
      id="verMasFuncionalidades"
      className="ver-mas"
      onClick={toggleFunciones}
    >
      Más Información &gt;
    </button>

    {/* Contenedor funcionalidades ocultas */}
    <div id="funcionalidades" style={{ display: mostrarFuncionalidades ? 'block' : 'none' }}>
      <div className="funcionalidad">
        <h3>🔐 Cifrado Remoto</h3>
        <p>Protege tu información activando el cifrado de disco de manera remota. Asegura que nadie acceda a tus archivos aunque el dispositivo sea robado.</p>
      </div>

      <div className="funcionalidad">
        <h3>📍 Geocercas (Geofencing)</h3>
        <p>Define zonas seguras en un mapa. Recibe alertas si tu dispositivo entra o sale de esas áreas. Ideal para proteger el uso fuera del hogar o trabajo.</p>
      </div>

      <div className="funcionalidad">
        <h3>🚨 Acciones Remotas de Seguridad</h3>
        <ul>
          <li>🔒 Bloquea el acceso al dispositivo a distancia.</li>
          <li>🔊 Activa una alarma sonora para ubicarlo o disuadir intrusos.</li>
          <li>📩 Muestra mensajes personalizados en la pantalla del dispositivo.</li>
        </ul>
      </div>

      <div className="funcionalidad">
        <h3>🗑️ Borrado de Datos y Restauración de Fábrica</h3>
        <p>Elimina datos sensibles o restaura completamente tu equipo para evitar filtraciones de información si lo pierdes o te lo roban.</p>
      </div>

      <div className="funcionalidad">
        <h3>🧭 Historial de Ubicación y Rastreo Activo</h3>
        <p>Consulta la ruta y ubicaciones anteriores del dispositivo. Vigila en tiempo real su posición para facilitar su recuperación.</p>
      </div>

      <div className="funcionalidad">
        <h3>📅 Automatización y Gestión Inteligente</h3>
        <ul>
          <li>⏱️ Programa acciones automáticas según horarios o eventos.</li>
          <li>🗂️ Administra préstamos de dispositivos con reglas de uso y fechas.</li>
          <li>🔐 Integración con sistemas empresariales (SSO y SAML).</li>
        </ul>
      </div>
    </div>
  </section>
)}



      {seccionActual === 'quienes' && (
  <section id="quienes" className="seccion">
  <h2>Quiénes somos</h2>
  <p>
    En <strong>Secure</strong> nos especializamos en proteger lo que más te importa: tu información personal y tus dispositivos móviles. 
    Nuestra misión es ofrecer soluciones tecnológicas efectivas, accesibles y confiables para combatir el robo, la pérdida y el mal uso de los dispositivos en América Latina.
  </p>

  <p>
    Desde nuestros inicios, hemos desarrollado herramientas que combinan la seguridad avanzada con la facilidad de uso, permitiéndote tomar el control de tu dispositivo en cualquier momento, desde cualquier lugar.
  </p>

  <img src="equipo.jpg" alt="Equipo de Secure" width="500px" style={{ marginTop: "20px" }} />

  <h3>Nuestros valores</h3>
  <ul>
    <li>🔒 <strong>Confianza:</strong> Desarrollamos soluciones seguras y confiables para cada usuario.</li>
    <li>🤝 <strong>Cercanía:</strong> Ofrecemos atención personalizada a cada cliente, sin importar el plan.</li>
    <li>🚀 <strong>Innovación:</strong> Estamos en constante evolución para anticiparnos a las amenazas tecnológicas.</li>
    <li>🌎 <strong>Impacto regional:</strong> Ya protegemos a miles de usuarios en Chile, Argentina, Perú, Colombia y México.</li>
  </ul>

  <h3>Experiencia y compromiso</h3>
  <ul>
    <li>📱 Más de <strong>5 años en el rubro</strong> de la seguridad digital.</li>
    <li>👨‍💻 Soporte técnico y humano <strong>disponible 24/7</strong> en toda Latinoamérica.</li>
    <li>💬 Comunidad activa y en crecimiento con más de <strong>20.000 clientes satisfechos</strong>.</li>
  </ul>

  <p>
    Conoce más sobre cómo trabajamos, nuestros principios de seguridad, y por qué cada día más personas confían en <strong>Secure</strong> para proteger su mundo digital.
  </p>
  </section>
)}


      {seccionActual === 'contacto' && (
  <section
    id="contacto"
    className="seccion"
    style={{ textAlign: 'center', padding: '40px' }}
  >
    <h2>Formulario de contacto</h2>
    <p>
      ¿Tienes alguna pregunta o necesitas ayuda con la protección de tu
      dispositivo? Completa el formulario y nuestro equipo de soporte se pondrá
      en contacto contigo.
    </p>

    <form
      id="formularioContacto"
      style={{ maxWidth: '600px', margin: '0 auto' }}
      onSubmit={handleSubmit}
    >
      <label htmlFor="nombre">Nombre:</label>
      <br />
      <input
        type="text"
        id="nombre"
        name="nombre"
        placeholder="Ingresa tu nombre"
        required
        pattern="[A-Za-z\s]+"
        title="El nombre solo puede contener letras y espacios"
        value={formData.nombre}
        onChange={handleChange}
      />
      <br />
      <br />

      <label htmlFor="correo">Correo electrónico:</label>
      <br />
      <input
        type="email"
        id="correo"
        name="correo"
        placeholder="Ingresa tu correo electrónico"
        required
        value={formData.correo}
        onChange={handleChange}
      />
      <br />
      <br />

      <label htmlFor="telefono">Teléfono (opcional):</label>
      <br />
      <input
        type="tel"
        id="telefono"
        name="telefono"
        placeholder="Ingresa tu número de teléfono"
        pattern="^[0-9]+$"
        title="El teléfono solo puede contener números"
        value={formData.telefono}
        onChange={handleChange}
      />
      <br />
      <br />

      <label>
        <input
          type="checkbox"
          id="terminos"
          name="terminos"
          required
          checked={formData.terminos}
          onChange={handleChange}
        />{' '}
        Acepto los términos y condiciones.
      </label>
      <br />
      <br />

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff6600',
          color: 'white',
          fontSize: '1em',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Enviar
      </button>
    </form>

    {mensajeExito && (
      <p
        id="mensajeExito"
        style={{ marginTop: '20px', color: 'green' }}
      >
        ¡Tu mensaje ha sido enviado con éxito! Nos pondremos en contacto contigo pronto.
      </p>
    )}
  </section>
)}


{seccionActual === 'planes' && (
  <section id="planes" className="seccion">
    <h2>Planes de Protección</h2>
    <p>
      Elige el plan que se ajuste a tu nivel de seguridad y número de dispositivos:
    </p>
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
        {[
          {
            nombre: 'Básico',
            precio: '$1.290/mes',
            detalle: 'Por cada dispositivo',
            beneficios: [
              'Rastreo activo 24/7',
              'Bloqueo remoto',
              'Alertas por correo',
              'Historial de ubicación',
            ],
          },
          {
            nombre: 'Avanzado',
            precio: '$1.790/mes',
            detalle: 'Por cada dispositivo',
            beneficios: [
              'Funciones del plan básico',
              'Alarma remota',
              'Borrado de datos',
              'Acciones automáticas',
              'Geocercas y alertas',
            ],
          },
          {
            nombre: 'Premium',
            precio: '$2.100/mes',
            detalle: 'Por cada dispositivo',
            beneficios: [
              'Funciones de los planes anteriores',
              'Soporte técnico 24/7',
              'Administrador de préstamos',
              'Kill Switch',
              'Cifrado remoto y restauración de fábrica',
              'SSO & SAML corporativo',
            ],
          },
        ].map((plan) => (
          <tr key={plan.nombre}>
            <td>
              <strong>{plan.nombre}</strong>
            </td>
            <td>
              {plan.precio}
              <br />
              {plan.detalle}
            </td>
            <td>
              <ul style={{ textAlign: 'left' }}>
                {plan.beneficios.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </td>
            <td>
            <button onClick={() => handleClickSuscribirse('Básico')}>Suscribirse</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)}


{seccionActual === 'simulador' && (
  <section id="simulador" className="seccion">
    <h2>Simulador de Plan Ideal</h2>
    <p>Responde estas preguntas y te recomendaremos el plan recomendado para ti:</p>

    <form onSubmit={handleSimuladorSubmit}>
      <label htmlFor="dispositivos">
        ¿Cuántos dispositivos deseas proteger? (10 dispositivos máximo)
      </label>
      <input
        type="number"
        id="dispositivos"
        min="1"
        max="10"
        required
        value={simulador.dispositivos}
        onChange={(e) => setSimulador({ ...simulador, dispositivos: e.target.value })}
      />

      <label htmlFor="seguridad">¿Qué nivel de seguridad necesitas?</label>
      <select
        id="seguridad"
        required
        value={simulador.seguridad}
        onChange={(e) => setSimulador({ ...simulador, seguridad: e.target.value })}
      >
        <option value="">Selecciona</option>
        <option value="bajo">Bajo (rastreo y alertas)</option>
        <option value="medio">Medio (rastreo, bloqueo, borrado)</option>
        <option value="alto">Alto (todo lo anterior + geocercas y acciones automáticas)</option>
      </select>

      <label htmlFor="uso">¿Con qué frecuencia necesitas rastrear tus dispositivos?</label>
      <select
        id="uso"
        required
        value={simulador.uso}
        onChange={(e) => setSimulador({ ...simulador, uso: e.target.value })}
      >
        <option value="">Selecciona</option>
        <option value="ocasional">Ocasionalmente</option>
        <option value="constante">Constante / diario</option>
      </select>

      <button type="submit">Recomendar Plan</button>
    </form>

    {resultadoRecomendacion && (
      <div style={{ marginTop: 20, fontSize: '1.2em' }}>{resultadoRecomendacion}</div>
    )}
  </section>
)}


{seccionActual === 'faq' && (
  <section id="faq" className="seccion">
    <h2>Preguntas Frecuentes</h2>
    <ul>
      <li>
        <strong>¿Qué sucede si mi laptop no tiene GPS?</strong><br />
        Secure utiliza métodos alternativos como la triangulación de redes Wi-Fi y la dirección IP para estimar la ubicación de tu dispositivo. Aunque no sea tan precisa como el GPS, sigue siendo útil para rastreo en la mayoría de los casos.
      </li>
      <li>
        <strong>¿Puedo rastrear varios dispositivos con una misma cuenta?</strong><br />
        Sí, puedes registrar y gestionar múltiples dispositivos desde una sola cuenta de usuario.
      </li>
      <li>
        <strong>¿Qué ocurre si el ladrón apaga el dispositivo?</strong><br />
        El sistema mostrará la última ubicación conocida y se reactivará en cuanto el dispositivo vuelva a conectarse a internet.
      </li>
      <li>
        <strong>¿Necesito internet para que funcione?</strong><br />
        Secure utiliza internet para ejecutar funciones remotas como rastreo, bloqueo o borrado. Si el dispositivo no está conectado en ese momento, el sistema intentará ejecutar las acciones pendientes apenas se restablezca la conexión. Además, algunas funciones pueden activarse automáticamente según configuraciones previas.
      </li>
      <li>
        <strong>¿Puedo instalar Secure en un dispositivo perdido?</strong><br />
        No, Secure debe instalarse y configurarse antes de que el dispositivo se pierda. No es posible instalarlo de forma remota en un dispositivo ya perdido.
      </li>
      <li>
        <strong>¿Cómo protege Secure mis datos personales?</strong><br />
        Secure cifra toda la comunicación entre tus dispositivos y nuestros servidores, y ofrece funciones como borrado remoto y bloqueo de pantalla para proteger tu información en caso de pérdida o robo.
      </li>
      <li>
        <strong>¿Qué pasa si desinstalan la aplicación?</strong><br />
        Recomendamos configurar permisos de administrador en tu dispositivo para evitar la desinstalación no autorizada. Además, puedes recibir alertas si se detecta una desinstalación.
      </li>
      <li>
        <strong>¿Cómo se identifican los dispositivos?</strong><br />
        Secure utiliza identificadores únicos como el IMEI en teléfonos móviles y la dirección MAC o número de serie en laptops y PCs para reconocer y gestionar cada dispositivo.
      </li>
    </ul>
  </section>
)}


{modalAbierto && (
  <div className="modal">
    <div className="modal-contenido">
      <span
        className="cerrar"
        onClick={() => setModalAbierto(false)}
        style={{ cursor: 'pointer' }}
      >
        &times;
      </span>
      <h2>Formulario de Suscripción</h2>

      <div id="detallesPlanSeleccionado">
        {planSeleccionado && <p>Plan seleccionado: <strong>{planSeleccionado}</strong></p>}
      </div><br />

      <form id="formularioSuscripcion" onSubmit={handleSubmitSuscripcion}>
        <label htmlFor="nombreSub">Nombre:</label>
        <input
          type="text"
          id="nombreSub"
          required
          pattern="[A-Za-z\s]+"
        /><br /><br />

        <label htmlFor="correoSub">Correo:</label>
        <input
          type="email"
          id="correoSub"
          required
        /><br /><br />

        <label htmlFor="planSub">Selecciona un plan:</label>
        <select id="planSub" required defaultValue={planSeleccionado}>
          <option value="Básico">Básico</option>
          <option value="Avanzado">Avanzado</option>
          <option value="Premium">Premium</option>
        </select><br /><br />

        <label htmlFor="pago">Método de pago:</label>
        <select id="pago" required>
          <option value="Transferencia">Transferencia</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="PayPal">PayPal</option>
        </select><br /><br />

        <label htmlFor="contrasena">Contraseña:</label>
        <input
          type="password"
          id="contrasena"
          required
        /><br /><br />

        <label htmlFor="repetirContrasena">Repetir Contraseña:</label>
        <input
          type="password"
          id="repetirContrasena"
          required
        /><br /><br />

        <button type="submit">Continuar</button>
      </form>
    </div>
  </div>
)}
{seccionVisible === 'registroUsuarios' && (
  <section id="registroUsuarios">
    <h2>Usuarios registrados</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Plan</th>
          <th>Método de pago</th>
          <th>Fecha y hora</th>
          <th>Código</th>
        </tr>
      </thead>
      <tbody id="tablaUsuarios">
        {usuarios.map((usuario, index) => (
          <tr key={index}>
            <td>{usuario.nombre}</td>
            <td>{usuario.correo}</td>
            <td>{usuario.plan}</td>
            <td>{usuario.pago}</td>
            <td>{usuario.fechaHora}</td>
            <td>{usuario.codigo}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Mensaje final de suscripción */}
    {mensajeFinalVisible && (
      <div id="mensajeFinal" style={{ display: 'block', marginTop: '20px' }}>
        <p><strong>¡Suscripción realizada con éxito!</strong></p>
        <p>Tu código de cliente único es: <span id="codigoCliente">{codigoCliente}</span></p>
        <p>Para activar tu suscripción, descarga e instala nuestra aplicación:</p>
        <a href="#" id="descargarApp" className="boton-descarga">Descargar Aplicación</a>
      </div>
    )}
  </section>
)}
<footer className="pie">
  <div className="redes">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" alt="Twitter" />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <img src="ig.jpg" alt="Instagram" />
    </a>
  </div>
  <p className="mensaje-final">© 2025 Secure. Protegiendo lo que más importa. Todos los derechos reservados.</p>
</footer>


    </div>
  );
}

export default App;

