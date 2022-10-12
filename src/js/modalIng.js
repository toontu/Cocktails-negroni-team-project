import axios from 'axios';
const divs = document.querySelector('.modal2');

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
  const clearIngrMarkup = document.querySelector('.modalw2');
  if (clearIngrMarkup) {
    clearIngrMarkup.remove();
  }
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
              <button class="modalw2--button--add" data-name="${strIngredient}" type="button">Add to favorite</button> 
              </div> 
            </div> 
            </div>`;
    })
    .join('');
}
export function add(markupString) {
  divs.insertAdjacentHTML('afterbegin', markupString);
}

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
  const onCloseBtn = document.querySelector('.modalw2__btn');

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const dataName = e.target.dataset.name;
  console.log(dataName);
  getElement(dataName).then(data => {
    dataIngredient = data.ingredients;
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
  });
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

function onCloseBtnFunc(e) {
  console.log(e.target);
  if (e.target.closest('.modalw2__btn')) {
    closeBtnFunc();
  }
}

function closeBtnFunc() {
  divs.classList.add('is-hidden');
}

divs.addEventListener('click', onCloseBtnFunc);
divs.addEventListener('click', onClickBtnAdd);
divs.addEventListener('click', closeBackdrop);

export function onEscapeBtnPush(event) {
  if (event.code !== 'Escape') {
    return;
  }
  closeBtnFunc();
  window.removeEventListener('keydown', onEscapeBtnPush);
}

function closeBackdrop(event) {
  if (event.currentTarget !== event.target) {
    return;
  }

  if (!event.target.classList.contains('modal2')) {
    return;
  }
  closeBtnFunc();
}
