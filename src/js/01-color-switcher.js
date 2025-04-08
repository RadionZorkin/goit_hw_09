const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timerId;

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);

refs.stopBtn.setAttribute('disabled', '');

function onClickStart() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  console.log(refs.startBtn);

  refs.startBtn.setAttribute('disabled', '');
  refs.stopBtn.removeAttribute('disabled');
}
function onClickStop() {
  clearTimeout(timerId);
  refs.stopBtn.setAttribute('disabled', '');
  refs.startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
