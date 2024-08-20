const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const themeChanger = document.querySelector('.theme-changer')
const themeName = document.querySelector('.theme-name')
let inputField = document.querySelector('.input')

let allCountriesData;

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    })

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then((data) => {
            renderCountries(data)
        })
})

function renderCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach(country => {
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `/public/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
                                    <img src=${country.flags.svg} alt="${country.name.common} flag">
                                    <div class="card-text">
                                       <h2>${country.name.common}</h2>
                                       <p><b>Population:</b>&nbsp;${country.population.toLocaleString('en-IN')}</p>
                                       <p><b>Region:</b>&nbsp;${country.region}</p>
                                       <p><b>Capital:</b>&nbsp;${country.capital?.[0]}</p>
                                    </div>
                            `
        countriesContainer.append(countryCard)

    });
}

inputField.addEventListener('input', (e) => {
    let filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const savedIcon = localStorage.getItem('iconClass');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeName.innerHTML = savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1);
    } else {
        themeName.innerHTML = 'Light';
    }
    if (savedIcon) {
        document.getElementById('themeIcon').className = savedIcon;
    }
});

themeChanger.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark');
    const themeIcon = document.getElementById('themeIcon');
    if (isDarkMode) {
        themeName.innerHTML = 'Dark';
        localStorage.setItem('theme', 'dark');

        themeIcon.classList.remove('fa-regular');
        themeIcon.classList.add('fa-solid');
        localStorage.setItem('iconClass', themeIcon.className);
    } else {
        themeName.innerHTML = 'Light';
        localStorage.setItem('theme', 'light');

        themeIcon.classList.remove('fa-solid');
        themeIcon.classList.add('fa-regular');
        localStorage.setItem('iconClass', themeIcon.className);
    }
});