'use strict';

//const { response } = require("express");

//[method-1]

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data) {
  const html = `
    <article class="country">
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
  countriesContainer.style.opacity = 1;
};

/* const getCountryandNeighbour = function (country) {
  //Ajax call country;
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send(); //do not store this
}; */
/* request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data); */
//Render Country;
/* renderCountry(data); */

//Get neighbour country
/*  const neighbour = data.borders;
    if(!neighbour) return;
    const request2 = new XMLHttpRequest();
 */

/*  request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`); */
/*    request2.send(); */ //do not store this
/*       request2.addEventListener('load', function(){
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    })
    

});
};
getCountryandNeighbour('portugal');
 */

//[method-2]
//promises
/*
Promise: An object that is used as a placeholder for the future 
result of an synchronous operation.
            ⬇ less formal
Promise: A container for a asynchronously delivered value.
            ⬇ less formal
Promise: A container for a future value
*/

/* const request = fetch('https://restcountries.com/v3.1/name/portugal')
console.log(request); */

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .this(data => renderCountry(data[0]))
    };

  /* const neighbour = 'india';
  if (!neighbour) return;
  //Country 2
  return (
    fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
      .then(response => response.json())
      .then(data => renderCountry(data[0]))
      // .catch(err => {
      //  console.log(`${err} ❌❌❌❌`);
      //   renderError(`Something went wrong ${err}. Try again`);
      // })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      })
  );
};
 */
btn.addEventListener('click', function () {
  getCountryData('portugal');
});
