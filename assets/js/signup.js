document.addEventListener("DOMContentLoaded", () => {
    let datepicker = document.querySelectorAll(".datepicker");
    let instances = M.Datepicker.Init(datepicker);
})

$("document").ready(() => {
    $(".datepicker").datepicker();
})