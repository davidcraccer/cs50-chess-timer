// Get references to various HTML elements using their IDs and classes.
import Clock from "/Clock.js";
import { getSelectedColor } from "/timecontrol.js";

const selectedColor = getSelectedColor();
const timerSetting = document.querySelector(".adjust-time");
const timerSetting2 = document.querySelector(".adjust-time2");
const timerSettingBtn = document.getElementById("change-time");
const timerSettingBtn2 = document.getElementById("sec-change-time");
const buttons = document.querySelectorAll("button");
// Anchor tags cant be disabled with disabled = true
const anchors = document.querySelectorAll("a");
const clickSound = document.getElementById("click-sound");

// Clocks setted with the default values
const secondClock = document.getElementById("clock2");
let clock2 = new Clock(0, 10, 0, secondClock);
const firstClock = document.getElementById("clock");
let clock1 = new Clock(0, 10, 0, firstClock);

/**
 * READ MEEEEEEEE
 * 
 * TODO: store color in localStorage
 * store the color in local storage in timecontrol.js
 * retrieve the color from localStorage here in index.js
 * if the theres no value / cant retrieve then return a default value
 * {"color": "black"} || {"r": 0, "g": 0, "b": 0}
 * 
 * how to do this in timecontrol.js:
 * if theres nothing in localstorage then u CREATE it (a new json)
 * if theres something in localstorage then u SET it
 * 
 * delete everything u imported here in index.js and retrieve the color from localStorage
 * if theres nothing then give default color here
 * 
 */

let isGameOn = false;
let disableGame = false;

let firstPlayerTurn = true;
let moveCounter1 = 0;
let moveCounter2 = 0;

// Execute code when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  // Add click event listeners to game fields"
  addPlayingEventListener();
  initializeTimerEvents(
    clock1,
    "cancel",
    "save",
    timerSetting,
    "hours",
    "minutes",
    "seconds"
  );
  initializeTimerEvents(
    clock2,
    "cancel2",
    "save2",
    timerSetting2,
    "hours2",
    "minutes2",
    "seconds2"
  );
});

function initializeTimerEvents(
  clock,
  cancel,
  save,
  timerSetting,
  hours,
  minutes,
  seconds
) {
  const cancelBtn = document.getElementById(cancel);
  const saveBtn = document.getElementById(save);

  function resetTimerSetting() {
    timerSetting.classList.add("hidden");
    document.body.style.backgroundColor = "";
    disableGame = false;
    addPlayingEventListener();
    toggleAnchors();
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }

  function saveTimerSetting() {
    const hoursInput = parseInt(document.getElementById(hours).value, 10);
    let minutesInput = parseInt(document.getElementById(minutes).value, 10);
    const secondsInput = parseInt(document.getElementById(seconds).value, 10);

    resetTimerSetting();

    // Default values to 10:00 if user types 0 0 0 in
    if (hoursInput == 0 && minutesInput == 0 && secondsInput == 0) {
      minutesInput = 10;
    }
    
    clock.updateClock(hoursInput, minutesInput, secondsInput);
  }

  // Add event listeners
  cancelBtn.addEventListener("click", resetTimerSetting);
  saveBtn.addEventListener("click", saveTimerSetting);
}

const volumeBtn = document.getElementById("volume-btn");
const spanVolumeOn = document.getElementById("volume-on");
const spanVolumeOff = document.getElementById("volume-off");
// Track sound state
let isVolumeOn = true;

// Function to toggle volume on and off
function toggleVolume() {
  clickSound.volume = isVolumeOn ? 0 : 1;
  isVolumeOn = !isVolumeOn;
  spanVolumeOn.hidden = !isVolumeOn;
  spanVolumeOff.hidden = isVolumeOn;
}

// Toggle the volume icon and volume control
volumeBtn.addEventListener("click", toggleVolume);

// Start game
document.getElementById("play-btn").addEventListener("click", (e) => {
  firstTapClickHandler(e);
});

function startGame() {}

// First player field"
function firstTapClickHandler(e) {
  e.stopPropagation();
  if (e.target.parentElement.id !== "change-time") {
    isGameOn = true;
    //clickSound.play();

    // Change the color of the field
    document.querySelector(".second-tapping-field").style.backgroundColor =
      selectedColor;
    secondClock.style.color = "white";
    firstClock.style.color = "#323232";
    document.querySelector(".first-tapping-field").style.backgroundColor = "";

    // Stops the incrementation of the first field tapped
    if (!firstPlayerTurn) {
      moveCounter1++;
    } else {
      firstPlayerTurn = !firstPlayerTurn
    }

    // initializes second clock
    if (moveCounter1 + moveCounter2 < 2) {
      const hoursInput2 = parseInt(document.getElementById("hours2").value, 10);
      let minutesInput2 = parseInt(
        document.getElementById("minutes2").value,
        10
      );
      const secondsInput2 = parseInt(
        document.getElementById("seconds2").value,
        10
      );

      if (hoursInput2 === 0 && minutesInput2 === 0 && secondsInput2 === 0) {
        minutesInput2 = 10;
      }

      clock2.setClock(hoursInput2, minutesInput2, secondsInput2);
      hidePlayersSettings();

      document.querySelector("#play-btn").disabled = true;
    }

    // Increments the Move Counter
    document.getElementById("move-counter-1").textContent = moveCounter1;

    // Add the click second event and removes the first click event
    document
      .querySelector(".first-tapping-field")
      .removeEventListener("click", firstTapClickHandler);
    document
      .querySelector(".second-tapping-field")
      .addEventListener("click", secondTapClickHandler);

    clock1.stop();
    clock2.start();
  }
}

// Second player field"
function secondTapClickHandler(e) {
  e.stopPropagation();
  if (e.target.parentElement.id !== "sec-change-time" ) {
    isGameOn = true;
    //clickSound.play();

    // update the field
    document.querySelector(".first-tapping-field").style.backgroundColor =
      selectedColor;
    firstClock.style.color = "white";
    secondClock.style.color = "#323232";
    document.querySelector(".second-tapping-field").style.backgroundColor = "";

    // Stops the incrementation of the first tapped
    if (!firstPlayerTurn) {
      moveCounter2++;
    } else {
      firstPlayerTurn = !firstPlayerTurn
    }

    // initializes the first clock
    if (moveCounter1 + moveCounter2 < 2) {
      const hoursInput = parseInt(document.getElementById("hours").value, 10);
      let minutesInput = parseInt(document.getElementById("minutes").value, 10);
      const secondsInput = parseInt(
        document.getElementById("seconds").value,
        10
      );

      if (hoursInput === 0 && minutesInput === 0 && secondsInput === 0) {
        minutesInput = 10;
      }

      document.querySelector("#play-btn").disabled = true;

      clock1.setClock(hoursInput, minutesInput, secondsInput);
      hidePlayersSettings();
    }

    // Increments the Move Counter
    document.getElementById("move-counter-2").textContent = moveCounter2;

    // Add the click first event and removes the second event
    document
      .querySelector(".second-tapping-field")
      .removeEventListener("click", secondTapClickHandler);
    document
      .querySelector(".first-tapping-field")
      .addEventListener("click", firstTapClickHandler);

    clock2.stop();
    clock1.start();
  }
}

function hidePlayersSettings() {
  // Hide elements with class "hide."
  document.querySelectorAll(".hide").forEach((element) => {
    element.classList.add("hidden");
  });
}

// Add a click event listener to Player Timer Setting.
function openTimerSetting(timerSettingElement) {
  timerSettingElement.classList.remove("hidden");
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  disableGame = true;
  buttons.forEach((button) => {
    if (!button.parentElement.classList.contains("papa")) {
      button.disabled = true;
    }
  });
  toggleAnchors();
  removePlayingEventListener();
}

timerSettingBtn.addEventListener("click", () => {
  openTimerSetting(timerSetting);
});

timerSettingBtn2.addEventListener("click", () => {
  openTimerSetting(timerSetting2);
});

// Function to disable or enable anchor tags based on the value of disableGame
function toggleAnchors() {
  anchors.forEach((anchor) => {
    if (disableGame) {
      anchor.addEventListener("click", preventDefaultHandler);
    } else {
      anchor.removeEventListener("click", preventDefaultHandler);
    }
  });
}

function preventDefaultHandler(event) {
  event.preventDefault();
}


// Add click to fields
function addPlayingEventListener() {
  document
    .querySelector(".first-tapping-field")
    .addEventListener("click", firstTapClickHandler);
  document
    .querySelector(".second-tapping-field")
    .addEventListener("click", secondTapClickHandler);
}

// remove click from fields
function removePlayingEventListener() {
  document
    .querySelector(".first-tapping-field")
    .removeEventListener("click", firstTapClickHandler);
  document
    .querySelector(".second-tapping-field")
    .removeEventListener("click", secondTapClickHandler);
}
