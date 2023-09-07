// ? not sure why i need to create a new custom css variable. maybe because 2 html files cant have same js file
let selectedColor = localStorage.getItem("selectedColor")
document.documentElement.style.setProperty("--selectedColor2", selectedColor)