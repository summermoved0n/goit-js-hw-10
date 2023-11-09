import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('select.breed-select');
const catInfo = document.querySelector('div.cat-info');
const loader = document.querySelector('p.loader');
const selectConteiner = document.querySelector('.select-conteiner');

function addBreedOptions(breeds) {
  breedSelect.innerHTML = '';
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
  new SlimSelect({
    select: breedSelect,
  });
}

function displayCatInfo(catData) {
  console.log(catData);
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

function toggleLoader(showLoader) {
  if (showLoader) {
    catInfo.innerHTML = '';
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
  }
}

function toggleError(showError) {
  if (showError) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }
  return;
}

toggleLoader(true);
fetchBreeds()
  .then(breeds => {
    selectConteiner.classList.remove('is-hidden')
    addBreedOptions(breeds);
    toggleLoader(false);
  })
  .catch(error => {
    toggleLoader(false);
    toggleError(true);
    console.error('Помилка отримання даних про породи:', error);
  });

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
    catInfo.innerHTML = '';
  }
});
