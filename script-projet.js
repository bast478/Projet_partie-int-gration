// Création des éléments

const viewMainPicture = 

// Gallerie Desktop

const listMinPictures = document.querySelectorAll('#main_Gallery > div:not(#grid_main-item) > img'); //Miniatures
const mainPicture = document.querySelector('#grid_main-item > img');
const arrow = document.querySelector('#grid_main-item > svg');

// Evenements
// Changer de photo au click sur Desktop

listMinPictures.forEach(function(minPicture){
    minPicture.addEventListener("click", function() {
        let srcMainPicture = mainPicture.getAttribute("src")
        mainPicture.setAttribute('src', this.getAttribute("src"));
        this.setAttribute('src', srcMainPicture)
    });
});

// Agrandir la photo au click de la flèche

arrow.addEventListener('click', function(){

});