function setAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// Création des éléments

const leftArrowGallery = document.createElement('SVG');
setAttributes(leftArrowGallery, {"width": "67", "height": "154", "viewBox": "0 0 67 154", "fill": "none", "xmlns": "http://www.w3.org/2000/svg"});
for (let i = 0; i < 2; i++) {
    let leftArrowGalleryLine = document.createElement('LINE');
    if (i === 0) {
        setAttributes(leftArrowGalleryLine, {"x1": "66.0449", "y1": "0.642788", "x2": "1.76609", "y2": "77.2472", "stroke": "white", "stroke-width": "2"});
    } else if (i === 1) {
        setAttributes(leftArrowGalleryLine, {"x1": "65.5128", "y1": "153.251", "x2": "1.23079", "y2": "76.6429", "stroke": "white", "stroke-width": "2"});
    }
    leftArrowGallery.appendChild(leftArrowGalleryLine);
}
console.log(leftArrowGallery);

const mainPictureGallery = document.createElement('IMG');
mainPictureGallery.setAttribute("alt", "Une photo du gouffre.");

// Gallerie Desktop

const listMinPictures = document.querySelectorAll('#main_Gallery > div:not(#grid_main-item) > img'); //Miniatures
const mainPicture = document.querySelector('#grid_main-item > img');
const arrow = document.querySelector('#grid_main-item > svg');
const modal = document.querySelector('#modal');

// Evenements
// Changer de photo au click sur Desktop

listMinPictures.forEach(function(minPicture){
    minPicture.addEventListener("click", function() {
        let srcMainPicture = mainPicture.src;
        mainPicture.src = this.src;
        this.src = srcMainPicture;
    });
});

// Agrandir la photo au click de la flèche

arrow.addEventListener('click', function(){;
    modal.appendChild(mainPictureGallery);
    mainPictureGallery.src = mainPicture.src;
    modal.style.display = 'block';
    modal.appendChild(leftArrowGallery);
});