'use strict';
/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🍕Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 50;
document.querySelector('.guess').value  = 23;
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;


document.querySelector('.check').addEventListener('click', () => {

    console.log("Check Button Clicked")
    const guess = Number(document.querySelector('.guess').value);

    //when there is no input
    if (!guess) {
        document.querySelector('.message').textContent = ' 🔍 No number';
    }


    else if (score > 1) {
        if (guess === secretNumber) {
            document.querySelector('.number').textContent = secretNumber;

            document.querySelector('.message').textContent = "🍕 Correct Number!"

            document.querySelector('body').style.backgroundColor = "#60b347";
            document.querySelector('.number').style.width = '30rem';

            if (score > highscore) {
                highscore = score;
                document.querySelector('.highscore').textContent = highscore;
            }

            //when guess is too high
        } else if (guess > secretNumber) {
            ;


            document.querySelector('.message').textContent = ' 🗽 Too high!';
            score--;
            document.querySelector('.score').textContent = score;
            //


            //when guess is too low
        } else if (guess < secretNumber) {


            document.querySelector('.message').textContent = " ☄ Two low!"
            score--;
            document.querySelector('.score').textContent = score;
            //



        }

    }
    else {
        document.querySelector('.message').textContent = '💥 You lost the Game'
        document.querySelector('.score').textContent = 0;


    }


});

document.querySelector('.again').addEventListener('click', () => {
    console.log('again button is clicked');
    //reset
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    document.querySelector('.message').textContent = "Start guessing...";
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222'
    document.querySelector('.number').style.width = '15rem';
})