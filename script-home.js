function setAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

/************************************************************/

// CREATION DES VARIABLES ET ELEMENTS

const svgNS = "http://www.w3.org/2000/svg";
let i;

//***************************Menu burger*******************************
const burgerMenu = document.querySelector('#menu-burger');

//***************************Nav mobile********************************
const mobileNav = document.getElementById('nav-mobile');
mobileNav.style.height = '0px';
const mobileNavUl = document.querySelector('#nav-mobile > ul');
let heightMobileNavUl;
  window.addEventListener('load', () => {
    heightMobileNavUl = mobileNavUl.offsetHeight;
    console.log('hauteur de la liste nav mobile : ' + heightMobileNavUl);
    console.log('page is fully loaded');
  });

//***************************Section infos header**********************
const headerInfos = document.querySelectorAll('#header_infos > div');
const headerInfosLength = headerInfos.length;
let selected = document.querySelector('#header_infos > .selected');

//---------------------------Bouttons infos header---------------------
const leftArrowHeaderInfos = document.querySelector('#header_infos-buttons .prev');
const rightArrowHeaderInfos = document.querySelector('#header_infos-buttons .next');

//***************************Gallerie Desktop**************************
const mainGallery = document.querySelector('#main_Gallery');
const listPictures = document.querySelectorAll('#main_Gallery > div > img');
const listMinPictures = document.querySelectorAll('#main_Gallery > div:not(#grid_main-item) > img'); //Miniatures
const mainPicture = document.querySelector('#grid_main-item > img');
const arrow = document.querySelector('#grid_main-item > svg');
const modal = document.querySelector('#modal');

const divsMainGallery = document.querySelectorAll('#main_Gallery > div');
const divsMainGalleryLength = divsMainGallery.length;

//------Modal dans la gallerie--------
const divGridModal = document.createElement('DIV');
divGridModal.setAttribute('id', 'gridModal');

//Flèche gauche gallerie
const leftArrowGallery = document.createElementNS(svgNS, "svg");
setAttributes(leftArrowGallery, {"id": "leftArrowGallery", "width": "67", "height": "154", "viewBox": "0 0 67 154", "fill": "none", "xmlns": "http://www.w3.org/2000/svg"});
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
setAttributes(rightArrowGallery, {"id": "rightArrowGallery", "width": "67", "height": "154", "viewBox": "0 0 67 154", "fill": "none", "xmlns": "http://www.w3.org/2000/svg"});
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
setAttributes(crossGallery, {"id": "crossGallery", "width": "39", "height": "38", "viewBox": "0 0 39 38", "fill": "none", "xmlns": "http://www.w3.org/2000/svg"});
for (let i = 0; i < 2; i++) {
    let crossGalleryLine = document.createElementNS(svgNS, "line");
    if (i === 0) {
        setAttributes(crossGalleryLine, {"x1": "1.29289", "y1": "36.6481", "x2": "36.6482", "y2": "1.29278", "stroke": "white", "stroke-width": "2"});
    } else if (i === 1) {
        setAttributes(crossGalleryLine, {"x1": "2.70711", "y1": "1.29289", "x2": "38.0624", "y2": "36.6482", "stroke": "white", "stroke-width": "2"});
    }
    crossGallery.appendChild(crossGalleryLine);
}

//Div de photo du diapo
const divMainPictureGallery = document.createElement('DIV');

//Photo du diapo
const mainPictureGallery = document.createElement('IMG');
mainPictureGallery.setAttribute("alt", "Une photo du gouffre.");

//Mettre les éléments du diapo dans une div
divGridModal.appendChild(crossGallery);

divGridModal.appendChild(leftArrowGallery);

divMainPictureGallery.appendChild(mainPictureGallery);
divGridModal.appendChild(divMainPictureGallery);

divGridModal.appendChild(rightArrowGallery);


modal.appendChild(divGridModal);

/*************************************************************************/

// EVENEMENTS

// Changer de photo de la gallerie au click sur Desktop

listMinPictures.forEach(function(minPicture){
    minPicture.addEventListener("click", function() {
        let srcMainPicture = mainPicture.src;
        mainPicture.src = this.src;
        this.src = srcMainPicture;
    });
});

// Agrandir la photo de la gallerie au click de la flèche

arrow.addEventListener('click', function(){
    mainPictureGallery.src = mainPicture.src;
    modal.style.display = "block";
    precNextDiapo(listPictures, mainPictureGallery, leftArrowGallery, rightArrowGallery);
    closeDiapo(modal, crossGallery);
});

// Fermer la photo du diapo

function closeDiapo (diapo, cross) {
    cross.onclick = function() {
        diapo.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == diapo) {
          diapo.style.display = "none";
        }
    }
}

// Photo suivante ou précédente

function precNextDiapo (list, mainPicGallery, left, right) {
    let i;
    for (i=0; i < list.length; i++) {
        if (mainPicGallery.src === list[i].src) {
            console.log('main.src égal à', list[i].src);
            break;
        }
    }

    left.onclick = function() {
        if (i === 0) {
            i = list.length - 1;
        } else {
            i--;
        }
        mainPicGallery.src = list[i].src;
    }

    right.onclick = function() {
        if (i === list.length - 1) {
            i = 0;
        } else {
            i++;
        }
        mainPicGallery.src = list[i].src;
    }
}

// Click on burger menu

burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.toggle('menu-burger-change');

    if (mobileNav.style.height === '0px') {
        mobileNav.style.height = `${heightMobileNavUl}px`;
    } else {
        mobileNav.style.height = '0px';
    }
});

// Carousel

function moveToSelected(element) {

    let i;
    for (i = 0; i < headerInfosLength; i++) {
        if (selected === headerInfos[i]) {
            break;
        }
    }

    if (element !== "next" && element !== "prev") {
        selected = element;
    } else if (element === "next" && i+1 < headerInfosLength) {
        selected = selected.nextElementSibling;
    } else if (element === "prev" && i-1 >= 0) {
        selected = selected.previousElementSibling;
    } else if (i+1 >= headerInfosLength) {
        return;
    } else if (i-1 < 0) {
        return;
    }

    for (i = 0; i < headerInfosLength; i++) {
        if (selected === headerInfos[i]) {
            break;
        }
    }

    let next;
    if (i+1 < headerInfosLength) {
        next = selected.nextElementSibling;
        next.className = '';
        next.classList.add("next");
    }

    let prev;
    if (i-1 >= 0) {
        prev = selected.previousElementSibling;
        prev.className = "";
        prev.classList.add("prev");
    }

    let prevSecond;
    if (i-2 >= 0) {
        prevSecond = prev.previousElementSibling;
        prevSecond.className = "";
        prevSecond.classList.add("prevLeftSecond");
    }

    let nextSecond;
    if (i+2 < headerInfosLength) {
        nextSecond = next.nextElementSibling;
        nextSecond.className = "";
        nextSecond.classList.add("nextRightSecond");
    }
    
    selected.className = "";
    selected.classList.add("selected");

    let lastOfNextAllIndex = (headerInfosLength - 1) - (i + 3);
    if (lastOfNextAllIndex >= 0) {
        for (let j = 0; j <= lastOfNextAllIndex; j++) {
            headerInfos[i+3+j].className = "";
            headerInfos[i+3+j].classList.add("hideRight");
        }
    }

    let lastOfPrevAllIndex = i - 3;
    if (lastOfPrevAllIndex >= 0) {
        for (let j = 0; j <= lastOfPrevAllIndex; j++) {
            headerInfos[i-3-j].className = "";
            headerInfos[i-3-j].classList.add("hideLeft");
        }
    }
}
  

document.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowLeft':
        moveToSelected('prev');
        break;

        case 'ArrowRight':
        moveToSelected('next');
        break;

        default: return;
    }
    e.preventDefault();
  });
  

headerInfos.forEach(div => {
    div.addEventListener('click', function() {
        moveToSelected(this);
    })
});

leftArrowHeaderInfos.addEventListener('click', () => {
    moveToSelected('prev');
});

rightArrowHeaderInfos.addEventListener('click', () => {
    moveToSelected('next');
});

// Defilement automatique galerie

for (i=0; i < divsMainGalleryLength; i++) {
    if (divsMainGallery[i].classList.contains('show-photo-gallery')) {
        break;
    }
}

if (window.innerWidth <= '680') {
    let heightResponsiveDivsGallery = Math.ceil(window.innerWidth/1.58);
    mainGallery.style.height = `${heightResponsiveDivsGallery}px`;

    setInterval(function () {
        console.log(i);
        if (i < divsMainGalleryLength) {
            divsMainGallery[i-1].classList.remove('show-photo-gallery');
            divsMainGallery[i].classList.add('show-photo-gallery');
            i++;
        } else {
            i = 0; 
            divsMainGallery[divsMainGalleryLength-1].classList.remove('show-photo-gallery');
            divsMainGallery[i].classList.add('show-photo-gallery');
            i++;
        }
    }, 4000);
}