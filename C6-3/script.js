const wsUri = "wss://echo-ws-service.herokuapp.com";
const btnGeo = document.getElementById("btnGeolocation");
const btnSend = document.getElementById("btnSend");
const inpField = document.getElementById("input_field");
const output = document.getElementById("output");
const EMPTY = "<пустой текст>"
let websocket;

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  // alert(`Ваши координаты\nШирота: ${latitude}\nДолгота: ${longitude} °`);
  let mapLink;
  mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink = `<a href=${mapLink}>Ссылка на карту</a>`
  writeToScreen(mapLink)
  // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  // mapLink.textContent = 'Ссылка на карту';
}

btnGeo.addEventListener("click", () => {
   if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  }
});

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.className ="outcoming"
  pre.innerHTML = message;
  output.appendChild(pre);
}


function sendMessage() {
  txt = inpField.value;
  websocket.send(txt);
  return(txt || EMPTY);
};

btnSend.addEventListener("click", () => {
  writeToScreen(sendMessage());
});

websocket = new WebSocket(wsUri);
websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
  };
websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + (evt.data || EMPTY) +'</span>'
    );
  };