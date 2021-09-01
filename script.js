const key = `995d0323f1d0e436273237b1c13d45e9`;

const select = document.querySelector(".form-select");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const weatherType = document.querySelector(".weather-type");
const time = document.querySelector(".time");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const atmp = document.querySelector(".atmp");

// let cityId = 683506;

const kelvinToCelsius = (degrees) => {
const celsius = degrees - 273.15;
return celsius.toFixed(1);
};

const getCities = () => {
fetch('cities.json', {
method: 'GET',
})
.then(response => response.json())
.then(data => {
data.forEach(city => {
    const option = document.createElement("option");
    option.value = city.id;
    option.text = city.name;

//if it is Bucharest
    if(city.id === 683506) {
option.setAttribute("selected", true);
}
    
    select.appendChild(option);
});
    console.log('Success', data);
})
.catch((error) => {
console.error('Errors', error);
});
}

const getWeather = (cityId = 683506) => {
fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`, {
method: 'GET',
})
.then(response => response.json())
.then(data => {
    const date = new Date();

    city.innerText = data.name;
    temp.innerText = kelvinToCelsius(data.main.temp) + '\xB0C';
    time.innerText = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
    weatherType.innerText = data.weather[0].description;
    wind.innerText = `Wind ${data.wind.speed} m/s`;
    humidity.innerText = `Humidity ${data.main.humidity}%`;
    humidity.innerText = `Humidity ${data.main.humidity}%`;
    atmp.innerText = `Pressure ${data.main.pressure} hPa`;
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    console.log('Success', data);
})
.catch((error) => {
console.error('Errors', error);
});
}

getCities();
getWeather();

// fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`, {
//     method: 'GET',
// })
// .then(response => response.json())
// .then(data => {
//     console.log('Success', data);
// })
// .catch((error) => {
//     console.log('Error', error);
// });

select.addEventListener("change", function (e) {
    const cityId = e.target.value;
    getWeather(cityId);
});
