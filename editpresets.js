//? Im repeating this too much gotta do smth about it 
let selectedColor = localStorage.getItem("selectedColor")
document.documentElement.style.setProperty("--selectedColor3", selectedColor)

document.getElementById("delete-btn").addEventListener("click", ()=>{
    console.log(selectedColor)
})