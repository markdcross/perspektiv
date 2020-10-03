// making a fav button 
var favbutton = document.querySelector("#favbutton");
console.log(favbutton);

window.FavoriteStarElement = document.registerElement(
    'favorite-star', 
    { prototype: proto }
);