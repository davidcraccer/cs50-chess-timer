
let selectedColor = null
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("palette-btn").addEventListener("click", () =>{
        document.querySelector(".color-theme").classList.remove("hidden")
    })
    document.getElementById("save-color").addEventListener("click", () =>{
        document.querySelector(".color-theme").classList.add("hidden")
        const radioButtons = document.getElementsByName("radioNoLabel")
        for (let radioButton of radioButtons){
            if (radioButton.checked){
                console.log(radioButton.value)
                break
            }
        }
    })
})

export function getSelectedColor(){
    return selectedColor;
}
