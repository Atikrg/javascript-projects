'use strict';
console.log('script1.js');
//init
const btn = document.querySelector('.btn-country');
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
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

//renderError
const renderError = function (msg, errorMsg = 'Something went wrong') {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Country not found ${response.status}`);
    return response.json();
  });
};
//GetCountryData
const getCountryData = function (country) {
  //Country1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      //neighbour
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found!');
      //Country2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country Not Found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥💥`);
      renderError(`Something went Wrong 💥💥💥💥 ${err.message}.Try Again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//Button
btn.addEventListener('click', function () {
  getCountryData('portugal');
  //getCountryData('australia');
});

//-------------Consuming Promises with Async/Await------------------------
const whereAmI = async function (country) {
  const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  const data = await res.json();
  //  console.log(data);
  renderCountry(data[0]);
};
whereAmI('america');
//console.log('first');

//-------------------------------REFERENCE-----------------------------------------

//GetCountryData
/* const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
 //     console.log(response);

      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      //neighbour
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      //Country2 })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
   
    .catch(err => {
      console.error(`${err} 💥💥💥💥`);
      renderError(`Something went Wrong 💥💥💥💥 ${err.message}.Try Again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}; */

const get3Countries = async function (c1, c2, c3) {
  try {
    /*  const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`); */

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    //console.log(data.map(d => d[0].capital));

    //   console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.error(err);
  }
};

get3Countries('pakistan', 'india', 'tanzania');

//Promise.race
(async function () {
  const race = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/india`),
    getJSON(`https://restcountries.com/v2/name/pakistan`),
    getJSON(`https://restcountries.com/v2/name/nepal`),
  ]);

  console.log(race[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/india`),
  timeout(4),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

 
//Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));


//Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));