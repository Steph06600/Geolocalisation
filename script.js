//RECUPERER MON BOUTON OU SUIS JE

var map = L.map(`map`).setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// // AJOUTER UN CERCLE
var circle = L.circle([51.508, -0.11], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
}).addTo(map);

const button = document.querySelector(".button");
// // // DECLARER MA VARIABLE LONGITUDE
let titreLong = document.querySelector(".titreLong");
// // //DECLARER MA VARIABLE LATITUDE
let titreLat = document.querySelector(".titreLat");
//DECLARER MON BOUTON SAUVEGARDE
let boutonSauvegarde = document.querySelector(".boutonSauvegarde");
//DECLARER MON BOUTON OU SUIS JE
let boutonOuSuisJe = document.querySelector(".boutonOuSuisJe");
//DECLARER LA CLASSE COORDONNEES GPS
let coordonneesGPS = document.querySelector(".coordonneesGPS");
//DECLARER LE BOUTON REINITIALISER
let boutonReinitialiser = document.querySelector(".boutonReinitialiser");
//DECLARER DERNIERE POSITION
let dernierePosition = document.querySelector(".dernierePosition");

//PLACER UN ECOUTEUR SUR LE BOUTON
button.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    // CHARGER LA VALEUR DE LA LATITUDE ET LUI DONNER UNE VARIABLE
    console.log(position.coords.latitude);
    let coordonneesLat = position.coords.latitude;
    let pLat = document.createElement("p");
    pLat.innerText = coordonneesLat;
    titreLat.appendChild(pLat);

    // CHARGER LA VALEUR DE LA LONGITUDE ET LUI DONNER UNE VARIABLE
    console.log(position.coords.longitude);
    let coordonneesLong = position.coords.longitude;
    let pLong = document.createElement("p");
    pLong.innerText = coordonneesLong;
    titreLong.appendChild(pLong);

    // //PLACER NOTRE EMPLACEMENT SUR LA CARTE
    map.flyTo([coordonneesLat, coordonneesLong]);

    // // AJOUTER UN CERCLE
    var circle = L.circle([coordonneesLat, coordonneesLong], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 20,
    }).addTo(map);

    // //AJOUTER UN MARQUEUR
    var marker = L.marker([coordonneesLat, coordonneesLong]).addTo(map);

    //ECOUTEUR SUR BOUTON SAUVEGARDE
    boutonSauvegarde.addEventListener("click", function () {
      // STOCKER LA LATITUDE
      localStorage.setItem("latitude", coordonneesLat);
      let latStorage = localStorage.getItem("latitude");

      // STOCKER LA LONGITUDE
      localStorage.setItem("longitude", coordonneesLong);
      let longStorage = localStorage.getItem("longitude");

      //ECOUTEUR SUR BOUTON OU SUIS JE
      boutonOuSuisJe.addEventListener("click", function () {
        let dernierePosition = document.createElement("p");
        latStorage = localStorage.getItem("latitude");
        longStorage = localStorage.getItem("longitude");
        dernierePosition.innerText = `Ta dernière position était de ${latStorage} latitude et ${longStorage} longitude`;
        coordonneesGPS.appendChild(dernierePosition);

        //ECOUTEUR SUR BOUTON REINITIALISER
        boutonReinitialiser.addEventListener("click", function () {
          latStorage = localStorage.getItem("latitude");
          localStorage.removeItem("latitude");
          longStorage = localStorage.getItem("longitude");
          localStorage.removeItem("longitude");
          dernierePosition.remove();
          pLat.remove();
          pLong.remove();
        });
      });
    });
  });
});
