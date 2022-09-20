// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мс, 
// крок збільшення затримки для кожного промісу після 1-го і кіл-ть промісів, яку необхідно створити.
// Напиши скрипт, який на момент сабміту форми викликає ф-цію createPromise(position, delay)
// стільки разів, скільки ввели в поле amount. 
// Під час кожного виклику передай їй номер промісу(position), що створюється, і затримку, 
// враховуючи першу затримку(delay), введену користувачем, і крок(step).
// Доповни код функції createPromise так, щоб вона повертала один проміс, який виконується 
// або відхиляється через delay часу. Значенням промісу повинен бути об'єкт, в якому будуть
// властивості position і delay зі значеннями однойменних параметрів. Використовуй 
// початковий код ф-ції для вибору того, що потрібно зробити з промісом - виконати або відхилити.
// Optional: Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.

import Notiflix from 'notiflix';
// Variables
const form = document.querySelector('.form');
const btn = document.querySelector('button');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

// Functions
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
});
};
// Listeners
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const { amount, step, delay } = event.target.elements;
  let amountVal = Number(amount.value);
  let stepVal = Number(step.value);
  let delayVal = Number(delay.value);
  for (let i = 0; i < amountVal; i += 1) {
    createPromise(i+1, delayVal)
      .then(({ position, delay }) => {
      // Optional: Notiflix
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
      // Optional: Notiflix
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delayVal += stepVal;
  }
}