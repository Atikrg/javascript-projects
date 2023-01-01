console.log('🤔--codingChallenge2--');
//----------------------------------


//DOM element
const imgContainer = document.querySelector('.images');

//wait function
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

//To-do
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

//call createImage function
let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(()=>{
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg')
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2)
  })
  .then(()=>{
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg')
  })
  .then(img => {
    currentImg = img;
    console.log('Image 3 loaded');
    return wait(2)
  })
  .catch(err => console.log(err));
