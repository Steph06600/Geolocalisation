// Récupération des éléments du DOM
let buttonWhereAmI = document.querySelector(".whereAmI");
let whereAmIDiv = document.querySelector(".whereAmIDiv");
let saveButton = document.querySelector(".savePosition");
let saveDiv = document.querySelector(".saveDiv");
let savedPosition = document.querySelector(".savedPosition");
let savedDiv = document.querySelector(".savedDiv");
let deletePosition = document.querySelector(".deletePosition");
let deleteDiv = document.querySelector(".deleteDiv");

// APPARITION DE LA CARTE AU CHARGEMENT DE LA PAGE
var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

function geoLoc() {
  // Ecouteur d'evenement sur mon bouton ou suis je ?
  buttonWhereAmI.addEventListener("click", function () {
    // Récupération de la localisation de l'utilisateur
    navigator.geolocation.getCurrentPosition(function (pos) {
      // Récupérer à partir de pos la longitude et la latitude
      let latitude = pos.coords.latitude;
      let longitude = pos.coords.longitude;
      // Création du paragraphe qui va accueillir latitude et longitude
      let paragraphe = document.createElement("p");
      // DOnner une valeur à notre paragraphe
      paragraphe.innerText = `Votre latitude: ${latitude} / Votre longitude : ${longitude}`;
      // Parent DIV enfant Para
      whereAmIDiv.appendChild(paragraphe);

      // Déplacement de la map jusqu'a notre position
      map.flyTo([latitude, longitude], 12);
      //Ajout de notre marqueur sur la carte
      L.marker([latitude, longitude]).addTo(map);
      // Ouverture de la map dans un nouvelle onglet

      //   window.open(
      //     `https://www.openstreetmap.org/#map=4/${latitude}/${longitude}`,
      //     "_blank"
      //   );
      // Appel de ma fonction savePosition
      savePosition(latitude, longitude);
    });
  });
}

function savePosition(latitude, longitude) {
  saveButton.addEventListener("click", function () {
    // Sauvegarde de ma position dans mon localStorage
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);

    saveDiv.innerHTML = "<p>Position sauvegardée</p>";
  });
}

// Fonction récupération localStorage
function getLocalStorage() {
  savedPosition.addEventListener("click", function () {
    // Récupération du local Storage
    let latitudeLS = localStorage.getItem("latitude");
    let longitudeLS = localStorage.getItem("longitude");

    savedDiv.innerHTML =
      "Votre position sauvegardé est: Latitude: " +
      latitudeLS +
      " longitude :" +
      longitudeLS;
  });
}

// Fonction delete LocalStorage
function deleteLocalStorage() {
  deletePosition.addEventListener("click", function () {
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
    location.reload();
  });
}

// appel de la fonction deleteLocalStorage
deleteLocalStorage();
// appel de getLocalStorage
getLocalStorage();

geoLoc();
