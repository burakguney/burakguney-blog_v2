$(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
        $('#mainNav').addClass('shrink');
    }
    else {
        $('#mainNav').removeClass('shrink');
    }
});


$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


let navbutton = document.getElementById("navbutton");
let nav = document.getElementById("mainNav");
navbutton.addEventListener("click", () => {
    nav.classList.add("shrink");
})


function previewPostImage() {
    var img = document.getElementById('postImg');
    var file = document.getElementById('postImage').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        img.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        img.src = "";
    }
}


function previewAboutImage() {
    var img = document.getElementById('aboutImg');
    var file = document.getElementById('aboutImage').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        img.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        img.src = "";
    }
}