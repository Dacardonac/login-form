import Swal from 'sweetalert2'

const container = document.querySelector('.container');
const loginForm = document.querySelector('.sign-in');
const signUpForm = document.querySelector('.sign-up');
const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');

btnSignIn.addEventListener('click', () => {
  container.classList.remove('toggle');
});

btnSignUp.addEventListener('click', () => {
  container.classList.add('toggle');
});

// Función para manejar el evento de envío (submit)
function handleFormSubmit(event, formType) {
  event.preventDefault(); // Evitar la recarga de la página

  const formData = new FormData(event.target); // Capturar los datos del formulario

  // Convertir los datos del formulario a un objeto JSON
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Ver los datos capturados
  console.log(`${formType} Data:`, formObject);

  sendDataToServer(formObject).then(() => {
    // Mostrar alerta de éxito
    Swal.fire({
      title: 'Success!',
      text: 'The user has been saved successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // Limpiar el formulario después de la alerta
      event.target.reset();
    });
  }).catch((error) => {
    // Mostrar alerta de error
    Swal.fire({
      title: 'Error!',
      text: 'Could not save the user.',
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  });
}

// Añadir el listener de envío a cada formulario
loginForm.addEventListener('submit', (event) => handleFormSubmit(event, 'Login'));
signUpForm.addEventListener('submit', (event) => handleFormSubmit(event, 'Sign Up'));

// Función para enviar los datos al servidor
function sendDataToServer(data) {
  return fetch('http://localhost:3000/users', {  // Endpoint para guardar en la colección "users"
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Server response error');
    }
    return response.json();
  })
  .then(data => {
    console.log('User saved:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
    throw error;  // Volver a lanzar el error para manejarlo en el catch de handleFormSubmit
  });
}