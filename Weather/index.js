const searchForm = document.querySelector('.search-loaction');
const cityValue = document.querySelector('.search-loaction input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.card');

const key = 'cbe3dd267a18f6c89943b3eff94f1ed7';

async function requestCity(city){
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    return data;

}


const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}
const isDayTime = (icon) => {
    if (icon.includes('d')) { return true } else { return false }
}
updateWeatherApp = (city) => {
    console.log(city);
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-mid row">
            <div class="col-7">
              <span class="temp">${spitOutCelcius(city.main.temp)}&deg;C</span>
            </div>
            <div class="condition-temp">
              <p class="condition">${city.weather[0].description}</p>
              <p class="high">${spitOutCelcius(city.main.temp_max)}&deg;C</p>
              <p class="low">${spitOutCelcius(city.main.temp_min)}&deg;C</p>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto icon">
            <img src="${iconSrc}" alt="" />
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="bottom-left">
              <p>${spitOutCelcius(city.main.feels_like)}&deg;C</p>
              <span>Feels Like</span>
            </div>
            <div class="bottom-right">
              <p>${city.main.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
    `;
    if (isDayTime(imageName)) {
        console.log('day');
        timeImage.setAttribute('src', 'https://images.all-free-download.com/images/graphicthumb/sunrise_vector_287235.jpg');
        if (cityName.classList.contains('text-white')) {
            cityName.classList.remove('text-white');
        } else {
            cityName.classList.add('text-black');
        }

    } else {
        console.log('night');
        timeImage.setAttribute('src', 'https://img5.goodfon.com/wallpaper/nbig/8/c0/volk-minimalizm-art-vektor.jpg');
        if (cityName.classList.contains('text-black')) {
            cityName.classList.remove('text-black');
        } else {
            cityName.classList.add('text-white');
        }

    }

    cardInfo.classList.remove('d-none');
}



//add an event listner to the form
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset();

    requestCity(citySearched)
        .then((data) => {
            updateWeatherApp(data);
        })
        .catch((error) => { console.log(error) })



})