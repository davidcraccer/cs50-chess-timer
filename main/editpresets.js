import getQS from "../helpers/getQS.js"

const selectedColor3 = localStorage.getItem("selectedColor")
const selectedColorDarker3 = localStorage.getItem("selectedColorDarker");

let customTimes = JSON.parse(localStorage.getItem("customTimes")) || []

// Set the custom CSS variable with the value of 'selectedColor'
document.documentElement.style.setProperty("--selectedColorDarker3", selectedColorDarker3);
document.documentElement.style.setProperty("--selectedColor3", selectedColor3)

 // Hide edit name pop-up
 getQS(".move-right-other").addEventListener("click", () => {
    getQS(".color-theme").classList.add("hidden")
  });

// Feed all times in form-check
for (let customtime of customTimes){
    getQS(".form-check").innerHTML += `
        <div class="presets-box" draggable= true>
            <div class="presets-childs">
                <input type="checkbox" value="" id="${customtime.time}" name="radio-group" class="preset-check form-check-input">
                <label class="check-label" for="${customtime.time}">${customtime.label}</label><br>
            </div>
            <div class="presets-childs">
                <span id="${customtime.time}" class="material-symbols-outlined edit">
                    edit
                </span>
                <span class="material-symbols-outlined">
                    drag_handle
                </span>
            </div>
        </div>
    `
}

let counter = 0
// Increment and decrement selected counter
let checkedCounter = getQS(".checked-counter")
document.querySelectorAll(".form-check-input").forEach(input => {
    input.addEventListener("change", () => {
        if (input.checked) {
            counter++
        } else {
            counter--
        }
        checkedCounter.textContent = counter
    })
})

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

document.querySelectorAll(".edit").forEach(editbtn => {
    editbtn.addEventListener("click", () => {
        // Show the modal
        const colorTheme = getQS(".color-theme");
        colorTheme.classList.remove("hidden");

        // Get the ID of the custom time being edited
        const customTimeId = editbtn.id;

        // Add an event listener to the "Save" button in the modal
        getQS("#save-color").addEventListener("click", () => {
            // Get the updated label from the input field
            const editNameInput = getQS(".edit-name");
            const updatedLabel = editNameInput.value;

            // Update the label in the customTimes array
            customTimes.forEach(customtime => {
                if (customtime.time == customTimeId) {
                    customtime.label = updatedLabel;
                }
            });

            // Store the updated customTimes array in localStorage
            localStorage.setItem("customTimes", JSON.stringify(customTimes));

            // Hide the modal and refresh the page
            colorTheme.classList.add("hidden");
            window.location.reload();
        });
    });
});



