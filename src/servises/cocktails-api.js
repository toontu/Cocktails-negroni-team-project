const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';

export async function fetchGetData(letter) {
  const response = await fetch(`${BASE_URL}f=${letter}`);
  const result = response.json();

  return result;
}
