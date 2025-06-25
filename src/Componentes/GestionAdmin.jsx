import React, { useState, useEffect } from 'react';

const GestionAdmin = () => {
  //Verifica si admin ya esta autenticado
  const [autenticado, setAutenticado] = useState(() => localStorage.getItem('autenticado') === 'true');
  //Carga la lista de usuarios desde el localStorage o lo deja vacio si no hay nada
  const [usuarios, setUsuarios] = useState(() => JSON.parse(localStorage.getItem('usuarios')) || []);
  //Carga los planes del localStorage si existen para manejar el estado.
  const [planes, setPlanes] = useState(() => {
  const guardados = JSON.parse(localStorage.getItem('planes'));

  //Guardo los planes originales de la pagina para permitir la insercion de nuevos planes
  return guardados && guardados.length > 0
    ? guardados
    : [
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
      ];
});
  //Funciones vacias a la espera de ser modificadas
  const [nuevoPlan, setNuevoPlan] = useState({ nombre: '', precio: '', descripcion: '' });
  const [modoEdicionPlan, setModoEdicionPlan] = useState(null);
  const [formUsuario, setFormUsuario] = useState({ nombre: '', correo: '', plan: '' });
  const [modoEdicionUsuario, setModoEdicionUsuario] = useState(null);

  useEffect(() => {
    localStorage.setItem('planes', JSON.stringify(planes));
  }, [planes]);

  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem('autenticado', autenticado);
  }, [autenticado]);

  const loginAdmin = (e) => {
    e.preventDefault();
    if (e.target.password.value === 'admin123') setAutenticado(true);
    else alert('Contraseña incorrecta');
  };

  const manejarNuevoPlan = (e) => {
    setNuevoPlan({ ...nuevoPlan, [e.target.name]: e.target.value });
  };

const agregarPlan = () => {
  if (!nuevoPlan.nombre || !nuevoPlan.precio || !nuevoPlan.descripcion) return;

  // Validar que el nombre solo tenga letras
  const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nuevoPlan.nombre);
  if (!nombreValido) {
    alert('El nombre del plan solo debe contener letras.');
    return;
  }

  // Validar que el precio solo tenga números
  const soloNumeros = nuevoPlan.precio.replace(/\D/g, '');
  if (!soloNumeros) {
    alert('El precio solo debe contener números.');
    return;
  }

  // Formatear el precio
  const precioFormateado = `$${parseInt(soloNumeros).toLocaleString('es-CL')}/mes`;

  // Procesar la descripción en forma de array
  const descripcionLista = nuevoPlan.descripcion
    .split(',')
    .map(d => d.trim())
    .filter(d => d.length > 0);

  setPlanes([...planes, {
    nombre: nuevoPlan.nombre,
    precio: precioFormateado,
    descripcion: descripcionLista
  }]);

  setNuevoPlan({ nombre: '', precio: '', descripcion: '' });
};

  //Detecta el plan que desea editar
  const editarPlan = (index) => {
    setModoEdicionPlan(index);
    const p = planes[index];
    //Aca identifica el array de la descripcion y ve si hay comas en caso de ser necesario.
    setNuevoPlan({ ...p, descripcion: Array.isArray(p.descripcion) ? p.descripcion.join(', ') : p.descripcion });
  };

  const guardarEdicionPlan = (index) => {
    const copia = [...planes]; //Crea copia del array de planes
    //Actualiza la descripcion dividiendola por comas y el map para recorrer todo
    copia[index] = { ...nuevoPlan, descripcion: nuevoPlan.descripcion.split(',').map(d => d.trim()) };
    setPlanes(copia);
    setModoEdicionPlan(null);
    setNuevoPlan({ nombre: '', precio: '', descripcion: '' });
  };

  const eliminarPlan = (index) => {
    const copia = [...planes];
    copia.splice(index, 1);
    setPlanes(copia);
  };

  const manejarUsuario = (e) => {
    setFormUsuario({ ...formUsuario, [e.target.name]: e.target.value });
  };


  const editarUsuario = (index) => {
    setModoEdicionUsuario(index);
    setFormUsuario(usuarios[index]);
  };

  const guardarEdicionUsuario = (index) => {
    const copia = [...usuarios];
    copia[index] = formUsuario;
    setUsuarios(copia);
    setModoEdicionUsuario(null);
    setFormUsuario({ nombre: '', correo: '', plan: '' });
  };

  const eliminarUsuario = (index) => {
    const copia = [...usuarios];
    copia.splice(index, 1);
    setUsuarios(copia);
  };
    const cerrarSesion = () => {
  setAutenticado(false);
  localStorage.setItem('autenticado', 'false');
};
  //Maneja la autenticación del administrador si esta logueado o no
  if (!autenticado) {
    return (
      <section className="seccion">
        <h2>🔐 Área de Gestión</h2>
        <form onSubmit={loginAdmin}>
          <input type="password" name="password" placeholder="Contraseña admin" required />
          <button type="submit">Entrar</button>
        </form>
      </section>
    );
  }

  return (
    // Seccion de la gestion de usuarios y ubicacion del boton de cerrar sesión.
<section className="seccion">
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h2>👤 Gestión de Usuarios</h2>
    <button onClick={cerrarSesion} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}>
      Cerrar sesión
    </button>
  </div>
<table>
  {/**Tabla que aparece en la seccion de gestion y muestra valores si los hay, tambien cuenta con los botones de editar y eliminar */}
  <thead>
    <tr><th>Nombre</th><th>Correo</th><th>Plan</th><th>Acciones</th></tr>
  </thead>
  <tbody>
    {usuarios.map((u, i) => (
      <tr key={i}>
        <td>{u.nombre}</td>
        <td>
          {modoEdicionUsuario === i
            ? <input name="correo" value={formUsuario.correo} onChange={manejarUsuario} />
            : u.correo}
        </td>
        <td>
          {modoEdicionUsuario === i ? (
            <select name="plan" value={formUsuario.plan} onChange={manejarUsuario}>
              {planes.map((p, idx) => ( //El .map recorre cada valor del plan del usuario
                <option key={idx} value={p.nombre}>{p.nombre}</option>
              ))}
            </select>
          ) : (
            u.plan
          )}
        </td>
        <td>
          {modoEdicionUsuario === i ? (
            <button onClick={() => guardarEdicionUsuario(i)}>Guardar</button>
          ) : (
            <>
              <button onClick={() => editarUsuario(i)}>Editar</button>
              <button onClick={() => eliminarUsuario(i)}>Eliminar</button>
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

<hr />

<h2>📋 Gestión de Planes</h2>
<table>
  <thead>
    <tr><th>Nombre</th><th>Precio</th><th>Descripción</th><th>Acciones</th></tr>
  </thead>
  <tbody>
    {planes.map((p, i) => ( //Recorre los planes y los muestra en la tabla si existen
      <tr key={i}>
        <td>
          {modoEdicionPlan === i ? (
            <input
              name="nombre"
              value={nuevoPlan.nombre}
              onChange={manejarNuevoPlan}
              pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+"
              title="Solo se permiten letras y espacios"
            />
          ) : (
            p.nombre
          )}
        </td>
        <td>
          {modoEdicionPlan === i ? (
            <input
              name="precio"
              value={nuevoPlan.precio}
              onChange={manejarNuevoPlan}
              pattern="[0-9]+"
              title="Solo se permiten números"
            />
          ) : (
            p.precio
          )}
        </td>
        <td>
          {modoEdicionPlan === i ? (
            <textarea
              name="descripcion"
              value={nuevoPlan.descripcion}
              onChange={manejarNuevoPlan}
              placeholder="Separar con comas"
            />
          ) : Array.isArray(p.descripcion) ? (
            //Evalua si la descripcion es un array, osea separado por comas lo muestra con una lista li.
            <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
              {p.descripcion.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            p.descripcion
          )}
        </td>
        <td>
          {modoEdicionPlan === i ? (
            <button onClick={() => guardarEdicionPlan(i)}>Guardar</button>
          ) : (
            <>
              <button onClick={() => editarPlan(i)}>Editar</button>
              <button onClick={() => eliminarPlan(i)}>Eliminar</button>
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {/**Funcion para agregar planes a la tabla */}
      <h3>➕ Agregar Plan</h3>
      <input name="nombre" placeholder="Nombre" value={nuevoPlan.nombre} onChange={manejarNuevoPlan} />
      <input name="precio" placeholder="Precio" value={nuevoPlan.precio} onChange={manejarNuevoPlan} />
      <input name="descripcion" placeholder="Descripción (separar por coma)" value={nuevoPlan.descripcion} onChange={manejarNuevoPlan} />
      <button onClick={agregarPlan}>Agregar</button>
    </section>
  );
};

export default GestionAdmin;
