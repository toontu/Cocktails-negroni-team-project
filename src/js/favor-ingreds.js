const cocktailContainer = document.querySelector('.main');
const favorIngredsList = document.querySelector('.favor-ingreds__list');
const divs = document.querySelector('.modal2');

import {
  getElement,
  createIngredientMarkup,
  add,
  clearMarkupModal,
  onEscapeBtnPush,
  save,
  load,
} from './modalIng';

function checkPage() {
  if (favorIngredsList.dataset.page === 'favor-ingreds') {
    cocktailContainer.classList.add('visually-hidden');
  }
}
checkPage();

const STORAGE_KEY = 'localIngredient';

const favIngredsFromLS = JSON.parse(localStorage.getItem(STORAGE_KEY));

function makeGalleryItem({
  strIngredient,
  strType,
  strABV,
  strAlcohol,
  strDescription,
} = {}) {
  return `<li class="ingreds__item">
          <h3 class="ingreds__item__title">${strIngredient}</h3>
          <p class="ingreds__item__descript">${strType}</p>
          <div class="btn-container">
            <button type="button" class="btn-rusty btn-ingred" data-name="${strIngredient}">
              Learn more
            </button>
            <button type="button" class="btn-transpar btn-ingred" data-ingred="${strIngredient}">
              Remove<span class="btn-transpar-heart"><svg class="btn__icon" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 17L8.1225 15.7771C3.23 11.4507 0 8.59727 0 5.09537C0 2.24196 2.299 0 5.225 0C6.878 0 8.4645 0.750409 9.5 1.93624C10.5355 0.750409 12.122 0 13.775 0C16.701 0 19 2.24196 19 5.09537C19 8.59727 15.77 11.4507 10.8775 15.7864L9.5 17Z" fill="#FD5103"/>
<path d="M9.50005 15.2101L8.38493 14.2447C4.42433 10.8291 1.80957 8.57639 1.80957 5.81172C1.80957 3.55903 3.67067 1.78906 6.03933 1.78906C7.37748 1.78906 8.66178 2.38149 9.50005 3.31767C10.3383 2.38149 11.6226 1.78906 12.9608 1.78906C15.3294 1.78906 17.1905 3.55903 17.1905 5.81172C17.1905 8.57639 14.5758 10.8291 10.6152 14.252L9.50005 15.2101Z" fill="#FCFCFC"/>
</svg>
</span>
            </button>
          </div>
        </li>`;
}

const favIngredsFromLSArr = favIngredsFromLS.map(el => {
  return makeGalleryItem(el);
});

favorIngredsList.innerHTML = favIngredsFromLSArr.join('');

favorIngredsList.addEventListener('click', onRemoveIngredClick);

function onRemoveIngredClick(event) {
  if (!event.target.classList.contains('btn-transpar')) {
    return;
  }
  const name = event.target.dataset.ingred;
  console.dir(name);
  remFromLocalSIngreds(name);
  location.reload();
}

function remFromLocalSIngreds(ingredName) {
  const localStorageData = localStorage.getItem(STORAGE_KEY);
  if (!localStorageData) {
    return;
  } else {
    const favIngredtArray = [];

    for (const ingredient of favIngredsFromLS) {
      if (ingredient.strIngredient === ingredName) {
        continue;
      }
      favIngredtArray.push(ingredient);
    }
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favIngredtArray));
  }
}

function openModalIngredient(event) {
  const name = event.target.dataset.name;

  getElement(name).then(data => {
    clearMarkupModal(divs);
    divs.classList.remove('is-hidden');
    const dataIngredient = data.ingredients;
    const markup = createIngredientMarkup(dataIngredient);
    add(markup);
    window.addEventListener('keydown', onEscapeBtnPush);
    const btnContainer = divs.querySelector('.modalw2--blockbutton--add');
    btnContainer.innerHTML = '';
  });

  if (!event.target.classList.contains('btn-rusty')) {
    return;
  }
  divs.classList.remove('is-hidden');
  console.log('Nikita modal opened');
}

favorIngredsList.addEventListener('click', openModalIngredient);
