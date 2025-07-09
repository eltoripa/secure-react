import React, { useState, useEffect } from 'react';
import Encabezado from './Componentes/Encabezado';
import Inicio from './Componentes/Inicio';
import QuienesSomos from './Componentes/QuienesSomos';
import Contacto from './Componentes/Contacto';
import Planes from './Componentes/Planes';
import Simulador from './Componentes/Simulador';
import FAQ from './Componentes/FAQ';
import ModalSuscripcion from './Componentes/ModalSuscripcion';
import RegistroUsuarios from './Componentes/RegistroUsuarios';
import Footer from './Componentes/Footer';
import GestionAdmin from './Componentes/GestionAdmin';
import Mapa from './Componentes/Mapa';
import './App.css';

function App() {
  //Muestra la sección inicio por default y luego agregamos funciones para alterar la función
  const [seccionVisible, setSeccionVisible] = useState('inicio');
  //El boton de ver mas informacion se encuenra en false hasta que el usuario clickea para ver la info.
  const [mostrarFunciones, setMostrarFunciones] = useState(false);
  //Esto controla el modal que se despliega al suscribirse
  const [mostrarModal, setMostrarModal] = useState(false);
  //El valor de plan elegido se encuentra vacio hasta que el usuario elija uno
  const [planElegido, setPlanElegido] = useState('');
  //Guarda la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  //Codigo se genera en cuanto el usuario se registre exitosamente
  const [codigoGenerado, setCodigoGenerado] = useState('');
  //Mensaje aparece en cuanto se suscribe
  const [mensajeExito, setMensajeExito] = useState(''); 
  
  // Esta funcion modifica el estado de seccionVisible y  controla que sección se renderiza en pantalla segun el click del usuario
  const mostrarSeccion = (id) => {
    setSeccionVisible(id);
  };
  //Funcion que se activa al clickear ver más información
  const toggleFunciones = () => {
    setMostrarFunciones(!mostrarFunciones);
  };
  //
  const abrirModal = (plan) => {
    console.log("Modal abierto con plan:", plan);
    setPlanElegido(plan);
    setMostrarModal(true);
  };
  //Cambia el estado del modal a False en cuanto termina el registro
  const cerrarModalFormulario = () => {
    setMostrarModal(false);
  };

  const agregarUsuario = (usuario) => {
    setUsuarios([...usuarios, usuario]);
    setCodigoGenerado(usuario.codigo);
    setMensajeExito(`✅ ¡Suscripción exitosa! Código: ${usuario.codigo}`); 
  };

  useEffect(() => {
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
  setUsuarios(usuariosGuardados);
}, []);


  //Animaciones para la pagina en todas las secciones y parte del css.
  const getSeccionConAnimacion = (componente) => (
  <div className="seccion-con-animacion">{componente}</div>
);
  // Ocultar el mensaje de éxito después de 4 segundos
  useEffect(() => {
    if (mensajeExito) {
      const timer = setTimeout(() => setMensajeExito(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [mensajeExito]);
  //Mensaje de exito que aparece en cuanto termina el registro
  return (
    <div className="App">
      {/* ✅ Mensaje flotante de éxito arriba */}
      {mensajeExito && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 'bold',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          {mensajeExito}
        </div>
      )}
      {/**Muestra las secciones */}
      <Encabezado onMostrarSeccion={mostrarSeccion} />
      {/** Aca se renderiza cada sección y el getSeccionConAnimacion es para agregarle el efecto aplicado a cada sección */}
      {seccionVisible === 'inicio' && getSeccionConAnimacion(
      <Inicio
      onToggleFunciones={toggleFunciones}//Activa o desactiva el despliegue del boton ver más información
      mostrarFunciones={mostrarFunciones}//Maneja si se muestran o no las funciones
      onMostrarSeccion={mostrarSeccion}//Permite cambiar de sección
        />
      )}
      {seccionVisible === 'quienes' && getSeccionConAnimacion( <QuienesSomos />)}
      {seccionVisible === 'contacto' && getSeccionConAnimacion( <Contacto />)}
      {seccionVisible === 'planes' && getSeccionConAnimacion(<Planes onSuscribirse={abrirModal}/>)} 
      {seccionVisible === 'simulador' && getSeccionConAnimacion( (
        <Simulador onSuscribirse={abrirModal} />
      ))}
      {seccionVisible === 'faq' && getSeccionConAnimacion(<FAQ />)}
      {seccionVisible === 'gestion' && getSeccionConAnimacion( <GestionAdmin />)}
      
      {seccionVisible === 'ubicacion' && getSeccionConAnimacion (<Mapa />)}


      {/** Se muestra el modal al hacer click en suscribirse o simulador. Identifica el plan elejido,la funcion de cerrar el modal y de guardar al usuario */}
      {mostrarModal && (
        <ModalSuscripcion
          visible={mostrarModal}
          plan={planElegido}
          onClose={cerrarModalFormulario}
          agregarUsuario={agregarUsuario}
        />
      )}
      {/**Muestra el mensaje final junto a los botones de descargar aplicacion y copiar codigo. */}
      <RegistroUsuarios
        usuarios={usuarios}
        codigoGenerado={codigoGenerado}
      />
      {/**Pie de pagina de la web */}
      <Footer />
    </div>
  );
}

export default App;


