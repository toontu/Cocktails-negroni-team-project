import axios from 'axios';

const divs = document.querySelector('.modal2'); // Nikita
console.log(divs);

const favorIngredsList = document.querySelector('.favor-ingreds__list');
console.log(favorIngredsList);
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
            <button type="button" class="btn-transpar btn-ingred">
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

function openModalIngredient(event) {
  const name = event.target.dataset.name;
  console.log(name);
  getElement(name).then(data => {
    clearMarkupModal(divs);
    dataIngredient = data.ingredients;
    const markup = createIngredientMarkup(dataIngredient);
    add(markup);

    window.addEventListener('keydown', onEscapeBtnPush);
  });
  if (!event.target.classList.contains('btn-rusty')) {
    return;
  }
  divs.classList.remove('is-hidden');
}

favorIngredsList.addEventListener('click', openModalIngredient);

// Nikita
let dataIngredient = [];

export async function getElement(name) {
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
    );
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
}

export function createIngredientMarkup(response = []) {
  const getIngredientOnLocal = JSON.parse(
    localStorage.getItem('localIngredient')
  );
  return response
    .map(({ strIngredient, strType, strABV, strAlcohol, strDescription }) => {
      let ingredientCheck;
      if (getIngredientOnLocal) {
        ingredientCheck = getIngredientOnLocal.find(
          ingredient => ingredient.strIngredient === strIngredient
        );
      }
      return `<div class="modalw2">
            <div class="modalw2__p modalw2__border">
                <h2 class="modalw2__title">${strIngredient}</h2>
            <button class="modalw2__btn"><svg width="32px" height="32px" <svg class="modalw2__svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_904_4571)">
            <path d="M17.2537 16L24.6226 8.63112C24.7683 8.46107 24.8444 8.24234 24.8357 8.01863C24.8271 7.79492 24.7343 7.5827 24.576 7.4244C24.4177 7.26609 24.2055 7.17335 23.9818 7.16471C23.7581 7.15607 23.5393 7.23216 23.3693 7.37779L16.0004 14.7467L8.63152 7.3689C8.46414 7.20152 8.23712 7.10748 8.00041 7.10748C7.7637 7.10748 7.53668 7.20152 7.3693 7.3689C7.20192 7.53628 7.10788 7.7633 7.10788 8.00001C7.10788 8.23672 7.20192 8.46374 7.3693 8.63112L14.7471 16L7.3693 23.3689C7.27625 23.4486 7.20068 23.5466 7.14732 23.6569C7.09397 23.7672 7.06398 23.8873 7.05926 24.0097C7.05453 24.1322 7.07515 24.2542 7.11984 24.3683C7.16453 24.4824 7.23232 24.586 7.31894 24.6726C7.40557 24.7592 7.50917 24.827 7.62323 24.8717C7.7373 24.9164 7.85937 24.937 7.98179 24.9323C8.10421 24.9275 8.22433 24.8976 8.33461 24.8442C8.44489 24.7909 8.54295 24.7153 8.62263 24.6222L16.0004 17.2533L23.3693 24.6222C23.5393 24.7679 23.7581 24.8439 23.9818 24.8353C24.2055 24.8267 24.4177 24.7339 24.576 24.5756C24.7343 24.4173 24.8271 24.2051 24.8357 23.9814C24.8444 23.7577 24.7683 23.5389 24.6226 23.3689L17.2537 16Z" fill="#202025"/>
            </g>
            <defs>
            <clipPath id="clip0_904_4571">
            <rect width="32" height="32" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            </svg></button> 
            ${
              strType
                ? `<h3 class="modalw2__title-second">${strType}</h3></div>`
                : ``
            } 
            <div class="modalw2__p scroll"> 
                ${
                  strDescription
                    ? `<p class="modalw2__text"><span class="modalw2__span">${strIngredient}</span> ${strDescription}</p>`
                    : ``
                } 
                <ul class="modalw2__list"> 
                ${
                  strAlcohol
                    ? `<li class="modalw2__item">&#10038 Alcohol: ${strAlcohol}</li>`
                    : ``
                } 
                ${
                  strABV
                    ? `<li class="modalw2__item">&#10038 Alcohol by volume: ${strABV}</li>`
                    : ``
                } 
            </ul> 
            <div class="modalw2--blockbutton--add"> 
              <button class="modalw2--button--add" type="button">Add to favorite</button> 
              </div> 
            </div> 
            </div>`;
    })
    .join('');
}
export function add(markupString) {
  divs.insertAdjacentHTML('afterbegin', markupString);
}

// getElement('vodka').then(data => {
//   clearMarkupModal(divs);
//   dataIngredient = data.ingredients;
//   const markup = createIngredientMarkup(dataIngredient);
//   add(markup);
//   window.addEventListener('keydown', onEscapeBtnPush);
// });

export function clearMarkupModal(element) {
  element.innerHTML = '';
}

export function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

export function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function onClickBtnAdd(e) {
  if (e.target.closest('.modalw2__btn')) {
    const onCloseBtn = document.querySelector('.modalw2__btn');
    onCloseBtn.addEventListener('click', onCloseBtnFunc);
  }

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const numberId = dataIngredient[0].idIngredient;
  const btn1 = document.querySelector('.modalw2--button--add');

  if (cheackLocalStorage(numberId)) {
    let loadObj = load('localIngredient');
    loadObj = loadObj.filter(
      ingredients => ingredients.idIngredient != numberId
    );
    save('localIngredient', loadObj);
    btn1.textContent = 'Add to favorite';
  } else {
    let loadObj = load('localIngredient');
    loadObj.push(...dataIngredient);
    save('localIngredient', loadObj);
    btn1.textContent = 'Remove from favorite';
  }
}

function cheackLocalStorage(id) {
  const currentObj = load('localIngredient');
  if (currentObj) {
    return !!currentObj.find(ingredients => ingredients.idIngredient === id);
  } else {
    save('localIngredient', []);
  }
  return false;
}

function onCloseBtnFunc() {
  divs.classList.add('is-hidden');
}

divs.addEventListener('click', onClickBtnAdd);
divs.addEventListener('click', closeBackdrop);

export function onEscapeBtnPush(event) {
  if (event.code !== 'Escape') {
    return;
  }
  onCloseBtnFunc();
  window.removeEventListener('keydown', onEscapeBtnPush);
}

function closeBackdrop(event) {
  if (event.currentTarget !== event.target) {
    return;
  }

  if (!event.target.classList.contains('modal2')) {
    return;
  }
  onCloseBtnFunc();
}
