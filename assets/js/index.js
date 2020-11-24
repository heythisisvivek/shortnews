if(document.cookie.split("darkmode=")[1] == "enabled") {
    document.querySelector("#darkmode").setAttribute("checked","checked");
} else {
    document.querySelector("#darkmode").removeAttribute("checked");
}

document.querySelector("#darkmode").addEventListener("change", e => {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    if(document.querySelector("#darkmode").checked) {
        document.querySelector("body").setAttribute("class","darkmode");
        document.cookie = "darkmode = enabled;" + expires + ";path=/";
    } else {
        document.querySelector("body").setAttribute("class","lightmode");
        document.cookie = "darkmode = disabled;" + expires + ";path=/";
    }
})

document.querySelector("#darkmodefull").addEventListener("change", e => {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    if(document.querySelector("#darkmodefull").checked) {
        document.querySelector("body").setAttribute("class","darkmode");
        document.cookie = "darkmode = enabled;" + expires + ";path=/";
    } else {
        document.querySelector("body").setAttribute("class","lightmode");
        document.cookie = "darkmode = disabled;" + expires + ";path=/";
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}