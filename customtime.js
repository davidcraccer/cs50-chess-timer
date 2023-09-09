/*
? not sure why i need to repeat what i have already done. 
? maybe because 2 html files cant have same js file when talking 
? about custom css variables
*/ 

let selectedColor = localStorage.getItem("selectedColor")
let customTimes = JSON.parse(localStorage.getItem("customTimes")) || []

const r = parseInt(selectedColor.slice(1, 3), 16)
const g = parseInt(selectedColor.slice(3, 5), 16)
const b = parseInt(selectedColor.slice(5, 7), 16)

// Calculate the darker color components (20% darker)
const darkerR = Math.round(r * 0.8)
const darkerG = Math.round(g * 0.8)
const darkerB = Math.round(b * 0.8)
const selectedColorDarker = `rgba(${darkerR}, ${darkerG}, ${darkerB}, 0.8)`
    
// Set the custom CSS variable with the value of 'selectedColor' 
document.documentElement.style.setProperty('--selectedColorDarker2', selectedColorDarker)
document.documentElement.style.setProperty("--selectedColor2", selectedColor)

// Save a Custom time  
document.getElementById("save-custom-time").addEventListener("click", e => {
    const customHours = document.getElementById("custom-hours").value
    const customMinutes = document.getElementById("custom-minutes").value
    const customSeconds = document.getElementById("custom-seconds").value
    
    const incrementHours = document.getElementById("increment-hours").value
    const incrementMinutes = document.getElementById("increment-minutes").value
    const incrementSeconds = document.getElementById("increment-seconds").value
    
    const customName = document.querySelector(".custom-time-name").value

    let newCustomTime = ""
    if (customHours > 0) {
        newCustomTime += `${customHours} hour, `
    }
    
    if (customMinutes > 0) {
        newCustomTime += `${customMinutes} min, `
    }
    
    if (customSeconds > 0) {
        newCustomTime += `${customSeconds} sec, `
    }

    // Remove the trailing comma and space if they exist
    if (newCustomTime.endsWith(", ")) {
        newCustomTime = newCustomTime.slice(0, -2)
    }
    
    // Add a separator if there is an incrementation value
    if (incrementHours > 0 || incrementMinutes > 0 || incrementSeconds > 0) {
        newCustomTime += ' | '
    }

    if (incrementHours > 0) {
        newCustomTime += `${incrementHours} hour, `
    }
    
    if (incrementMinutes > 0) {
        newCustomTime += `${incrementMinutes} min, `
    }
    
    if (incrementSeconds > 0) {
        newCustomTime += `${incrementSeconds} sec`
    }
    
    // Remove the trailing comma and space if they exist
    if (newCustomTime.endsWith(", ")) {
        newCustomTime = newCustomTime.slice(0, -2)
    }
    
    // Storing lebel and time in an object
    const customTimeObject = {
        label: customName == "" ? newCustomTime : customName,
        time: newCustomTime
    }

    let customTimeAlreadyExists = false
    // Checking if custom time already exists
    for (let i = 0; i < customTimes.length; i++){
        if(customTimeObject.time == customTimes[i].time){
            customTimeAlreadyExists = true
            document.querySelector(".error").classList.remove("hidden")
            document.querySelector(".error2").classList.add("hidden")
            break
        }
    }

    let timeInputExists = true
    // Checking if a time input is given
    if (customHours == 0 && customMinutes == 0 &&  customSeconds == 0){
        timeInputExists = false
        document.querySelector(".error2").classList.remove("hidden")
        document.querySelector(".error").classList.add("hidden")
    }

    // Add custom time if it doesn't exist, prevent default if it does
    if (!customTimeAlreadyExists && timeInputExists){
        customTimes.push(customTimeObject)
        localStorage.setItem("customTimes", JSON.stringify(customTimes))
    } else {
        e.preventDefault()
    }
})