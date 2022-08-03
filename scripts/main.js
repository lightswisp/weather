const api_key = "e37d61b42c34488c978231929222007"

let city = document.querySelector("#city")
let time = document.querySelector("#time")
let temp = document.querySelector("#temp")
let pressure = document.querySelector("#pressure")
let wind = document.querySelector("#wind_speed")
let wind_direction = document.querySelector("#wind_direction")
let humidity = document.querySelector("#humidity")
let condition = document.querySelector("#condition")
let feelslike = document.querySelector("#feelslike")

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=> {
        const p=position.coords
        //console.log(p.latitude,p.longitude)
        fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${p.latitude},${p.longitude}&aqi=no`).then(r =>{
            r.json().then(json =>{
                console.log(json)
                let temp_img_api = `https:${json["current"]["condition"]["icon"]}`
                let temp_c_api = `+${json["current"]["temp_c"]}°C`
                let city_api = `${json["location"]["country"]}, ${json["location"]["name"]}`
                let time_api = json["location"]["localtime"]
                let pressure_api = json["current"]["pressure_mb"] + "mb"
                let wind_api = json["current"]["wind_kph"] + " km/h"
                let wind_direction_api = `Wind direction: ${json["current"]["wind_dir"]}`
                let humidity_api = json["current"]["humidity"] + "%"
                let condition_api = json["current"]["condition"]["text"]
                let feelslike_api = `${json["current"]["feelslike_c"]}°C`
                city.innerText = city_api
                time.innerText = time_api
                temp.innerText = temp_c_api
                pressure.innerText = pressure_api
                wind.innerText = wind_api
                humidity.innerText = humidity_api
                condition.innerText = condition_api
                wind_direction.innerText = wind_direction_api
                feelslike.innerText = feelslike_api
                let image = document.createElement("img");
                image.setAttribute("src", temp_img_api);
                image.setAttribute("width", "120");
                temp.appendChild(image)

                //document.write(json["current"]["temp_c"])
            })
        })
    }, (error) => console.log(new Date(), error),
    { enableHighAccuracy: false, timeout: 5000})
}
else{
    document.write("Geolocation is not supported by this browser!")
}