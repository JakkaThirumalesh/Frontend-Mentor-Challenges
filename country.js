const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.countryName')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderDetails = document.querySelector('.borderDetails')
const themeChanger = document.querySelector('.theme-changer')
const iconChange = document.querySelector('.theme-changer i')
const themeName = document.querySelector('.theme-name')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(([country]) => {
        flagImage.src = country.flags.svg
        countryNameH1.innerText = country.name.common
        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        }
        else {
            nativeName.innerText = country.name.common
        }
        population.innerText = country.population
        region.innerText = country.region
        subRegion.innerText = country.subregion === undefined ? "" : country.subregion
        capital.innerText = country.capital === undefined ? "" : country.capital?.[0]
        topLevelDomain.innerText = country.tld.join(', ')
        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
        }
        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }
        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([data]) => {
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.href = `/public/country.html?name=${data.name.common}`
                        borderCountryTag.innerText = data.name.common
                        borderDetails.append(borderCountryTag)
                    })
            })
        }

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