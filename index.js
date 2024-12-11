const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const btnAgregar = document.querySelector("#btnAgregar");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";

let id;
let LIST;

// Agrega la fecha al encabezado
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

// Agrega una tarea a la lista y al DOM
function agregarTarea(tarea, id, terminado, eliminado) {
  if (eliminado) return;

  const TERMINADO = terminado ? check : uncheck;
  const LINE = terminado ? lineThrough : "";

  const elemento = `<li id="elemento">
            <i class="far ${TERMINADO}" data="terminado" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
          </li>`;
  lista.insertAdjacentHTML("beforeend", elemento);
}

// Escucha el botón para agregar una nueva tarea
btnAgregar.addEventListener("click", () => {
  const tarea = input.value.trim();
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      terminado: false,
      eliminado: false,
    });
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }
  input.value = "";
});

// Escucha la tecla "Enter" para agregar una tarea
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const tarea = input.value.trim();
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        terminado: false,
        eliminado: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

// Marca una tarea como terminada o no terminada
function tareaTerminada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  const taskId = element.id;
  LIST[taskId].terminado = !LIST[taskId].terminado;
}

// Elimina una tarea de la lista y del DOM
function tareaEliminada(element) {
  const taskId = element.id;
  LIST = LIST.filter((item) => item.id != taskId);
  element.parentNode.parentNode.removeChild(element.parentNode);
  localStorage.setItem("TODO", JSON.stringify(LIST));
}

// Escucha eventos en la lista para marcar o eliminar tareas
lista.addEventListener("click", function (event) {
  const element = event.target;

  if (!element.attributes.data) return;

  const elementData = element.attributes.data.value;

  if (elementData === "terminado") {
    tareaTerminada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Carga las tareas desde localStorage al cargar la página
let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

// Carga las tareas almacenadas en el DOM
function cargarLista(DATA) {
  DATA.forEach(function (i) {
    agregarTarea(i.nombre, i.id, i.terminado, i.eliminado);
  });
}
