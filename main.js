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
newColor.addEventListener('submit', e => {
  e.preventDefault();
  const r = e.target.red.value;
  const g = e.target.green.value;
  const b = e.target.blue.value;
  newElement(r, g, b);
});

const newElement = function (r, g, b) {
  const boxColors = document.getElementById('box__colors');
  boxColors.innerHTML += `<div class="wrap__color mt-5 col-3">
          <div class="template__color" style='background-color: rgb(${r},${g},${b})'></div>
          <div class="description">RGB (${r},${g},${b})</div>
        </div>`;
};
