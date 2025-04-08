import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetimeInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let currentTime;
let selectedDate;
let deltaTime;
let isTimerActive = false;

// Об'єкт опцій flatpickr потрібний для виконання завдання
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    currentTime = new Date();
    validateSelectedDate();
  },
};

// Ініціація flatpickr
flatpickr('#datetime-picker', options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', startTimer);

updateClockface({ days: 0, hours: 0, minutes: 0, seconds: 0 });

function validateSelectedDate() {
  if (selectedDate > new Date()) {
    refs.startBtn.disabled = false;
  } else {
    // window.alert('Спробуй ввести майбутні дату та час');
    Notify.warning('Спробуй ввести майбутні дату та час');
  }
}

function startTimer() {
  if (selectedDate) {
    refs.startBtn.disabled = true;
    refs.datetimeInput.disabled = true;

    const endTimestamp = selectedDate.getTime();

    let timerId = setInterval(() => {
      currentTime = Date.now();
      deltaTime = endTimestamp - currentTime;

      if (deltaTime <= 0) {
        clearInterval(timerId);
        deltaTime = 0;
        // updateClockface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      console.log(convertMs(deltaTime));
      updateClockface(convertMs(deltaTime));
    }, 1000);
  } else {
    validateSelectedDate();
  }
}

// функція яка отримає time а повертає масив з нормальним форматом дати
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
