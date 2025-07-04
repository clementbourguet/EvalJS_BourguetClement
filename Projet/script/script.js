const usersHuman = [{
    type: "humain",
    name: "John Doe",
    email: "j.smith@gmail.com",
    age: 25,
    avatar: './img/john.png',
    icon: './img/john_icon.png',
    latitude: 43.604429,
    longitude: 1.443812
},
{
    type: "humain",
    name: "Jane Smith",
    email: "ja.doe@sfr.fr",
    age: 5,
    avatar: './img/jane.png',
    icon: './img/jane_icon.png',
    latitude: 43.60792,
    longitude: 1.44133
},
{
    type: "humain",
    name: "Le Vénérable",
    email: "levy@gmail.com",
    age: 500,
    avatar: './img/venerable.png',
    icon: './img/venerable_icon.png',
    latitude: 43.60053,
    longitude: 1.44590
}
];

const usersPet = [{
    type: "animal de compagnie",
    espece: "chien",
    name: "Rox",
    age: 7,
    propriétaire: "John Doe",
    avatar: './img/chien.png',
    icon: './img/chien_icon.png',
    latitude: 43.60377,
    longitude: 1.43583
},
{
    type: "animal de compagnie",
    espece: "renard",
    name: "Roukie",
    age: 300,
    propriétaire: "Le Vénérable",
    avatar: './img/renard.jpg',
    icon: './img/renard_icon.png',
    latitude: 43.59602,
    longitude: 1.43692
}
];

const usersXeno = [{
    type: "Xeno",
    espece: "Krogan",
    name: "Wrex",
    menace: "Rouge",
    age: 45,
    avatar: './img/wrex.png',
    icon: './img/wrex_icon.png',
    latitude: 43.59555,
    longitude: 1.45257
},
{
    type: "Xeno",
    espece: "Turien",
    name: "Garrus",
    menace: "Vert",
    age: 35,
    avatar: './img/garrus.png',
    icon: './img/garrus_icon.png',
    latitude: 43.61108,
    longitude: 1.45539
},
{
    type: "Xeno",
    espece: "Asari",
    name: "Liara",
    menace: "ULTRA Rouge",
    age: 25,
    avatar: './img/liara.png',
    icon: './img/liara_icon.png',
    latitude: 43.61183,
    longitude: 1.43222
}
];

// affichage des membres
let tabData = [];
const allUsers = [usersHuman, usersPet, usersXeno];

for (let i = 0; i < allUsers.length; i++) {
    for (let j = 0; j < allUsers[i].length; j++) {
        tabData.push(allUsers[i][j]);
    }
}
console.log(tabData);

//fonction cardHuman
function cardHuman(object) {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = object.name;
    const image = document.createElement("img");
    image.src = object.avatar;
    image.alt = `portrait de :${object.name}`;
    const p = document.createElement("p");
    p.textContent = object.age + " ans" + object.email;
    article.appendChild(h2);
    article.appendChild(image);
    article.appendChild(p);
    article.classList.add("card");
    return article;
}

//fonction cardPet
function cardPet(object) {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = object.name;
    const image = document.createElement("img");
    image.src = object.avatar;
    image.alt = `portrait de :${object.name}`;
    const p = document.createElement("p");
    p.textContent = object.age + object.espece + object.propriétaire;
    article.appendChild(h2);
    article.appendChild(image);
    article.appendChild(p);
    article.classList.add("card");
    return article;
}
//fonction cardXeno
function cardXeno(object) {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = object.name;
    const image = document.createElement("img");
    image.src = object.avatar;
    image.alt = `portrait de :${object.name}`;
    const p = document.createElement("p");
    p.textContent = object.age + object.espece + object.menace;
    article.appendChild(h2);
    article.appendChild(image);
    article.appendChild(p);
    article.classList.add("card");
    return article;
}

//fonction profil

/*function profil(objectTab) {
    let cardList = [];
    objectTab.map(function(objectTab){
        if (objectTab.type == "humain") {
            cardHuman(objectTab);
            cardHumanOutput = cardHuman(objectTab);
            cardList.appenChild(cardHumanOutput);
        } else if (objectTab.type =="animal de compagnie"){
            cardPet(objectTab);
            cardPetOutput = cardPet(objectTab);
            cardList.appenChild(cardPetOutput)
        }
    }
}
*/
function profil(objectTab) {
    let cardList = [];
    objectTab.forEach(function(object) {
        if (object.type === "humain") {
            const card = cardHuman(object);
            cardList.push(card);
        } else if (object.type === "animal de compagnie"){
            const card = cardPet(object);
            cardList.push(card);
        } else if (object.type === "Xeno") {
            const card = cardXeno(object);
            cardList.push(card);
        } else {
            console.log("Type de profil inexistant");
        }
    })
    return cardList;
}
profil(usersHuman);
profil(usersPet);
profil(usersXeno);

const humanProfil = profil(usersHuman);
const petProfil = profil(usersPet);
const xenoProfil = profil(usersXeno);

const profils = document.querySelector(".profils");
console.log(usersHuman);
humanProfil.forEach(card=> profils.appendChild(card));
petProfil.forEach(card=> profils.appendChild(card));
xenoProfil.forEach(card=> profils.appendChild(card));

//fonction profilAll
/*
function profilAll(tab) {
    const profils = document.querySelector("profils");
    for (let i = 0 ; i < tabData[i].length ; i++){
        for (let j = 0 ; j < tabData[i][j].length ; j++){

        }
    }
}


*/

//LEAFLET
const map = L.map('map').setView([ 43.604429, 1.443812], 14);
const divMap = document.getElementById("map");


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function markerProfil(object){
    const icon = L.icon({
        iconUrl : object.icon,
        iconSize : [50, 83],
        iconAnchor : [25, 83]
    })
    const marker = L.marker([object.latitude, object.longitude], {icon:icon}).addTo(map)
    return icon;
}
usersHuman.forEach(profil => {
    markerProfil(profil);
})
