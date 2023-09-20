// Get references to various HTML elements using their IDs and classes.
import Clock from "/data/Clock.js"
import initializeTimer from "./buttons/initializeTimerBtns.js"
import hidePlayersSettings from "./utils/hidePlayerSetting.js"
import { addPlayingEventListener } from "./utils/playerClickHandlers.js"
import  { validateAndReplaceNaN } from "./utils/inputValidator.js"
import { presets } from "/data/presets.js"
const getQS = (id) => document.querySelector(id)
const clickSound = getQS("#click-sound")

// Initialize Clocks
const secondClock = getQS("#clock2")
let clock2 = new Clock(0, 0, 0, secondClock)
const firstClock = getQS("#clock")
let clock1 = new Clock(0, 0, 0, firstClock)

// Initialize presets
if (!localStorage.getItem("customTimes")) {
  // Saving presets in local storage
  localStorage.setItem("customTimes", JSON.stringify(presets))
}
if (!localStorage.getItem("playTime")) {
  // Creating an object with the desired properties
  const playTimeObject = {
    label: "10 min",
    time: "10 min",
    hours: 0,
    minutes: 10,
    second: 0,
    incrementH: 0,
    incrementM: 0,
    incrementS: 0
  };

  // Serializing the object to JSON and saving it in localStorage
  localStorage.setItem("playTime", JSON.stringify(playTimeObject));
}

// pseudo code
/**
 * display the time from localstorage
 * put these values into input
 * 
 * 2 players
 * when they set different inputs, update 2 local stoargaes
 * if there isnt a second localstorage then use the first one
 * 
 * use local storage first then use the inputs (in case they chnaged the input values)
 */

let isGameOn = false

let firstPlayerTurn = true
let moveCounter1 = 0
let moveCounter2 = 0


// Retrieve selected color
let selectedColor = localStorage.getItem("selectedColor") ? localStorage.getItem("selectedColor") : "#7FA44F"

// Execute code when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  // Add click event listeners to game fields"
  addPlayingEventListener()
  initializeTimer(
    clock1,
    "cancel",
    "save",
    ".adjust-time",
    "hours",
    "minutes",
    "seconds"
  )
  initializeTimer(
    clock2,
    "cancel2",
    "save2",
    ".adjust-time2",
    "hours2",
    "minutes2",
    "seconds2"
  )
})

// Start game
getQS("#play-btn").addEventListener("click", (e) => {
  firstTapClickHandler(e)
})

// First player field
function firstTapClickHandler(e) {
  e.stopPropagation()
  if (e.target.parentElement.id !== "change-time") {
    isGameOn = true
    clickSound.play()

    // Change the color of the field
    getQS(".second-tapping-field").style.backgroundColor = selectedColor
    secondClock.style.color = "white"
    firstClock.style.color = "#323232"
    getQS(".first-tapping-field").style.backgroundColor = ""

    // Stops the incrementation of the first field tapped
    if (!firstPlayerTurn) {
      moveCounter1++
    } else {
      firstPlayerTurn = !firstPlayerTurn
    }

    // initializes second clock
    if (moveCounter1 + moveCounter2 < 2) {
      const hoursInput2 = parseInt(getQS("#hours2").value, 10)
      let minutesInput2 = parseInt(getQS("#minutes2").value, 10)
      const secondsInput2 = parseInt(getQS("#seconds2").value, 10)

      if (hoursInput2 === 0 && minutesInput2 === 0 && secondsInput2 === 0) {
        minutesInput2 = 10
      }

      clock2.setClock(hoursInput2, minutesInput2, secondsInput2)
      hidePlayersSettings()

      getQS("#play-btn").disabled = true
    }

    // Increments the Move Counter
    getQS("#move-counter-1").textContent = moveCounter1

    // Add the click second event and removes the first click event
    getQS(".first-tapping-field").removeEventListener(
      "click",
      firstTapClickHandler
    )
    getQS(".second-tapping-field").addEventListener(
      "click",
      secondTapClickHandler
    )

    clock1.stop()
    clock2.start()
  }
}

// Second player field"
function secondTapClickHandler(e) {
  e.stopPropagation()
  if (e.target.parentElement.id !== "sec-change-time") {
    isGameOn = true
    clickSound.play()

    // update the field
    getQS(".first-tapping-field").style.backgroundColor = selectedColor
    firstClock.style.color = "white"
    secondClock.style.color = "#323232"
    getQS(".second-tapping-field").style.backgroundColor = ""

    // Stops the incrementation of the first tapped
    if (!firstPlayerTurn) {
      moveCounter2++
    } else {
      firstPlayerTurn = !firstPlayerTurn
    }

    // initializes the first clock
    if (moveCounter1 + moveCounter2 < 2) {
      const hoursInput = parseInt(getQS("#hours").value, 10)
      let minutesInput = parseInt(getQS("#minutes").value, 10)
      const secondsInput = parseInt(getQS("#seconds").value, 10)

      if (hoursInput === 0 && minutesInput === 0 && secondsInput === 0) {
        minutesInput = 10
      }

      getQS("#play-btn").disabled = true

      clock1.setClock(hoursInput, minutesInput, secondsInput)
      hidePlayersSettings()
    }

    // Increments the Move Counter
    getQS("#move-counter-2").textContent = moveCounter2

    // Add the click first event and removes the second event
    getQS(".second-tapping-field").removeEventListener(
      "click",
      secondTapClickHandler
    )
    getQS(".first-tapping-field").addEventListener(
      "click",
      firstTapClickHandler
    )

    clock2.stop()
    clock1.start()
  }
}

export { firstTapClickHandler, secondTapClickHandler }

////////////////////////////////////////////////////////////////////////
/** Volume */
import { toggleVolume } from "./components/volumeControl.js"
import { openTimerSetting } from "./components/timerSettings.js"

// Volume control
const volumeBtn = getQS("#volume-btn")
volumeBtn.addEventListener("click", toggleVolume)

// Player Timer Setting
const timerSettingBtn = getQS("#change-time")
const timerSettingBtn2 = getQS("#sec-change-time")

timerSettingBtn.addEventListener("click", () => {
  openTimerSetting(".adjust-time")
})

timerSettingBtn2.addEventListener("click", () => {
  openTimerSetting(".adjust-time2")
})



// Get references to the input elements
const hoursInput = document.getElementById('hours')
const minutesInput = document.getElementById('minutes')
const secondsInput = document.getElementById('seconds')

// Add event listeners to validate input
hoursInput.addEventListener('input', validateAndReplaceNaN)
minutesInput.addEventListener('input', validateAndReplaceNaN)
secondsInput.addEventListener('input', validateAndReplaceNaN)


function applyRotateStyles() {
  // Create a link element for the CSS file
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "rotate.css";

  // Add the link element to the head of the HTML document
  document.head.appendChild(link);

}

function removeRotateStyles() {
  // Remove the link element if it exists
  var existingLink = document.querySelector("link[href='rotate.css']");
  if (existingLink) {
    existingLink.parentNode.removeChild(existingLink);
  }
}

function applyHorizontalStyles() {
  // Create a link element for the CSS file
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "horizontal.css"; 

  // Add the link element to the head of the HTML document
  document.head.appendChild(link);
}

function removeHorizontalStyles() {
  // Remove the link element if it exists
  var existingLink = document.querySelector("link[href='horizontal.css']");
  if (existingLink) {
    existingLink.parentNode.removeChild(existingLink);
  }
}

// Check the initial orientation and apply styles accordingly
if (window.innerWidth > window.innerHeight) {
  // Initial orientation is horizontal
  applyHorizontalStyles();
  removeRotateStyles();
} else {
  // Initial orientation is vertical
  applyRotateStyles();
  removeHorizontalStyles();

}

// Listen for orientation change events
window.addEventListener("resize", function () {
  if (window.innerWidth > window.innerHeight) {
    // Device is in a horizontal orientation
    applyHorizontalStyles();
    removeRotateStyles();
  } else {
    // Device is in a vertical orientation
    applyRotateStyles();
    removeHorizontalStyles();
  }
})

