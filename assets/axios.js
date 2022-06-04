
const key = "37a1594cec30b4ef6c58531d53e04203";

const URI = "https://api.openweathermap.org/data/2.5/weather?";

const imgWeather = "http://openweathermap.org/img/wn/";


//Partie Météo par ville

        //recupération du champs avec le nom de la ville
const inputVille = document.getElementById('inputville');

let getByCity = (ville) => {
    axios.get(`${URI}q=${ville}&lang=fr&appid=${key}&units=metric`)
        .then(resp => {
            console.log(resp);

            let ville = resp.data.name;
            let temps = resp.data.weather[0].description;
            let temperature = resp.data.main.temp + "°C";
            let imgTemps = imgWeather + resp.data.weather[0].icon + "@2x.png";
            let tpRessentie = resp.data.main.feels_like + "°C";
            let sensVent = resp.data.wind.deg;
            let forceVent = resp.data.wind.speed;

            const insertVille = document.querySelectorAll('span');
            const insertTp = document.querySelectorAll('p');
            const insertMeteo = document.querySelectorAll('img');

            console.log(insertTp);
            console.log(insertVille);
            console.log(insertMeteo);

            insertVille[0].innerText = ville;
            insertTp[0].innerText = temperature;
            insertTp[2].innerText = tpRessentie;
            insertTp[3].innerText = temps;
            insertMeteo[0].src = imgTemps;
            insertMeteo[0].alt = temps;
            insertMeteo[1].style.transform = "rotate(" + sensVent + "deg)";
            insertVille[2].innerText = forceVent;

        })
        .catch(err => {
            console.error(err)
        })
}

        //eventlistener avec un keypress sur Enter et qui verifie si le champs n'est pas vide
inputVille.addEventListener("keypress", (e) => {
    if(e.key === 'Enter' && inputVille.value.length > 0) {
        getByCity(inputVille.value)
        inputVille.value = "";
    }
})


//partie Météo Géolocalisée

const getWeatherLoc = (geo) => {

    axios.get(URI + "lat=" + geo.coords.latitude + "&lon=" + geo.coords.longitude + "&units=metric&lang=fr&appid=" + key )
                .then(res => {

                    let ville = res.data.name;
                    let temps = res.data.weather[0].description;
                    let temperature = res.data.main.temp + "°C";
                    let imgTemps = imgWeather + res.data.weather[0].icon + "@2x.png";
                    let tpRessentie = res.data.main.feels_like + "°C";
                    let sensVent = res.data.wind.deg;
                    let forceVent = res.data.wind.speed;

                    const insertVille = document.querySelectorAll('span');
                    const insertTp = document.querySelectorAll('p');
                    const insertMeteo = document.querySelectorAll('img');
                    

                    const orientVent = () => {

                        if (sensVent == 0 ) {
                            insertVille[1].innerText = "de Nord";
                        }else if (sensVent > 0 && sensVent < 45) {
                            insertVille[1].innerText = "de Nord / Nord Est";
                        }else if (sensVent == 45) {
                            insertVille[1].innerText = "de Nord Est";
                        }else if (sensVent > 45 && sensVent < 90) {
                            insertVille[1].innerText = "de Nord / Nord Est";
                        }else if (sensVent == 90) {
                            insertVille[1].innerText = "d'Est";
                        }else if (sensVent > 90 && sensVent < 135) {
                            insertVille[1].innerText = "d'Est / Sud Est";
                        }else if (sensVent == 135) {
                            insertVille[1].innerText = "de Sud Est";
                        }else if (sensVent > 135 && sensVent < 180) {
                            insertVille[1].innerText = "de Sud / Sud Est";
                        }else if (sensVent == 180) {
                            insertVille[1].innerText = "de Sud Est";
                        }else if (sensVent > 180 && sensVent < 225) {
                            insertVille[1].innerText = "de Sud / Sud Ouest";
                        }else if (sensVent == 225) {
                            insertVille[1].innerText = "de Sud Ouest";
                        }else if (sensVent > 225 && sensVent < 270) {
                            insertVille[1].innerText = "d'Ouest / Sud Ouest";
                        }else if (sensVent == 270) {
                            insertVille[1].innerText = "d'Ouest";
                        }else if (sensVent > 270 && sensVent < 315) {
                            insertVille[1].innerText = "d'Ouest / Nord Ouest";
                        }else if (sensVent == 315) {
                            insertVille[1].innerText = "de Nord Ouest";
                        }else if (sensVent > 315 && sensVent <= 359) {
                            insertVille[1].innerText = "de Nord / Nord Ouest";
                        }

                    }

                    orientVent()
                    
                    insertVille[0].innerText = ville;
                    insertTp[0].innerText = temperature;
                    insertTp[2].innerText = tpRessentie;
                    insertTp[3].innerText = temps;
                    insertMeteo[0].src = imgTemps;
                    insertMeteo[0].alt = temps;
                    insertMeteo[1].style.transform = "rotate(" + sensVent + "deg)";
                    insertVille[2].innerText = forceVent;




                    })
                .catch(err => console.log(err))
}

const error = (value) => {
    console.log(value);
}

navigator.geolocation.getCurrentPosition(getWeatherLoc, error);






