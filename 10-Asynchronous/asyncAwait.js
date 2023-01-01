//---🙌 Consuming Promises with Async/Await---
const countriesContainer = document.querySelector('.countries');
//renderCountry
const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
          </article>
          `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    /*  navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    ); */
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
//renderError
const renderError = function (msg, errorMsg = 'Something went wrong') {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;
};
const whereAmI = async function (country) {
  //🐱 Handling error's with try-catch
  try{
    const pos = await getPosition();
      //🗺 GeoLocation
    const { latitude: lat, longitude: lng } = pos.coords;
  
    //🔗 Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if(!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
   // console.log(dataGeo);
  
    //⛳ Country Data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    const data = await res.json();
    //console.log(data);
    renderCountry(data[1]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`
  }catch(err){
    console.error(`💥${err}`);
    renderError(`💥💥💥 ${err.message}`)

    //Reject promise returned from async function;
    throw err;

  }

  
};
countriesContainer.style.opacity = 1;
//const city = whereAmI();
//console.log(city);
console.log('1: Will get location');
/* whereAmI().then(city => console.log(city))
          .catch(err => console.err(`2: ${err.message}💥`))
          .finally(()=> console.log('3: Finised getting location')); */
(async function(){
  try{
    const city = await whereAmI();
    console.log(`2: ${city}`);
  }catch(err){
    console.error(`2: ${err.message} 💥`);
  }
  console.log("3: Finished getting location")
})();

