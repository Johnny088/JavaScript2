let selectedId;
// -------main function -------------------
const posts = document.getElementById('showPosts');
const postBox = document.getElementById('postBox');
const fetchUsers = async function () {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const box = document.getElementById('grid');
  try {
    const result = await fetch(url);
    if (!result.ok) {
      console.log(result.status);
      return;
    }
    const data = await result.json();
    showNames(data, box);
  } catch (error) {
    console.error(error);
  }
};
// ---------- render names -----------------
const showNames = function (data, box) {
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = item.name;
    div.addEventListener('click', () => {
      userInfo(item);
      selectedId = item.id;
      postBox.innerHTML = '';
    });
    box.appendChild(div);
  });
};
// --------------get all info of chosen user -----------
const userInfo = function (item) {
  const name = document.getElementById('name');
  const userName = document.getElementById('userName');
  const address = document.getElementById('address');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const website = document.getElementById('website');
  name.textContent = item.name;
  userName.textContent = item.username;
  address.textContent = `${item.address.city}, ${item.address.street}`;
  email.textContent = item.email;
  if (item.phone) {
    phone.textContent = item.phone;
  } else {
    phone.textContent = "isn't given";
  }
  if (item.website) {
    website.textContent = item.website;
  } else {
    website.textContent = "isn't given";
  }
};

// ------------------------ posts ---------------------------
const showPosts = async function () {
  const postUrl = 'https://jsonplaceholder.typicode.com/posts';
  postBox.innerHTML = '';
  try {
    const result = await fetch(postUrl);
    if (!result.ok) {
      console.log(result.status);
      return;
    }
    const data = await result.json();
    if (!selectedId) {
      alert('none of the user is chosen');
      return;
    } else {
      data.forEach(item => {
        if (item.userId === selectedId) {
          const li = document.createElement('li');
          li.innerHTML = `<h3>${item.title}</h3> <p>${item.body}</p>`;
          postBox.appendChild(li);
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
};
posts.addEventListener('click', showPosts);
fetchUsers();
