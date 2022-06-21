// Gallerie Desktop

const listMinPictures = Array.from(document.querySelectorAll('#main_Gallery > div:not(#grid_main-item) > img')); //Miniatures
console.log(listMinPictures);
const mainPicture = document.querySelector('#grid_main-item > img');

// Evenement

listMinPictures.forEach(function(minPicture){
    minPicture.addEventListener("click", function() {
        let srcMainPicture = mainPicture.getAttribute("src")
        mainPicture.setAttribute('src', this.getAttribute("src"));
        this.setAttribute('src', srcMainPicture)
    });
});