let searchBtn = document.getElementById('search');
let findInput = document.getElementById('findInput');
let demo = document.getElementById('demo');
let searchValue = "";
// ----------------------------variables end----------------------------------------


// =========================== Global Functions Start ============================
async function getData(location){
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=1d4e784d9acf4153bf8205342241512`)
    if(res.ok){
        let daysForcast = await res.json() ;
        console.log(daysForcast)
        fillHtmlContant(daysForcast);
    }
}
function getExactForcast(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success Callback
            function(position) {
                let lat = position.coords.latitude;   // خط العرض
                let long = position.coords.longitude; // خط الطول
                console.log(`Latitude: ${lat}, Longitude: ${long}`);
                getData(`${lat},${long}`)
            },
            // Error Callback
            function(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("User denied geolocation permission.");
                        // قم بتشغيل بيانات افتراضية عند رفض الإذن
                        getData('Alexandria');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location information is unavailable.");
                        getData('Alexandria');
                        break;
                    case error.TIMEOUT:
                        console.log("The request to get location timed out.");
                        getData('Alexandria');
                        break;
                    default:
                        console.log("An unknown error occurred.");
                        getData('Alexandria');
                }
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        getData('Alexandria'); // في حالة عدم دعم المتصفح للموقع
    }
}

function fillHtmlContant(daysForcast){
    // ---------------------------------day1-----------------------------
    let date1 = new Date(daysForcast.current.last_updated);
    let day1DateNum = daysForcast.current.last_updated.split(' ')[0].split('-')[2];
    let day1Name = date1.toLocaleString("en-us", { weekday: "long" });
    let monthName = date1.toLocaleString("en-us", { month: "long" });
    let choosedLocation = daysForcast.location.region
    let choosedLocationName = daysForcast.location.name
    let degree = daysForcast.current.temp_c;
    // ---------------------------------day1-----------------------------

    // =================================day2=============================
    let date2 = new Date(daysForcast.forecast.forecastday[1].date);
    let day2Name = date2.toLocaleString("en-us", { weekday: "long" });
    // =================================day2=============================

    // ********************************day3******************************
    let date3 = new Date(daysForcast.forecast.forecastday[2].date);
    let day3Name = date3.toLocaleString("en-us", { weekday: "long" });
    // ********************************day3******************************
    demo.innerHTML= `
    <div class="col-md-4 side" id="today">
        <div class="date-day">
            <p class="d-flex justify-content-between px-3 py-2 mb-0">
                <span id="day">${day1Name}</span>
                <span id="date">${day1DateNum} ${monthName}</span>
            </p>
        </div>
        <div class="content pt-4 pb-2">
            <div class="d-flex flex-wrap w-100 justify-content-between">
                <h3 class="location">${choosedLocationName == "Fowa" ? choosedLocationName = choosedLocation : choosedLocationName}</h3>
                <h3 class="location">${choosedLocation}</h3>
            </div>
            <div class="deg d-flex flex-column mb-0 justify-content-center px-4 align-items-center my-2">
                ${degree} °c
                <div class="img">
                <img src="https://${daysForcast.current.condition.icon}" alt="${daysForcast.current.condition.text}" class="w-100">
            </div>
        </div>
        <p class="status">${daysForcast.current.condition.text}</p>
        <ul id="statusParamiters" class="list-unstyled d-flex justify-content-around">
            <li>
                <i class="fa-solid fa-umbrella"></i>
                ${daysForcast.forecast.forecastday[0].day.daily_chance_of_rain} %
            </li>
            <li>
                <i class="fa-solid fa-wind"></i>
                 ${daysForcast.current.wind_kph} km/h
            </li>
            <li>
                <i class="fa-regular fa-compass"></i>
                East
            </li>
        </ul>
        </div>
    </div>
    <div class="col-md-4" id="tomorrow">
        <div class="date-day">
            <p class="d-flex justify-content-center px-3 py-2 mb-0">
                <span id="day">${day2Name}</span>
            </p>
        </div>
        <div class="content pt-4 pb-2 d-flex flex-column justify-content-evenly   align-items-center h-100">

            <div class="img">
                <img src="https://${daysForcast.forecast.forecastday[1].day.condition.icon}" alt="${daysForcast.forecast.forecastday[1].day.condition.text}" class="w-100">
            </div>
            <div class="d-flex flex-wrap w-100 justify-content-evenly px-2">
                <p class=" fs-3"> <span class="text-info">Max:</span> ${daysForcast.forecast.forecastday[1].day.maxtemp_c} °c </p>
                <p class=" fs-3"><span class="text-info">Min:</span> ${daysForcast.forecast.forecastday[1].day.mintemp_c} °c </p>
            </div>
         

            <p class="status fs-6">${daysForcast.forecast.forecastday[1].day.condition.text}</p>
        </div>
    </div>

    <div class="col-md-4" id="twoDayesAfter">
        <div class="date-day">
            <p class="d-flex justify-content-center px-3 py-2 mb-0">
                <span id="day">${day3Name}</span>
            </p>
        </div>
        <div class="content pt-4 pb-2 d-flex flex-column justify-content-evenly   align-items-center h-100">

            <div class="img">
                <img src="https://${daysForcast.forecast.forecastday[2].day.condition.icon}" alt="${daysForcast.forecast.forecastday[2].day.condition.text}" class="w-100">
            </div>
            <div class="d-flex flex-wrap w-100 justify-content-evenly px-2">
                <p class=" fs-3"> <span class="text-info">Max:</span> ${daysForcast.forecast.forecastday[2].day.maxtemp_c} °c </p>
                <p class=" fs-3"><span class="text-info">Min:</span> ${daysForcast.forecast.forecastday[2].day.mintemp_c} °c </p>
            </div>
         

            <p class="status fs-6">${daysForcast.forecast.forecastday[2].day.condition.text}</p>
        </div>
    </div>
    `
}

// =========================== Global Functions End ============================



// =========================== Executed Code ============================
// =========================== int main() ============================
getExactForcast();

findInput.addEventListener('input', function(e){
    searchValue = e.target.value;
    getData(e.target.value);
})

searchBtn.addEventListener('click', function(e){
    if(searchValue != "") getData(searchValue);
})






    

