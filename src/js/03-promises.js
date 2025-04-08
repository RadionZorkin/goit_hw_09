import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  firstDelayInput: document.querySelector('[name=delay]'),
  delayStepInput: document.querySelector('[name=step]'),
  amountNumber: document.querySelector('[name=amount]'),
  formElement: document.querySelector('form'),
  buttonCreatePromises: document.querySelector('button[type=submit]'),
};

// let amount;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
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
}

refs.formElement.addEventListener('submit', evt => {
  evt.preventDefault();

  let firstDelay;
  let delayStep;

  const formData = new FormData(refs.formElement);
  firstDelay = Number(formData.get('delay'));
  delayStep = Number(formData.get('step'));
  amountNumber = Number(formData.get('amount'));

  for (let i = 0; i < amountNumber; i++) {
    const position = i + 1;
    const delay = firstDelay + i * delayStep;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
