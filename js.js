const result = document.querySelector(".result");
const form = document.querySelector(".get-weather");
const city = document.querySelector("#city");
const country = document.querySelector("#country");


//evento para que no recargue la pagina e y muestre el valor de city y codigo de pais
form.addEventListener('submit', (e)=>{
e.preventDefault();
if (city.value === '' ||  country.value === '') {
    showError('ambos campos son obligatorios..');
    return; 
}

callApi(city.value,country.value);
//validar datos de ingreso 
console.log(city.value);
console.log(country.value);
} )

//valiadar los inputs
function showError(message){
 console.log(message);
 const alert = document.createElement('p');
 alert.classList.add('alert-message');
 alert.innerHTML=message;


 form.appendChild(alert);
 setTimeout( ()=>{
    alert.remove();

 },3000 )
}

//llamar api
function callApi(city,country){

const apiId = '88a430f6dedd5ff843e2e089b75c6786';
const  url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
//promesa q devuielve un data y lo pasamos a json
fetch(url)
.then(data => {
    return data.json();
})
//promesa devuelve un datajson y lo pasamos como variable
.then(dataJson => {
    if(dataJson.cod === '404')
    showError('ciudad no encontrada');
else{
    clearHtml();
    showWeather(dataJson);
}
console.log(dataJson);
})
.catch(error => {
    console.log(error);
})

}

function showWeather(data){
    const {name,main:{temp,temp_min,temp_max},weather:[arr]}= data;
    const degrees =cambioKelvinToGrades(temp);
    const degreesMin =cambioKelvinToGrades(temp_min);
    const degreesMax =cambioKelvinToGrades(temp_max);
    
    const  content=document.createElement('div');
    content.innerHTML=`
    <h5> clima en ${name} </h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
    <h2> ${degrees}°c</h2>
    <p>max ${degreesMax}°</p>
    <p> min ${degreesMin} °</p>
    
    `;

    result.appendChild(content);
/*
    console.log(name);
    console.log(temp);
    console.log(temp_max);
    console.log(temp_min);
    console.log(arr.icon);
    */
}
function cambioKelvinToGrades(temp){
return parseInt(temp - 273.15);

}

function clearHtml(){
result.innerHTML='';
}