// HTML містить кнопки «Start» і «Stop».
// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>
// 1.Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір
// фону < body > на випадкове значення, використовуючи інлайн стиль.
// 2.Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// 3.Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. 
// 4.Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).
// Для генерування випадкового кольору використовуй функцію getRandomHexColor.
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// Variables
const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
btnStop.disabled = true;
// Listeners
btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);
// Functions
let timerId = null;

function btnStatus(activeBtn, disabledBtn) {
    disabledBtn.disabled = true;
    activeBtn.disabled = false;
}

function onBtnStartClick() {
    // btnStart.disabled = true;
    // btnStop.disabled = false;
    btnStatus(btnStop, btnStart);
    timerId = setInterval(() => {
        const bodyColor = getRandomHexColor();
        body.style.background = bodyColor;
    }, 1000);
}

function onBtnStopClick() {
    // btnStart.disabled = false;
    // btnStop.disabled = true; 
    clearInterval(timerId);
    btnStatus(btnStart, btnStop);
}
