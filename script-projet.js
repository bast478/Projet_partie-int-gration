function setAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// CREATION DES VARIABLES ET ELEMENTS

const svgNS = "http://www.w3.org/2000/svg";

//***************************Gallerie Desktop**************************
const listMinPictures = document.querySelectorAll('#main_Gallery > div:not(#grid_main-item) > img'); //Miniatures
const mainPicture = document.querySelector('#grid_main-item > img');
const arrow = document.querySelector('#grid_main-item > svg');
const modal = document.querySelector('#modal');

//------Modal dans la gallerie--------
const divGridModal = document.createElement('DIV');

//Flèche gauche gallerie
const leftArrowGallery = document.createElementNS(svgNS, "svg");
setAttributes(leftArrowGallery, {"width": "67", "height": "154", "viewBox": "0 0 67 154", "fill": "none", "xmlns": "http://www.w3.org/2000/svg"});
for (let i = 0; i < 2; i++) {
    let leftArrowGalleryLine = document.createElementNS(svgNS, "line");
    if (i === 0) {
        setAttributes(leftArrowGalleryLine, {"x1": "66.0449", "y1": "0.642788", "x2": "1.76609", "y2": "77.2472", "stroke": "white", "stroke-width": "2"});
    } else if (i === 1) {
        setAttributes(leftArrowGalleryLine, {"x1": "65.5128", "y1": "153.251", "x2": "1.23079", "y2": "76.6429", "stroke": "white", "stroke-width": "2"});
    }
    leftArrowGallery.appendChild(leftArrowGalleryLine);
}

//Flèche droite gallerie
const rightArrowGallery = document.createElementNS(svgNS, "svg");
setAttributes(rightArrowGallery, {"width": "67", "height": "154", "viewBox": "0 0 67 154", "fill": "none", "xmlns": "http://www.w3.org/2000/svg"});
for (let i = 0; i < 2; i++) {
    let rightArrowGalleryLine = document.createElementNS(svgNS, "line");
    if (i === 0) {
        setAttributes(rightArrowGalleryLine, {"x1": "65.5159", "y1": "77.2473", "x2": "1.23717", "y2": "0.642836", "stroke": "white", "stroke-width": "2"});
    } else if (i === 1) {
        setAttributes(rightArrowGalleryLine, {"x1": "66.048", "y1": "76.6425", "x2": "1.76605", "y2": "153.251", "stroke": "white", "stroke-width": "2"});
    }
    rightArrowGallery.appendChild(rightArrowGalleryLine);
}

//Croix gallerie
const crossGallery = document.createElementNS(svgNS, "svg");
setAttributes(crossGallery, {"width": "39", "height": "38", "viewBox": "0 0 39 38", "fill": "none", "xmlns": "http://www.w3.org/2000/svg"});
for (let i = 0; i < 2; i++) {
    let crossGalleryLine = document.createElementNS(svgNS, "line");
    if (i === 0) {
        setAttributes(crossGalleryLine, {"x1": "1.29289", "y1": "36.6481", "x2": "36.6482", "y2": "1.29278", "stroke": "white", "stroke-width": "2"});
    } else if (i === 1) {
        setAttributes(crossGalleryLine, {"x1": "2.70711", "y1": "1.29289", "x2": "38.0624", "y2": "36.6482", "stroke": "white", "stroke-width": "2"});
    }
    crossGallery.appendChild(crossGalleryLine);
}

//Photo du diapo
const mainPictureGallery = document.createElement('IMG');
mainPictureGallery.setAttribute("alt", "Une photo du gouffre.");

//Mettre les éléments du diapo dans une div
divGridModal.appendChild(leftArrowGallery);
divGridModal.appendChild(mainPictureGallery);
divGridModal.appendChild(rightArrowGallery);
divGridModal.appendChild(crossGallery);
modal.appendChild(divGridModal);
// EVENEMENTS

// Changer de photo au click sur Desktop

listMinPictures.forEach(function(minPicture){
    minPicture.addEventListener("click", function() {
        let srcMainPicture = mainPicture.src;
        mainPicture.src = this.src;
        this.src = srcMainPicture;
    });
});

// Agrandir la photo au click de la flèche

arrow.addEventListener('click', function(){
    mainPictureGallery.src = mainPicture.src;
    modal.style.display = "block";
});