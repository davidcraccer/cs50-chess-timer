
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("palette-btn").addEventListener("click", () =>{
        document.querySelector(".color-theme").classList.remove("hidden")
    })
    document.getElementById("save-color").addEventListener("click", () =>{
        document.querySelector(".color-theme").classList.add("hidden")
    })
})