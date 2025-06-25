import React, { useState } from 'react';

const ModalSuscripcion = ({ visible, plan, onClose, agregarUsuario }) => {
  //Estado que guarda los datos ingresados por el usuario
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    planSeleccionado: plan || 'Básico', //El plan basico va por defecto si no se elije otro plan
    pago: '',
    contrasena: '',
    repetir: '',
  });
  //Esto muestra errores de validación
  const [error, setError] = useState('');
  const [codigoCliente, setCodigoCliente] = useState(null);
  //Maneja los cambios en los input del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
//Maneja el envio del formulario
const handleSubmit = (e) => {
  e.preventDefault();
  const { nombre, correo, planSeleccionado, pago, contrasena, repetir } = formData;

  if (contrasena.length < 4) {
    alert('La contraseña debe tener al menos 4 caracteres.');
    return;
  }

  if (contrasena !== repetir) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  const fechaHora = new Date().toLocaleString();
  const codigo = 'CLT-' + Math.floor(10000 + Math.random() * 90000);

  const nuevoUsuario = {
    nombre,
    correo,
    plan: planSeleccionado,
    pago,
    fechaHora,
    codigo,
  };

  // guarda en localStorage
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuariosGuardados.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

  if (agregarUsuario) agregarUsuario(nuevoUsuario);

  console.log(JSON.stringify(nuevoUsuario));
  setCodigoCliente(codigo);

  setFormData({
    nombre: '',
    correo: '',
    planSeleccionado: plan || 'Básico',
    pago: '',
    contrasena: '',
    repetir: '',
  });

  onClose();
};


  if (!visible) return null;
  //Contenido del formulario del modal
  return (
    <div className="modal">
      <div className="modal-contenido">
        <span className="cerrar" onClick={onClose}>&times;</span>
        <h2>Formulario de Suscripción</h2>

        <div id="detallesPlanSeleccionado">
          <strong>Plan seleccionado:</strong> {plan}
        </div><br />

        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            pattern="[A-Za-z\s]+"
            required
          /><br /><br />

          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          /><br /><br />

          <label htmlFor="planSeleccionado">Selecciona un plan:</label>
          <select
            id="planSeleccionado"
            value={formData.planSeleccionado}
            onChange={handleChange}
            required
          >
            <option value="Básico">Básico</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Premium">Premium</option>
          </select><br /><br />

          <label htmlFor="pago">Método de pago:</label>
          <select
            id="pago"
            value={formData.pago}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="PayPal">PayPal</option>
          </select><br /><br />

          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          /><br /><br />

          <label htmlFor="repetir">Repetir Contraseña:</label>
          <input
            type="password"
            id="repetir"
            value={formData.repetir}
            onChange={handleChange}
            required
          /><br /><br />

          <button type="submit">Continuar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalSuscripcion;
