import axios from 'axios';
import {
  getElement,
  createIngredientMarkup,
  add,
  clearMarkupModal,
  onEscapeBtnPush,
  save,
  load,
} from './modalIng';
//1-вся модалка; 2-кнопка add
const refs = {
  modCoctailWindow: document.querySelector('.mod__coctail'),
};

let id;
let dataCoct = [];
// вся модалка №2
const divs = document.querySelector('.modal2');

//Запрос на бэкэнд
async function openModalCoctWind(getCocktail) {
  try {
    const idCocktail = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${getCocktail}`
    );
    return idCocktail.data;
  } catch (error) {
    console.log('error', error);
  }
}

//вешаем слушателя на кнопку Learn More у Леры
const divContainerRef = document.querySelector('.main__flex');
divContainerRef.addEventListener('click', onClickToCard);

// функция которая получает и возвращает IdDrinks по клику на кнопку Learn more
function onClickToCard(event) {
  const learMoreBtn = event.target.closest('.button__main-full');
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  id = Number(learMoreBtn.dataset.learnmoreid);
  console.log(id);

  refs.modCoctailWindow.addEventListener('click', btnAddToFavorite);

  refs.modCoctailWindow.classList.toggle('is-hidden');
  openModalCoctWind(id).then(data => {
    dataCoct = data.drinks;
    const dataCocktails = data.drinks;
    const marcup = createMarkupCoct(dataCocktails);
    addMarcup(marcup);

    window.addEventListener('keydown', onEscapeBtnPushCoct);
    const closeBtn = document.querySelector('.mod__coctail--btn__close');
    closeBtn.addEventListener('click', onCloseBtnFuncCoct);
  });
}

// функция - закрытие модалки на кнопке Escape
function onEscapeBtnPushCoct(event) {
  if (event.code !== 'Escape') {
    return;
  }
  onCloseBtnFuncCoct();
  window.removeEventListener('keydown', onEscapeBtnPushCoct);
}

//функция добавляет разметку
function addMarcup(marcupString) {
  refs.modCoctailWindow.insertAdjacentHTML('beforeend', marcupString);
  const modCocteilParentOfIngredients = document.querySelector(
    '.mod__coctail--items'
  );
  modCocteilParentOfIngredients.addEventListener('click', openSecondModal);
}

function openSecondModal(event) {
  const nameIngredient = event.target.dataset.name;
  console.log(nameIngredient);
  getElement(nameIngredient).then(data => {
    clearMarkupModal(divs);
    divs.classList.remove('is-hidden');
    const dataIngredient = data.ingredients;
    const markup = createIngredientMarkup(dataIngredient);
    add(markup);
    window.addEventListener('keydown', onEscapeBtnPush);
  });
}

//функция оставляет количество ингридиентов
function andrei(elem) {
  if (!elem) {
    return (elem = '');
  }
  return elem;
}

//функция создает разметку
function createMarkupCoct(value = []) {
  const clearConstanta = document.querySelector('.mod__coctailw1');
  if (clearConstanta) {
    clearConstanta.remove();
  }

  const getIngredientOnLocal = JSON.parse(localStorage.getItem('FAV_COCTAILS'));
  return value
    .map(
      ({
        idDrink,
        strDrinkThumb,
        strDrink,
        strInstructions,
        strIngredient1,
        strMeasure1,
        strIngredient2,
        strMeasure2,
        strIngredient3,
        strMeasure3,
        strIngredient4,
        strMeasure4,
        strIngredient5,
        strMeasure5,
        strIngredient6,
        strMeasure6,
        strIngredient7,
        strMeasure7,
        strIngredient8,
        strMeasure8,
        strIngredient9,
        strMeasure9,
        strIngredient10,
        strMeasure10,
      }) => {
        let ingredientCheck;
        if (getIngredientOnLocal) {
          ingredientCheck = getIngredientOnLocal.find(
            ingredient => ingredient.strDrink === strDrink
          );
        }
        return `<div class="mod__coctailw1"><p class="mod__coctail--name">${strDrink}</p>
  <button class="mod__coctail--btn__close"><svg width="18px" height="18px">
      // <use href=".//images/svg/symbol-defs.svg#icon-close" class="mod__coctail--btn__link"></use>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2533 9.00001L17.6221 1.63112C17.7678 1.46107 17.8439 1.24234 17.8352 1.01863C17.8266 0.794916 17.7338 0.582704 17.5755 0.424397C17.4172 0.266091 17.205 0.173351 16.9813 0.16471C16.7576 0.156069 16.5389 0.232163 16.3688 0.377787L8.99992 7.74668L1.63103 0.368898C1.46365 0.201517 1.23663 0.107483 0.999922 0.107483C0.763209 0.107483 0.536192 0.201517 0.368811 0.368898C0.20143 0.536279 0.107396 0.763296 0.107396 1.00001C0.107396 1.23672 0.20143 1.46374 0.368811 1.63112L7.74659 9.00001L0.368811 16.3689C0.27576 16.4486 0.200187 16.5466 0.146833 16.6569C0.0934787 16.7672 0.0634963 16.8873 0.0587679 17.0097C0.0540394 17.1322 0.0746665 17.2542 0.119355 17.3683C0.164044 17.4824 0.231829 17.586 0.318455 17.6726C0.405082 17.7592 0.508679 17.827 0.622746 17.8717C0.736813 17.9164 0.858886 17.937 0.981303 17.9323C1.10372 17.9275 1.22384 17.8976 1.33412 17.8442C1.4444 17.7909 1.54246 17.7153 1.62214 17.6222L8.99992 10.2533L16.3688 17.6222C16.5389 17.7679 16.7576 17.8439 16.9813 17.8353C17.205 17.8267 17.4172 17.7339 17.5755 17.5756C17.7338 17.4173 17.8266 17.2051 17.8352 16.9814C17.8439 16.7577 17.7678 16.5389 17.6221 16.3689L10.2533 9.00001Z" fill="#202025"/>
</svg>
    </svg></button>
  <div class="mod__coctail--blockinstractions--allingredients">
    <div class="mod__coctail--blockinstractions">
      <p class="mod__coctail--instractions">Instructions:</p>
      <p class="mod__coctail--recipe mod__scroll">${strInstructions}</p>
    </div>
    <div class="mod__coctail--block__photo">
    <img class="mod__coctail--photo" src="${strDrinkThumb}" alt="photo">
    </div>
    <div class="mod__coctail--allingredients">
      <p class="mod__coctail--ingredients">ingredients</p>
      <p class="mod__coctail--compound">Per cocktail</p>
      <ul class="mod__coctail--items">
        ${
          strMeasure1
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient1} href="#">&#10038 ${andrei(
                strMeasure1
              )} ${andrei(strIngredient1)}</a></li>`
            : ``
        }
        ${
          strMeasure2
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient2} href="#">&#10038 ${andrei(
                strMeasure2
              )} ${andrei(strIngredient2)}</a></li>`
            : ``
        }
        ${
          strMeasure3
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient3} href="#">&#10038 ${andrei(
                strMeasure3
              )} ${andrei(strIngredient3)}</a></li>`
            : ``
        }
        ${
          strMeasure4
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient4} href="#">&#10038 ${andrei(
                strMeasure4
              )} ${andrei(strIngredient4)}</a></li>`
            : ``
        }
        ${
          strMeasure5
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient5} href="#">&#10038 ${andrei(
                strMeasure5
              )} ${andrei(strIngredient5)}</a></li>`
            : ``
        }
        ${
          strMeasure6
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient6} href="#">&#10038 ${andrei(
                strMeasure6
              )} ${andrei(strIngredient6)}</a></li>`
            : ``
        }
        ${
          strMeasure7
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient7} href="#">&#10038 ${andrei(
                strMeasure7
              )} ${andrei(strIngredient7)}</a></li>`
            : ``
        }
        ${
          strMeasure8
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient8} href="#">&#10038 ${andrei(
                strMeasure8
              )} ${andrei(strIngredient8)}</a></li>`
            : ``
        }
        ${
          strMeasure9
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient9} href="#">&#10038 ${andrei(
                strMeasure9
              )} ${andrei(strIngredient9)}</a></li>`
            : ``
        }
        ${
          strMeasure10
            ? `<li class="mod__coctail--item" ><a class="mod__coctail--item__link" data-name=${strIngredient10} href="#">&#10038 ${andrei(
                strMeasure10
              )} ${andrei(strIngredient10)}</a></li>`
            : ``
        }
      </ul>
    </div>
  </div>
  <div class="mod__coctail--blockbutton--add">
    <button class="mod__coctail--button--add" type="button">Add to favorite</button>
  </div>
  </div>`;
      }
    )
    .join();
}

refs.modCoctailWindow.addEventListener('click', closeBackdropCoct);

function btnAddToFavorite(e) {
  if (e.target.nodeName !== 'BUTTON') {
    console.log(e.target.nodeName);
    return;
  }
  const numberId = dataCoct[0].idDrink;
  const btn1 = document.querySelector('.mod__coctail--button--add');

  if (cheackCocktLocalStorage(numberId)) {
    let loadObj = load('FAV_COCTAILS');
    loadObj = loadObj.filter(ingredients => ingredients.idDrink !== numberId);
    save('FAV_COCTAILS', loadObj);
    btn1.textContent = 'Add to favorite';
  } else {
    let loadObj = load('FAV_COCTAILS');
    loadObj.push(...dataCoct);
    save('FAV_COCTAILS', loadObj);
    btn1.textContent = 'Remove from favorite';
  }
}

function cheackCocktLocalStorage(id) {
  const currentObj = load('FAV_COCTAILS');
  if (currentObj) {
    return !!currentObj.find(ingredients => ingredients.idDrink === id);
  } else {
    save('FAV_COCTAILS', []);
  }
  return false;
}

function closeBackdropCoct(event) {
  if (event.currentTarget !== event.target) {
    return;
  }
  if (!event.target.classList.contains('mod__coctail')) {
    return;
  }
  onCloseBtnFuncCoct();
}

// функция - скрытие модалки
function onCloseBtnFuncCoct() {
  refs.modCoctailWindow.classList.add('is-hidden');
  refs.modCoctailWindow.removeEventListener('click', btnAddToFavorite);
}

//функция от Юры
// const getData = () => {
//   return fetch(
//     "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11001"
//   ).then((response) => response.json());
// };
// async function start()
// {
//   const { drinks: [data] } = await getData();
//   const result = Object.keys(data).filter(
//     (item) => item.includes("strIngredient") || item.includes("strMeasure")
//   );
//   const resultObj = {};
//   for (const key of result) {
//     if (data[key]) {
//       resultObj[key] = data[key];
//     }
//   }
//   console.log(resultObj);
// }
// start();

//функция от Жени
// function createLiMarcup(coctailElem) {
//   console.log(coctailElem)
//   const ingrediantKeys = Object.keys(coctailElem).filter(key => (key.includes('strIngredient') && !!coctailElem[key]))
//   const measureKeys = Object.keys(coctailElem).filter(key => (key.includes('strMeasure') && !!coctailElem[key]))
//   console.log(ingrediantKeys)
//   console.log(measureKeys)
// }
// createLiMarcup()
