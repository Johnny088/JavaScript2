const codeType = document.getElementById('type');
const descrType = document.getElementById('spotlight');
const nameError = document.getElementById('nameError');
const typeError = document.getElementById('typeError');
const codeError = document.getElementById('codeError');
let colorBoxes = [];
codeType.addEventListener('change', e => {
  const format = {
    RGB: 'RGB(1 - 255, 1 - 255, 1 - 255)',
    RGBA: 'RGBA (1-255,1-255,1-255,0.1-1)',
    HEX: 'HEX (#101010)',
  };
  descrType.innerHTML = format[codeType.value];
});
const submitForm = document.getElementById('submit');
submitForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors(submitForm);
  const colorName = e.target.color.value.trim();
  const colorType = e.target.type.value;
  const colorCode = e.target.code.value.trim();
  let valid = true;
  if (!validateName(colorName)) {
    nameError.innerHTML = 'Only Letters';
    valid = false;
  }
  if (!validateByType(colorType, colorCode)) {
    codeError.innerHTML = `wrong format for the ${colorType}`;
    valid = false;
  }
  if (!valid) return;
  const tempCode = setColor(colorType, colorCode);
  colorBoxes.push({ colorName, colorType, tempCode });
  setCookie('data', JSON.stringify(colorBoxes));
  newItem(colorName, colorType, tempCode);
});

const newItem = function (colorName, colorType, tempCode) {
  const colorBox = document.getElementById('box__color');
  console.log(tempCode);
  colorBox.innerHTML += `<div class=" my-5" style='background-color: ${tempCode}'><h2>${colorName}</h2><p>${colorType}</p> <p>${tempCode}</p></div>`;
};

// -------------------------validation--------------------------

function validateName(name) {
  const regex = /^[A-Za-zА]+$/;
  return regex.test(name);
}

function validateRGB(code) {
  const regex = /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/;
  const match = code.match(regex);
  if (!match) return false;
  return match.slice(1).every(n => Number(n) >= 0 && Number(n) <= 255);
}

function validateRGBA(code) {
  const regex = /^(\d{1,3}),(\d{1,3}),(\d{1,3}),(0|0\.\d+|1(\.0)?)$/;
  const match = code.match(regex);
  if (!match) return false;
  const rgbOk = match
    .slice(1, 4)
    .every(n => Number(n) >= 0 && Number(n) <= 255);
  const a = Number(match[4]);
  return rgbOk && a >= 0 && a <= 1;
}

function validateHEX(code) {
  return /^#[0-9A-Fa-f]{6}$/.test(code);
}

function validateByType(type, code) {
  if (type === 'RGB') return validateRGB(code);
  if (type === 'RGBA') return validateRGBA(code);
  if (type === 'HEX') return validateHEX(code);
  return false;
}

// ----------- clearing mistakes -------------------
function clearErrors(form) {
  form.querySelectorAll('.error').forEach(el => (el.textContent = ''));
}

// --------- color -----------------
const setColor = function (type, code) {
  if (type === 'RGB') {
    return `rgb(${code})`;
  } else if (type === 'RGBA') {
    return `rgba(${code})`;
  } else if (type === 'HEX') {
    return code;
  }
};

// ------------------------- cookies ----------------------

function setCookie(name, value) {
  const expires = new Date(Date.now() + 3 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let c of cookies) {
    const [key, val] = c.split('=');
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

window.addEventListener('DOMContentLoaded', () => {
  const updated = getCookie('data');

  if (updated) {
    try {
      colorBoxes = JSON.parse(updated);

      colorBoxes.forEach(c => {
        newItem(c.colorName, c.colorType, c.tempCode);
      });
    } catch (e) {
      console.error('Cookie parse error:', e);
    }
  }
});
