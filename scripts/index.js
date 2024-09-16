class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(id, title, description, imgUrl) {
        if (!title || !description) {
            alert('El título y la descripción son obligatorios');
            return;
        }
        const newActivity = new Activity(id, title, description, imgUrl);
        this.activities.push(newActivity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter((act) => act.id !== id);
    }
}

// Instancia global del repositorio
const repository = new Repository();

// Función para crear una tarjeta HTML a partir de una actividad
function createActivityHTML(activity) {
    const { id, title, description, imgUrl } = activity;

    // Crear el contenedor de la tarjeta
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('data-id', id);

    // Crear el título
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    // Crear la descripción
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    // Crear la imagen
    const imgElement = document.createElement('img');
    imgElement.src = imgUrl;
    imgElement.alt = title;

    // Agregar los elementos al contenedor de la tarjeta
    cardDiv.appendChild(titleElement);
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(descriptionElement);

    // Devolver el contenedor con todos los elementos
    return cardDiv;
}

// Manejar el envío del formulario
document.getElementById('activity-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto

    // Obtener los valores del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('activity-image').files[0];

    // Generar una URL para la imagen subida
    const imgUrl = URL.createObjectURL(imageInput);

    // Crear una nueva instancia de Activity y agregarla al repositorio
    const newActivity = new Activity(Date.now(), title, description, imgUrl);
    repository.createActivity(newActivity.id, title, description, imgUrl);

    // Convertir la actividad en HTML y agregarla al DOM
    const activityElement = createActivityHTML(newActivity);
    document.getElementById('activities-container').appendChild(activityElement);

    // Limpiar el formulario
    document.getElementById('activity-form').reset();
});
