const addMessage = function () {
  const userName = document.getElementById('name');
  const userMessage = document.getElementById('feedback');
  const boxMessages = document.getElementById('wrapMessages');
  console.log(userMessage);
  boxMessages.innerHTML += `<div class="d-flex justify-content-between">
          <p>${userName.value}</p>
          <p>${new Date()}</p>
        </div>
        <div>${userMessage.value}</div>`;
};
