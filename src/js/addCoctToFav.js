import crateImageMarkUp from './murk-up';  
import checkSize from './random';

// const btnEl = document.querySelector('.js-add');
// console.log(btnEl)
// const rembtnEl = document.querySelector('.js-rem');

// btnEl.addEventListener('click', () => {
//   addToLocalStCoctails('апап');
// });
// rembtnEl.addEventListener('click', () => {
//   remFromLocalStCoctails('15087');
// });


export let arrayFromLStorage=JSON.parse(localStorage.getItem('FAV_COCTAILS'));
// console.log(arrayFromLStorage)

// export function addToLocalStCoctails({strDrink, strDrinkThumb, idDrink}) {
//   // const localStorageData = localStorage.getItem('FAV_COCTAILS');
//   // const localStorageDataRes = JSON.parse(localStorageData);

  
//   // if (!localStorageData || localStorageDataRes.length === 0) {
//   //   const favCoctArray = [{'strDrink':strDrink,'strDrinkThumb':strDrinkThumb,'idDrink':idDrink}];
//   //   localStorage.setItem('FAV_COCTAILS', JSON.stringify(favCoctArray));
//   // } else {
//   //   const newLocal = localStorageDataRes.concat({'strDrink':strDrink,'strDrinkThumb':strDrinkThumb,'idDrink':idDrink});
//   //   localStorage.setItem('FAV_COCTAILS', JSON.stringify(newLocal));
//   //   console.log(newLocal);
//   // }arrayFromLStorage=localStorageData

// console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
// }


// function remFromLocalStCoctails(coctailID) {
//   const localStorageData = localStorage.getItem('FAV_COCTAILS');
//   if (!localStorageData) {
//     return;
//   } else {
//     const localStorageDataRes = JSON.parse(localStorageData);
//     const favCoctArray = [];

//     for (const coctail of localStorageDataRes) {
//       if (coctail.idDrink === coctailID) {
//         continue;
//       }
//       favCoctArray.push(coctail);
//     }
//     localStorage.removeItem('FAV_COCTAILS');
//     localStorage.setItem('FAV_COCTAILS', JSON.stringify(favCoctArray));
//   }

// }
// LERA
// let screenWidth = 0;
// window.addEventListener(`resize`, checkSize);

// function checkSize(e) {
//   screenWidth = e.currentTarget.innerWidth;

//   if (screenWidth < 768) {
//     clearContainer();
//     start(3);
//   }
//   if (screenWidth >= 768 && screenWidth < 1280) {
//     clearContainer();
//     start(6);
//   }
//   if (screenWidth >= 1280) {
//     clearContainer();
//     start(12);
//   }
// }


// // потрібно добавити ДОМ елемент, щоб перевикористовувати функцію Лєри
// function addMarkup(arr = []) {
//   favCoctContainerRef.insertAdjacentHTML('beforeend', arr);
// }
// // потрібно добавити ДОМ елемент, щоб перевикористовувати функцію Лєри
// function clearContainer() {
//   favCoctContainerRef.innerHTML = '';
// }

// addMarkup(crateImageMarkUp(arrayFromLStorage))


