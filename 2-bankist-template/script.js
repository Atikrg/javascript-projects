'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1');
//const { header } = require("express/lib/response");

///////////////////////////////////////
// Modal window
  
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};



btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
/* for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal); */

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//console.log(document.documentElement);
//console.log(document.head);
//console.log(document.body);
//const header = document.querySelector('.header'); //Select Single Element
document.querySelectorAll('.section'); //Select all elements

document.getElementById('section--1');// select id
document.getElementsByTagName('button');// Select tag

//console.log(document.getElementsByClassName('.btn'));

//Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
/* message.textContent = ` We use cookied for improved functionality and analytics`;
message.textContent = "We use cookied for improved functionality analytics"; */

message.innerHTML = 'We used cookie for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
//header.prepend(message);//move element above header
//header.append(message);//move element down to header

//header.append(message.cloneNode(true)) //cloning child element to display multiple times
//header.after(message);
//header.before(message);

/* document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  //message.remove();
  message.parentElement.removeChild(message);
});
 */
//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//console.log(message.style.height);
//console.log(message.style.backgroundColor);
//console.log(getComputedStyle(message));//get all the styles
//console.log(getComputedStyle(message).color);//get color

//message.style.height = getComputedStyle(message).height + 40 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
//Attributes
//console.log(logo.alt);
//console.log(logo.src);
//console.log(logo.className);

logo.alt  = "Beautiful minialist logo"
//Non-standard
//console.log(logo.designer);
//console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist'); //setAttribute
//console.log(logo.getAttribute('src'))// getAttribute






btnScrollTo.addEventListener('click', (e)=>{
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); //Calculate x, y axis on page
  console.log("height/ width viewport", 
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
  );

  //Scrolling
  //window.scrollTo(s1coords);//Scroll
/*   window.scrollTo(s1coords.left + window.pageXOffset,
                    s1coords.top + window.pageYOffset
                    );
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth'
  }); */
  section1.scrollIntoView({behavior: 'smooth'});
});

//const h1 = document.querySelector('h1');

/* const alertH1 = function(e){
  alert("addEventListener: Great! You are reading");
  h1.removeEventListener('mouseenter', alertH1);
}; */

/* h1.addEventListener('mouseenter', function(e){
  alert('Great! You are reading the heading:D');
}); */

/* setTimeout(() => {
  h1.addEventListener('mouseenter', alertH1)
}, 3000); */
/* h1.onmouseenter = function(e){
  alert("Your way")
}
 */

/* document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e){
    e.preventDefault();
    //console.log('LINK');
    const id = this.getAttribute('href'); 
    console.log(id);
    document.querySelector(id).scrollIntoView(
      {behavior: 'smooth'}
    )
  });
});
 */

//1. Add event listener to common parent element
//2.determine what element originated the events




document.querySelector('.nav__links').addEventListener('click', function(e){
  console.log(e.target);

  //Matching strategy
  if(e.target.classList.contains('nav__link')){
    e.preventDefault();
    const id = e.target.getAttribute('href'); 
 //   console.log(id);
    document.querySelector(id)
            .scrollIntoView(
                {behavior: 'smooth'}
              )
  }
})

const h1 = document.querySelector('h1');

//Going downwards:child
/* console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);

console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'yellow';
 */
//Going upwards: parents
/* console.log(h1.parentNode);
console.log(h1.parentElement);
//important
h1.closest('.header').style.background = 'var(--gradient-secondary)'; */

//h1.closest('h1').style.background = 'var(--gradient-primary)'

//Going sideways: siblings
/* console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function(el){
  if(el !== h1){
    el.style.transform = 'scale(0.5)';
  }
}) */

//Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content')

//Bad practice
//tabs.forEach(t=> t.addEventListener('click', ()=>console.log('TAB')));

//good practice
//Building a Tabbed Component
tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  //console.log(clicked);

  //Guard clause
  if(!clicked) return;
  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c=>c.classList.remove('.operations__content--active'));
  
  //Active tab
  clicked.classList.add('operations__tab--active')

  // Activate content area
 // console.log(clicked.dataset.tab)
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

  

});

// Menu fade animation
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const  siblings = link.closest('.nav').
    querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;

    });
    logo.style.opacity = this;
  }
}
/* nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5);
}); */
//Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

/* nav.addEventListener('mouseout', function(e){
  handleHover(e, 1);
}); */

//193. Sticky navigation

//console.log(initialCoords);
window.addEventListener('scroll', function(e){
  //console.log(window.scrollY);

  if(window.scrollY > initialCoords.top) nav.
  classList.add('sticky');
  else nav.classList.remove('sticky');
})

//194. A better way: The intersection observation api
//[-] A better way to implement sticky navigation
//[1]this api is used to observe the change of the certain target element intersects other element (view Port)
const obsCallback  = function(entries, observer){
  entries.forEach(entry =>{
   // console.log(entry);
  })
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2]
}
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);


const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = (entries)=>{
  const [entry] = entries;
  //console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px` //% and rem does not work
});
headerObserver.observe(header);

//198. Revealing elements on scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  //console.log(entry);

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root:null,
  threshold: 0.15
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold:0,
  rootMargin: '-200px'
});

imgTargets.forEach(img => imgObserver.observe(img))

//200. Building a Slider Component: Part1 && //201. Building a Slider Component: Part2
//Slider
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
//const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right')
/* slider.style.transform = 'scale(0.4) translateX (-800px)';
slider.style.overflow = 'visible'; */
/* slides.forEach((s, i)=>
  (s.style.transform = `translateX(${100 * i }%)`)
) */
const createDots = function(){
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class = "dots__dot" data-slide="${i}"></button>`
    );
    
  })
}
const activateDot = function(slide){
  document.querySelectorAll('.dots__dot')
  .forEach(
    dot=> 
    dot.classList.remove('dots__dot--active')
    );
    
  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
  .classList.add('dots__dot--active');
}
const goToSlide = function(slide){
  slides.forEach(
    (s, i)=>(s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
};
//Next slide
const nextSlide = function(){
  if(curSlide === maxSlide - 1){
    curSlide = 0;
  }else{
      curSlide++;
    }
  goToSlide(curSlide)
  activateDot(curSlide);
};
const maxSlide = slides.length;
let curSlide = 0;
const prevSlide = function(){
  console.log("prev btn clicked")
  if(curSlide === 0){
    curSlide = maxSlide - 1;
  }else{
    curSlide--;   
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}
const init = function(){
  createDots(0);
  goToSlide(0);
  activateDot(0);
}
init();
//btnRight
btnRight.addEventListener('click', nextSlide);
//btnLeft
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function(e){
  //console.log(e);
  if(e.key === "ArrowLeft") prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    //console.log('DOT');
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

document.addEventListener('DOMContentLoaded', function(e){
  console.log(e);
})

window.addEventListener('load', function(e){
console.log("Page fully loaded", e)
});




//203 Efficient Script Loading: defer and async
/* This influence the javascript file in which they are fetched
which means 
Download javascript file and execute 

In html we can write script in head and body end */