const submit = document.getElementById('submit');
submit.addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.firstname.value;
  const lastname = e.target.lastname.value;
  const birthday = e.target.birthday.value;
  const gender = e.target.gender.value;
  const country = e.target.country.value;
  const city = e.target.city.value;
  const skills = Array.from(e.target.skills).reduce((acc, item) => {
    if (item.checked) {
      acc.push(item.value);
    }
    return acc;
  }, []);
  saveData(name, lastname, birthday, gender, country, city, skills);
  loader();
});

const saveData = function (
  name,
  surname,
  birthday,
  gender,
  country,
  city,
  skills
) {
  skills = JSON.stringify(skills);
  localStorage.setItem('firstname', name);
  localStorage.setItem('lastname', surname);
  localStorage.setItem('birthday', birthday);
  localStorage.setItem('gender', gender);
  localStorage.setItem('country', country);
  localStorage.setItem('city', city);
  localStorage.setItem('skills', skills);
};

const getCheckboxes = function () {
  const tempBox = document.querySelectorAll();
};

// -------------------------------Loader-------------------------------
const loader = function () {
  const name = document.getElementById('getFirstname');
  const lastname = document.getElementById('getLastname');
  const birthday = document.getElementById('GetBirthday');
  const gender = document.getElementById('GetGender');
  const country = document.getElementById('GetCountry');
  const city = document.getElementById('getCity');
  const skills = document.getElementById('getSkills');
  const skillsTemp = localStorage.getItem('skills');
  if (skills) {
    skills.textContent = JSON.parse(skillsTemp);
  }
  name.textContent = localStorage.getItem('firstname');
  lastname.textContent = localStorage.getItem('lastname');
  birthday.textContent = localStorage.getItem('birthday');
  gender.textContent = localStorage.getItem('gender');
  country.textContent = localStorage.getItem('country');
  city.textContent = localStorage.getItem('city');
  skills.textContent = localStorage.getItem('skills');
};
document.addEventListener('DOMContentLoaded', loader);
