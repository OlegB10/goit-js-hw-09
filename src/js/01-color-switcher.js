const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

let intervalId;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

const startChangingColor = () => {
  startButton.disabled = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const stopChangingColor = () => {
  startButton.disabled = false;
  clearInterval(intervalId);
};

startButton.addEventListener('click', startChangingColor);
stopButton.addEventListener('click', stopChangingColor);
