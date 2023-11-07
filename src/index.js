import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

const mySelect = new SlimSelect({
  select: '#selectElement',
});

const breedSelect = document.querySelector('select.breed-select');
const catInfo = document.querySelector('div.cat-info');
const loader = document.querySelector('p.loader');
const errorElement = document.querySelector('p.error');

// Функція для додавання опцій до селекту
function addBreedOptions(breeds) {
  breedSelect.innerHTML = ''; // Очистити селект перед додаванням нових опцій
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

// Функція для відображення інформації про кота
function displayCatInfo(catData) {
  catInfo.innerHTML = `
    <div class='cat-conteiner'>
      <div class='cat-top-block'><img class='cat-img' src="${catData.url}" alt="${catData.breeds[0].name}" width='200'></div>
      <div>
        <h3 class='cat-title'>${catData.breeds[0].name}</h3>
        <p class='cat-text'><span class='pink-text'>Description:</span> ${catData.breeds[0].description}</p>
        <p class='cat-temp'><span class='pink-text'>Temperament:</span> ${catData.breeds[0].temperament}</p>
      </div>
    </div>
  `;
}

// Функція для показу/приховування завантажувача
function toggleLoader(showLoader) {
  if (showLoader) {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
  }
}

// Функція для показу/приховування помилки
function toggleError(showError) {
  if (showError) {
    errorElement.style.display = 'block';
  } else {
    errorElement.style.display = 'none';
  }
}

// Отримати список порід при завантаженні сторінки
toggleLoader(true);
fetchBreeds()
  .then(breeds => {
    addBreedOptions(breeds);
    toggleLoader(false);
  })
  .catch(error => {
    toggleLoader(false);
    toggleError(true);
    console.error('Помилка отримання даних про породи:', error);
  });

// Відобразити інформацію про кота при виборі породи
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    toggleLoader(true);
    toggleError(false);
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        displayCatInfo(catData);
        toggleLoader(false);
      })
      .catch(error => {
        toggleLoader(false);
        toggleError(true);
        console.error('Помилка отримання даних про кота:', error);
      });
  } else {
    catInfo.innerHTML = ''; // Очистити інформацію про кота, якщо порода не вибрана
  }
});
