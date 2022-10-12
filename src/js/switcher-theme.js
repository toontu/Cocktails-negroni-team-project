const inputSwEl = document.querySelector('.dark-button');
const dataInput = document.querySelector('[data-switcher-desktop]');
inputSwEl.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme;
  console.log(currentTheme);
  const theme = currentTheme === 'light' ? 'dark' : 'light';
  console.log(theme);
  document.documentElement.setAttribute('data-theme', theme);
  addThemeToLocalSt(theme);
});
function addThemeToLocalSt(theme) {
  localStorage.setItem('DESKTOP_THEME', JSON.stringify(theme));
}
function getThemefromLocalSt() {
  return JSON.parse(localStorage.getItem('DESKTOP_THEME'));
}

function getTheme() {
  const theme = getThemefromLocalSt();
  if (!theme) return;
  dataInput.checked = theme === 'dark';
  document.documentElement.setAttribute('data-theme', theme);
}
getTheme();
