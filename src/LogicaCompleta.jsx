import React, { useEffect, useState } from "react";

function LogicaCompleta() {
  const [codigoCliente, setCodigoCliente] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [resultadoSimulador, setResultadoSimulador] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const formContacto = document.getElementById("formularioContacto");
    if (formContacto) {
      formContacto.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("telefono").value;
        const terminos = document.getElementById("terminos").checked;
        const mensaje = document.getElementById("mensajeExito");

        if (!nombre || !correo || !telefono || !terminos) {
          mensaje.textContent = "Faltan campos por completar";
          mensaje.style.color = "red";
        } else {
          mensaje.textContent = "Formulario enviado correctamente";
          mensaje.style.color = "green";
        }
        mensaje.style.display = "block";
      });
    }

    document.querySelectorAll(".btn-suscribirse").forEach((boton) => {
      boton.addEventListener("click", () => {
        const plan = boton.getAttribute("data-plan");
        document.getElementById("planSub").value = plan;
        const detalles = {
          Básico: "Incluye rastreo activo 24/7, bloqueo remoto, alertas por correo y historial de ubicación.",
          Avanzado: "Incluye las funciones del plan Básico, alarma remota, borrado de datos, acciones automáticas y geocercas con alertas.",
          Premium: "Incluye todas las funciones de los planes anteriores, soporte técnico 24/7, administrador de préstamos, Kill Switch, cifrado remoto, restauración de fábrica y SSO & SAML corporativo.",
        };
        document.getElementById("detallesPlanSeleccionado").innerHTML = `
          <strong>Detalles del Plan ${plan}:</strong><br>${detalles[plan]}
        `;
        setModalVisible(true);
      });
    });

    const formSuscripcion = document.getElementById("formularioSuscripcion");
    if (formSuscripcion) {
      formSuscripcion.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombreSub").value;
        const correo = document.getElementById("correoSub").value;
        const plan = document.getElementById("planSub").value;
        const pago = document.getElementById("pago").value;
        const contrasena = document.getElementById("contrasena").value;
        const repetir = document.getElementById("repetirContrasena").value;

        if (contrasena.length < 4) {
          alert("La contraseña debe tener al menos 4 caracteres.");
          return;
        }
        if (contrasena !== repetir) {
          alert("Las contraseñas no coinciden.");
          return;
        }

        const fechaHora = new Date().toLocaleString();
        const codigo = "CLT-" + Math.floor(10000 + Math.random() * 90000);

        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${nombre}</td>
          <td>${correo}</td>
          <td>${plan}</td>
          <td>${pago}</td>
          <td>${fechaHora}</td>
          <td>${codigo}</td>
        `;
        document.getElementById("tablaUsuarios").appendChild(fila);

        setUsuarios((prev) => [...prev, { nombre, correo, plan, pago, fechaHora, codigo }]);
        console.log(JSON.stringify({ nombre, correo, plan, pago, fechaHora, codigo }));

        setModalVisible(false);
        setCodigoCliente(codigo);
        document.getElementById("mensajeFinal").style.display = "block";
        e.target.reset();
      });
    }

    const formSimulador = document.getElementById("formSimuladorRecomendado");
    if (formSimulador) {
      formSimulador.addEventListener("submit", (e) => {
        e.preventDefault();
        const dispositivos = parseInt(document.getElementById("dispositivos").value);
        const seguridad = document.getElementById("seguridad").value;
        const uso = document.getElementById("uso").value;

        let plan = "";
        let precioPorDispositivo = 0;

        if (seguridad === "bajo" && dispositivos <= 2) {
          plan = "Básico";
          precioPorDispositivo = 1290;
        } else if (seguridad === "medio" || (dispositivos > 2 && dispositivos <= 4)) {
          plan = "Avanzado";
          precioPorDispositivo = 1790;
        } else if (seguridad === "alto" || dispositivos > 4 || uso === "constante") {
          plan = "Premium";
          precioPorDispositivo = 2100;
        } else {
          plan = "Avanzado";
          precioPorDispositivo = 1790;
        }

        const total = precioPorDispositivo * dispositivos;
        setResultadoSimulador(`
          🔒 Te recomendamos el plan: <strong>${plan}</strong><br>
          💰 Total mensual: <strong>$${total.toLocaleString()} CLP</strong> por ${dispositivos} dispositivo(s).<br><br>
          <button id="btnIrASuscripcion" class="btn-suscribirse-directo">¿Deseas suscribirte a este plan?</button>
        `);

        setTimeout(() => {
          const btn = document.getElementById("btnIrASuscripcion");
          if (btn) {
            btn.addEventListener("click", () => {
              document.getElementById("planSub").value = plan;
              setModalVisible(true);
            });
          }
        }, 100); // asegurar que el botón esté en el DOM
      });
    }

    const botonExpandir = document.getElementById("verMasFuncionalidades");
    if (botonExpandir) {
      botonExpandir.addEventListener("click", () => {
        const funcionalidades = document.getElementById("funcionalidades");
        if (funcionalidades.style.display === "none") {
          funcionalidades.style.display = "block";
          botonExpandir.innerHTML = "Menos Información <";
        } else {
          funcionalidades.style.display = "none";
          botonExpandir.innerHTML = "Más Información >";
        }
      });
    }
  }, []);

  return null; // no renderiza nada visual
}

export default LogicaCompleta;
