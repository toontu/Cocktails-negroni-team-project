import * as API from '../servises/cocktails-api';
import crateImageMarkUp from './murk-up';
import { wichDataToUse, numberOfCards } from './random';

const ulContainer = document.querySelector('.hero-list');
export const renderContainer = document.querySelector('.main__flex');
export const errorContainer = document.querySelector('.sorry');
const title = document.querySelector('.main__title');

if (ulContainer) {
  ulContainer.addEventListener('click', onClickBtn);
}

export default async function onClickBtn(event) {
  const value = event.target.dataset.value.toLowerCase();
  if (event.target.nodeName !== 'LI') {
    return;
  }
  try {
    const responseData = await API.fetchGetData(value);

    if (responseData.drinks === null) {
      errorContainer.classList.remove('error-hidden');
      title.style.display = 'none';
      renderContainer.innerHTML = '';
      return;
    } else {
      renderContainer.innerHTML = '';
      title.style.display = 'block';
      wichDataToUse(numberOfCards, responseData.drinks);
      crateImageMarkUp(responseData.drinks);
      errorContainer.classList.add('error-hidden');
    }
  } catch (error) {
    throw new Error(error);
  }
}
