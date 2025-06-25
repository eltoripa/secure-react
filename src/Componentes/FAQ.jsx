import React from 'react';

const FAQ = () => {
  //Seccion de preguntas generales para resolver dudas de la aplicación.
  return (
    <section id="faq" className="seccion">
      <h2>Preguntas Frecuentes</h2>
      <ul>
        <li>
          <strong>¿Qué sucede si mi laptop no tiene GPS?</strong><br />
          Secure utiliza métodos como la triangulación de redes Wi-Fi y la dirección IP para estimar la ubicación del dispositivo.
        </li>
        <li>
          <strong>¿Puedo rastrear varios dispositivos con una misma cuenta?</strong><br />
          Sí, puedes registrar y gestionar múltiples dispositivos desde una sola cuenta de usuario.
        </li>
        <li>
          <strong>¿Qué ocurre si el ladrón apaga el dispositivo?</strong><br />
          El sistema mostrará la última ubicación conocida y se reactivará cuando el dispositivo vuelva a conectarse a internet.
        </li>
        <li>
          <strong>¿Necesito internet para que funcione?</strong><br />
          Secure utiliza internet para ejecutar funciones como rastreo, bloqueo o borrado. Si el dispositivo está desconectado, las acciones se ejecutan al reconectarse.
        </li>
        <li>
          <strong>¿Puedo instalar Secure en un dispositivo perdido?</strong><br />
          No. Secure debe estar instalada y configurada antes de la pérdida. No es posible instalarla remotamente.
        </li>
        <li>
          <strong>¿Cómo protege Secure mis datos personales?</strong><br />
          Secure cifra toda la comunicación entre tus dispositivos y nuestros servidores. Además, ofrece bloqueo remoto y borrado de datos.
        </li>
        <li>
          <strong>¿Qué pasa si desinstalan la aplicación?</strong><br />
          Recomendamos activar permisos de administrador para evitar la desinstalación. También puedes recibir alertas si ocurre.
        </li>
        <li>
          <strong>¿Cómo se identifican los dispositivos?</strong><br />
          Secure usa identificadores como el IMEI (móviles), dirección MAC o número de serie (laptops/PCs).
        </li>
      </ul>
    </section>
  );
};

export default FAQ;

