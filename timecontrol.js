document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("palette-btn").addEventListener("click", () =>{
        document.querySelector(".color-theme").classList.remove("hidden")
    })

    document.getElementById("save-color").addEventListener("click", () =>{
        document.querySelector(".color-theme").classList.add("hidden")
        const radioButtons = document.getElementsByName("radioNoLabel")
        for (let radioButton of radioButtons){
            if (radioButton.checked){
                localStorage.setItem("selectedColor", radioButton.value)
                break
            }
        }
        window.location.reload()
    })

    let selectedColor = localStorage.getItem("selectedColor")

    // Check if selectedColor is null and set it to the default color if it is
    if (selectedColor == null) {
        selectedColor = "#7FA44F"
        localStorage.setItem("selectedColor", selectedColor)
    } 
    // Parse the hex color value into RGB components
    const r = parseInt(selectedColor.slice(1, 3), 16)
    const g = parseInt(selectedColor.slice(3, 5), 16)
    const b = parseInt(selectedColor.slice(5, 7), 16)

    // Calculate the darker color components (20% darker)
    const darkerR = Math.round(r * 0.8)
    const darkerG = Math.round(g * 0.8)
    const darkerB = Math.round(b * 0.8)
    const selectedColorDarker = `rgba(${darkerR}, ${darkerG}, ${darkerB}, 0.8)`
    
    // Set the custom CSS variable with the value of 'selectedColor' 
    document.documentElement.style.setProperty('--selectedColor', selectedColor)
    document.documentElement.style.setProperty('--selectedColorDarker', selectedColorDarker)
})
