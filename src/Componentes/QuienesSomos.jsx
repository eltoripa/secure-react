import React from 'react';
const QuienesSomos = () => {
  return (
    //La seccion muestra la informacion sobre el equipo de trabajo y el tiempo dedicado a ofrecer un buen servicio.
    <section id="quienes" className="seccion" >
      <h2>Quiénes somos</h2>
      <p>
        En <strong>Secure</strong> nos especializamos en proteger lo que más te importa: tu información personal y tus dispositivos móviles. 
        Nuestra misión es ofrecer soluciones tecnológicas efectivas, accesibles y confiables para combatir el robo, la pérdida y el mal uso de los dispositivos en América Latina.
      </p>

      <p>
        Desde nuestros inicios, hemos desarrollado herramientas que combinan la seguridad avanzada con la facilidad de uso, permitiéndote tomar el control de tu dispositivo en cualquier momento, desde cualquier lugar.
      </p>

      <img 
        src="fot1.jpg" 
        alt="Equipo de Secure trabajando" 
        style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '20px auto', borderRadius: '10px' }} 
      />

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
  );
};

export default QuienesSomos;
