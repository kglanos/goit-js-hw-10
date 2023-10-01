import axios from 'axios';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const reference = {

    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error')
}


document.addEventListener('DOMContentLoaded', function() {
    reference.loader.classList.add('visible');
});



fetchBreeds() 
.then(breeds => {

    const firstElement = `<option>Please, select a cat</option>`;
    reference.breedSelect.insertAdjacentHTML('afterbegin', firstElement);

    const markupSelect = breeds
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join(' ');

        reference.breedSelect.insertAdjacentHTML('afterbegin', markupSelect);
        reference.loader.classList.remove('visible');
        reference.loader.classList.add('hidden');

        const slimSelect = new SlimSelect({
            select: reference.breedSelect,
            placeholder: 'Please, select a cat',
            showSearch: true,
        });
})

.catch(error => {
    console.error(error);
    reference.loader.classList.remove('visible');
    reference.loader.classList.add('hidden');
    Notiflix.Notify.failure('An error occurred while fetching breeds.');
});

reference.breedSelect.addEventListener('change', onchange);

function onchange(event) {
    const breedId = reference.breedSelect.value;

    
    reference.loader.classList.add('visible');

    fetchCatByBreed(breedId)
        .then(catInfo => {
            if(catInfo.length === 0) {
                reference.loader.classList.remove('visible');
                reference.loader.classList.add('hidden');
                Notiflix.Notify.warning('No cats found.');
            } else {
                reference.error.classList.add('hidden');
                reference.catInfo.classList.remove('hidden');
        
                const liArray = catInfo.map(cat => {
                    const { url, breeds } = cat;
                    const breedItems = breeds.map(breed => {
                    return `
                        <div class="image-container">
                        <img class="image-cat" src="${url}" alt="${breed.name}">
                        <div class="text-container"> 
                            <h1 class="title">${breed.name}</h1>
                            <p class="first-text">${breed.description}</p>
                            <p class="second-text">Temperament: ${breed.temperament}</p>
                        </div>
                        </div>
                    `;
                });
                    return breedItems.join(' ');
                })

                const markup = liArray.join(' ');
                reference.catInfo.innerHTML = markup;

                reference.loader.classList.remove('visible');
                reference.loader.classList.add('hidden');
            }
        })
        .catch(error => {
            console.error(error);
            reference.loader.classList.remove('visible');
            reference.loader.classList.add('hidden');
            reference.catInfo.classList.add('hidden')
            Notiflix.Notify.failure('An error occurred while fetching cat information.');
        })
}


