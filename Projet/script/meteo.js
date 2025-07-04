//Le fichier JS pour la partie Météo

const cardMeteo = document.querySelector(".cardMeteo");

//animation de la div avec une durée de 1 seconde
cardMeteo.setAttribute("data-aos", "fade-out");
cardMeteo.setAttribute("data-aos-duration", "1000");
cardMeteo.setAttribute("data-aos-once", "true");

setTimeout(() => {
    cardMeteo.removeAttribute("data-aos");
    cardMeteo.removeAttribute("data-aos-duration");
}, 1000);

//creation de la div
const info = document.createElement("div");
//ajout du style
info.style.height = "300px";
info.style.width = "200px";
info.style.margin = "16px";
info.style.border = "solid 3px grey";
info.style.padding = "16px 12px 24px 12px";

//inserer la div
const button = document.body.getElementsByTagName("button")[0];
cardMeteo.insertBefore(info, button);

//creer une fonction addInfo
function addInfo(text) {
    const paragraphe = document.createElement("p");
    paragraphe.textContent = text;
    info.appendChild(paragraphe);
}

//ajouter la classe
function bouton() {
    button.classList.add("button__cardMeteo");
}


button.addEventListener("mousedown", () => {
    button.style.backgroundColor = "orange";
})
button.addEventListener("mouseup", () => {
    button.style.backgroundColor = "";
})
button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "";
})

//ajout API meteo

async function displayMeteo() {
    fetch("https://prevision-meteo.ch/services/json/toulouse")
        .then((data) => {
            console.log(data);
            return data.json();
        })
        .then((response) => {
            console.log(response);
            info.textContent = "";
            addInfo(`Condition : ${response.fcst_day_0.condition}`);
            addInfo(`Température : ${response.current_condition.tmp}`);
            addInfo(`Température max : ${response.fcst_day_0.tmax}`);
            addInfo(`Température min : ${response.fcst_day_0.tmin}`);


        })

        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            console.log("Terminé");
        })
}
button.addEventListener("click", () => {
    bouton();
    displayMeteo();
})

