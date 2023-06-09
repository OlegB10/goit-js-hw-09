import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

let timerRunning = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startButton.disabled = true;
      startButton.classList.add("disabled"); 
    } else {
      startButton.disabled = false;
      startButton.classList.remove("disabled"); 
    }
  },
};

const dateTimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

let intervalId;

flatpickr(dateTimePicker, options);

const countdownTimer = (selectedDate) => {
  if (timerRunning) {
    return;
  }

  startButton.disabled = true;
  startButton.classList.add("disabled"); 
  dateTimePicker.disabled = true; 
  timerRunning = true;

  intervalId = setInterval(() => {
    const currentDate = new Date();
    const remainingTime = selectedDate.getTime() - currentDate.getTime();

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      startButton.disabled = false;
      startButton.classList.remove("disabled"); 
      dateTimePicker.disabled = false; 
      updateTimerDisplay(0, 0, 0, 0);
      Notiflix.Notify.success("Countdown timer has ended");
      timerRunning = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
};

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const updateTimerDisplay = (days, hours, minutes, seconds) => {
  daysValue.textContent = days;
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    timerRunning = false;
    startButton.disabled = false;
  }
};

const addLeadingZero = (value) => {
  return value.toString().padStart(2, "0");
};

startButton.addEventListener("click", () => {
  if (timerRunning) {
    return; 
  }

  const selectedDate = flatpickr.parseDate(dateTimePicker.value, "Y-m-d H:i");

  if (selectedDate <= new Date()) {
    Notiflix.Notify.failure("Please choose a date in the future");
    startButton.disabled = true;
  } else {
    countdownTimer(selectedDate);
  }
});