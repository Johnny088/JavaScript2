const addMessage = function () {
  const userName = document.getElementById('name');
  const userMessage = document.getElementById('feedback');
  const boxMessages = document.getElementById('wrapMessages');
  console.log(userMessage);
  boxMessages.innerHTML += `<div class="d-flex justify-content-between mt-5">
          <p>${userName.value}</p>
          <p>${new Date()}</p>
        </div>
        <div class="mb-5">${userMessage.value}</div>`;
};

const registerForm = document.getElementById('submitForm');
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const password = e.target.password.value;
  const checkPassword = e.target.checkPassword.value;
  if (password === checkPassword) {
    alert('the data was send');
    registerForm.reset();
  } else {
    alert(' passwords is different');
  }
});

// ---------------------------task 3 -------------------
const newColor = document.getElementById('form__colors');
newColor = addEventListener('submit', e => {
  e.defaultPrevented();
  const r = e.target.red.value;
  const g = e.target.green.value;
  const b = e.target.blue.value;
});
