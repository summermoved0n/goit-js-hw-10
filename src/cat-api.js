import axios from 'axios';

const API_KEY =
  'live_QDM1AZ2SclidlxW4EwigmjI61tQSONxQScze1PFhHFIwU6xmNiCV0wa9Z6SY58n8';
axios.defaults.headers.common['x-api-key'] = API_KEY;

const API_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get(`${API_URL}/breeds`).then(response => {
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error(response.status);
    }
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${API_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data[0];
      } else {
        throw new Error(response.status);
      }
    });
}
