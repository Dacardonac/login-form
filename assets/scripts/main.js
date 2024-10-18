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

  const formData = new FormData(event.target); // Capturar los datos del formulario

  // Convertir los datos del formulario a un objeto JSON
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // Ver los datos capturados
  console.log(`${formType} Data:`, formObject);

  sendDataToServer(formObject).then(() => {
    // Limpiar el formulario después de enviar los datos
    event.target.reset();
  });
}

// Añadir el listener de envío a cada formulario
loginForm.addEventListener('submit', (event) => handleFormSubmit(event, 'Login'));
signUpForm.addEventListener('submit', (event) => handleFormSubmit(event, 'Sign Up'));

// Función para enviar los datos al servidor

function sendDataToServer(data) {
  fetch('http://localhost:3000/users', {  // Endpoint para guardar en la colección "users"
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('User saved:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}