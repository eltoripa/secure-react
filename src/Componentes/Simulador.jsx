import React, { useState } from 'react';
//Interactua con el boton de suscribirse el cual despliega un modal
const Simulador = ({ onSuscribirse }) => {
  const [resultado, setResultado] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    const dispositivos = parseInt(e.target.dispositivos.value);
    const seguridad = e.target.seguridad.value;
    const uso = e.target.uso.value;

    let plan = '';
    let precioPorDispositivo = 0;
    //Condicionales para recomendar el plan al usuario
    if (seguridad === 'bajo' && dispositivos <= 2) {
      plan = 'Básico';
      precioPorDispositivo = 1290;
    } else if (seguridad === 'medio' || (dispositivos > 2 && dispositivos <= 4)) {
      plan = 'Avanzado';
      precioPorDispositivo = 1790;
    } else if (seguridad === 'alto' || dispositivos > 4 || uso === 'constante') {
      plan = 'Premium';
      precioPorDispositivo = 2100;
    } else {
      plan = 'Avanzado';
      precioPorDispositivo = 1790;
    }

    const total = precioPorDispositivo * dispositivos; //Resultado

    setResultado(
      <>
        <p>🔒 Te recomendamos el plan: <strong>{plan}</strong></p>
        <p>💰 Total mensual: <strong>${total.toLocaleString()} CLP</strong> por {dispositivos} dispositivo(s).</p>
        <button className="btn-suscribirse-directo" onClick={() => onSuscribirse(plan)}>
          ¿Deseas suscribirte a este plan?
        </button>
      </>
    );
  };

  return (
    //Formulario para reconocer las respuestas del usuario y que se identifique el plan recomendado.
    <section id="simulador" className="seccion" >
      <h2>Simulador de Plan Ideal</h2>
      <p>Responde estas preguntas y te recomendaremos el plan recomendado para ti:</p>

      <form onSubmit={manejarEnvio}>
        <label htmlFor="dispositivos">¿Cuántos dispositivos deseas proteger? (10 máximo)</label>
        <input type="number" id="dispositivos" name="dispositivos" min="1" max="10" required />

        <label htmlFor="seguridad">¿Qué nivel de seguridad necesitas?</label>
        <select id="seguridad" name="seguridad" required>
          <option value="">Selecciona</option>
          <option value="bajo">Bajo (rastreo y alertas)</option>
          <option value="medio">Medio (rastreo, bloqueo, borrado)</option>
          <option value="alto">Alto (todo lo anterior + geocercas y acciones automáticas)</option>
        </select>

        <label htmlFor="uso">¿Con qué frecuencia necesitas rastrear tus dispositivos?</label>
        <select id="uso" name="uso" required>
          <option value="">Selecciona</option>
          <option value="ocasional">Ocasionalmente</option>
          <option value="constante">Constante / diario</option>
        </select>

        <button type="submit">Recomendar Plan</button>
      </form>

      <div id="resultadoRecomendacion" style={{ marginTop: '20px', fontSize: '1.2em' }}>
        {resultado}
      </div>
    </section>
  );
};

export default Simulador;
