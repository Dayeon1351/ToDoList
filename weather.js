const weather = document.querySelector(".js-weather");
const API_KEY ="6d6c9ec20118631d4a6f47d45aae630c";
const COORDS = 'coords';

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        console.dir(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C @ ${place}`; 

        const weatherIcon = document.createElement("img");
        weatherIcon.src = "http://openweathermap.org/img/wn/"+json.weather[0].icon+"@2x.png";
        weather.appendChild(weatherIcon);
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){

}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}
function init(){
    loadCoords();
}

init();