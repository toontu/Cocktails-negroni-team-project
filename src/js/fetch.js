import axios from 'axios';
export default async function fetchRandomCocktail() {
  const res = await axios.get(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  );

  const responseDrink = await res?.data?.drinks[0];
  return responseDrink;
}
