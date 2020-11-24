if(document.cookie.split("darkmode=")[1] == "enabled") {
    // document.querySelector("#darkmode").setAttribute("checked","checked");
    document.querySelector("body").setAttribute("class","darkmode");
} else {
    // document.querySelector("#darkmode").removeAttribute("checked");
    document.querySelector("body").setAttribute("class","lightmode");
}

document.addEventListener("DOMContentLoaded", () => {
    let sidenav = document.querySelectorAll(".sidenav");
    let fixedactionbtn = document.querySelectorAll(".fixed-action-btn");
    M.Sidenav.init(sidenav);
    M.FloatingActionButton.init(fixedactionbtn);
})

$("document").ready(function() {
    $(".sidenav").sidenav({
        draggable: true
    });
    $(".fixed-action-btn").floatingActionButton({});
})

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".progress").style.display = "none";
    document.querySelector(".afterload").style.display = "block";
})