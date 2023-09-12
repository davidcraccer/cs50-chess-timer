import getQS from "../helpers/getQS.js"

let selectedColor = localStorage.getItem("selectedColor")
let customTimes = JSON.parse(localStorage.getItem("customTimes")) || []

document.documentElement.style.setProperty("--selectedColor3", selectedColor)

// Feed all times in form-check
for (let customtime of customTimes){
    getQS(".form-check").innerHTML += `
        <div class="presets-box">
            <div class="presets-childs">
                <input type="checkbox" value="" id="${customtime.time}" name="radio-group" class="preset-check form-check-input">
                <label class="check-label" for="${customtime.time}">${customtime.label}</label><br>
            </div>
            <div class="presets-childs">
                <span class="material-symbols-outlined">
                    edit
                </span>
                <span class="material-symbols-outlined">
                    drag_handle
                </span>
            </div>
        </div>
    `
}

// Delete a selected time from localstorage
document.getElementById("delete-btn").addEventListener("click", ()=>{
    document.querySelectorAll(".form-check-input").forEach(input => {
        if (input.checked){
            customTimes.forEach((customtime, index) =>{
                if (customtime.time == input.id){
                    customTimes.splice(index, 1)
                }
            })
        }
    })
    localStorage.setItem("customTimes", JSON.stringify(customTimes))
    window.location.reload()
})