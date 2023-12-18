const BASE_URLS = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram/',
};

const sendRequest = (ifPossible, onError, method, body) => {
  fetch(
    BASE_URLS[method],
    {
      method,
      body,
    }
  )
    .then((response) => response.json())
    .then((data) => ifPossible(data))
    .catch(() => onError());
};

const getData = (ifPossible, onError, method = 'GET') => sendRequest(ifPossible, onError, method);
const sendData = (ifPossible, onError, method, body) => sendRequest(ifPossible, onError, method, body);

export { getData, sendData };
