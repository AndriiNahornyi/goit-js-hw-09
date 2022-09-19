// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на
// яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу.
// Використовуй бібліотеку flatpickr, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в 1-му елементі інтерфейсу. Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.
// Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу поле input#datetime-picker.
// Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна властивість в документації «Options», і використовуй його у своєму коді.
// const options = {contained in the task condition};
// Вибір дати
// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.
// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
// Відлік часу
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.
// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.
// НЕ БУДЕМО УСКЛАДНЮВАТИ: Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його - необхідно перезавантажити сторінку.
// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мc.
// function convertMs(ms) {contained in the task condition}
// Форматування часу
// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.
// Опціонально: Бібліотека повідомлень. Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix.
// Import described in the library 'flatpickr'
import flatpickr from "flatpickr";
// Additional styles import
import "flatpickr/dist/flatpickr.min.css";
// Optional import
import Notiflix from 'notiflix';

// Variables
const inputRef = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timerDaysRef = document.querySelector('span[data-days]');
const timerHoursRef = document.querySelector('span[data-hours]');
const timerMinutesRef = document.querySelector('span[data-minutes]');
const timerSecondsRef = document.querySelector('span[data-seconds]');
let selectedTimeMs = null;
let timerInterval;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    timerInterval && clearInterval(timerInterval);
    updateTimer();
  },
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      // alert('Please choose a date in the future');
      // Optional: replaced alert
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      selectedTimeMs = selectedDates[0].getTime();
      console.log(selectedTimeMs);
    }
  }
};

let selectedDay = flatpickr(inputRef, options);

// Listeners
btnStart.addEventListener('click', onBtnStartClick);

// Functions
function updateTimer({ days = '00', hours = '00', minutes = '00', seconds = '00' } = {
}) {
  timerDaysRef.textContent = addLeadingZero(days);
  timerHoursRef.textContent = addLeadingZero(hours);
  timerMinutesRef.textContent = addLeadingZero(minutes);
  timerSecondsRef.textContent = addLeadingZero(seconds);
}

function onBtnStartClick(event) {
  btnStart.disabled = true;
  let deltaTime = selectedTimeMs - Date.now();
  // console.log(deltaTime);
  // Виводимо timer
  timerInterval = setInterval(() => {
  const time = convertMs(deltaTime);
  updateTimer(time);
  deltaTime -= 1000;
  if (deltaTime < 1000) {
    clearInterval(timerInterval);
  }
  }, 1000
  )
}

// function: приведення часу до 2 знаків, якщо менше додає попереду 0
function addLeadingZero(value) {
return String(value).padStart(2, '0');
}

// З умови
function convertMs(ms) {
//   Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
//   Remaining days
  const days = Math.floor(ms / day);
//   Remaining hours
  const hours = Math.floor((ms % day) / hour);
//   Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
//   Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}