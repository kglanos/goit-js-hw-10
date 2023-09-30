import axios from "axios";
export { fetchBreeds, fetchCatByBreed };

axios.defaults.headers.common['x-api-key'] = 'live_vOiPLNODznPHBOW7PVMtKMDgacOGjcgagL1gHoS4OMosoNzDXQtbMukwVv049dOU';

function fetchBreeds() {
    const apiUrl = `https://api.thecatapi.com/v1/breeds`;

    return axios.get(apiUrl)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('An error occurred while downloading races:', error);
            return Promise.reject(error);
        });
}

function fetchCatByBreed(breedId) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

    return axios.get(apiUrl)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('An error occurred while downloading races:', error);
            return Promise.reject(error);
        });
}