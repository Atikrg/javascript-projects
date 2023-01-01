console.log('promise');

('use-strict');

/* const lotteryPromise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      console.log('Lottery draw is happening');
      resolve('You Win 👏');
    } else {
      reject(new Error('You lost your money 💥'));
    }
  }, 2000);
});
//Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for two seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));



Promise.resolve('abc').then(x => console.log(x));
Promise.resolve('abc').catch(x => console.error(x));

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err)); */

//console.log('Getting position');

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
  countriesContainer.style.opacity = 1;
};

//link reverse geo coding -
//          `https://geocode.xyz/51.50354,-0.12768?geoit=json`
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    /*  navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    ); */
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    })

    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      //      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country} `);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

//
btn.addEventListener('click', whereAmI);

/* whereAmI(30.3593034, 69.3480716); //pakistan
whereAmI(36.8782722, -27.8574013); //portugal
whereAmI(33.8519405, 63.1975499); //afganistan */


