import React, { useState } from 'react';

const Contacto = () => {
  //Funciones vacias a la espera del input del usuario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [motivo, setMotivo] = useState(''); 
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [colorMensaje, setColorMensaje] = useState('green');

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !aceptaTerminos || !motivo.trim()) {
      setMensaje('Faltan campos por completar');
      setColorMensaje('red');
    } else {
      setMensaje('Formulario enviado correctamente');
      setColorMensaje('green');

      // mostrar en consola que fue enviado el formulario de contacto
      console.log({ nombre, correo, telefono, motivo });
    }
  };

  return (
    //Formulario de contacto
    <section id="contacto" className="seccion" style={{ textAlign: 'center', padding: '40px' }}>
      <h2>Formulario de contacto</h2>
      <p>¿Tienes alguna pregunta o necesitas ayuda con la protección de tu dispositivo? Completa el formulario y nuestro equipo de soporte se pondrá en contacto contigo.</p>

      <form onSubmit={manejarEnvio} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <label htmlFor="nombre">Nombre:</label><br />
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa tu nombre"
          required
          pattern="[A-Za-z\s]+"
        /><br /><br />

        <label htmlFor="correo">Correo electrónico:</label><br />
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ingresa tu correo"
          required
        /><br /><br />

        <label htmlFor="telefono">Teléfono (opcional):</label><br />
        <input
          type="tel"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ingresa tu número"
          pattern="^[0-9]+$"
        /><br /><br />

        <label htmlFor="motivo">Motivo de contacto:</label><br />
      <textarea
        id="motivo"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        required
        style={{
          width: '100%',
          height: '100px',
          padding: '10px',
          fontSize: '1em',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#282e3f', 
          color: 'white',
          resize: 'vertical',
        }}
      ></textarea>


        <label>
          <input
            type="checkbox"
            id="terminos"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            required
          />
          Acepto los términos y condiciones.
        </label><br /><br />

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff6600',
            color: 'white',
            fontSize: '1em',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Enviar
        </button>
      </form>

      {mensaje && (
        <p style={{ marginTop: '20px', color: colorMensaje }}>
          {mensaje}
        </p>
      )}
    </section>
  );
};

export default Contacto;

