// Get references to various HTML elements using their IDs and classes.
import Clock from "/data/Clock.js";
import getQS from "./helpers/getQS.js";
import initializeTimer from "./buttons/initializeTimerBtns.js";
import initializeClock from "./utils/initializeClock.js";
import initializeLocalStorage from "./utils/initializeLocalStorage.js";
import { addPlayingEventListener } from "./utils/playerClickHandlers.js";
import { validateAndReplaceNaN } from "./utils/inputValidator.js";
import {
  applyHorizontalStyles,
  applyVerticalStyles,
  removeHorizontalStyles,
  removeVerticalStyles,
} from "./utils/rotateScreen.js";
import updateFieldColor from "./utils/updateFieldColor.js";
import {
  moveCounterIncrementation
} from "./states/moveCounterIncrementation.js";

const clickSound = getQS("#click-sound");

// localStorage.clear();

// Initialize Clocks
const firstClock = getQS("#clock");
const secondClock = getQS("#clock2");
let clock1 = new Clock(0, 0, 0, firstClock);
let clock2 = new Clock(0, 0, 0, secondClock);

initializeLocalStorage();

const playTime = JSON.parse(localStorage.getItem("playTime"));
const hours = parseInt(playTime.hours);
const minutes = parseInt(playTime.minutes);
const seconds = parseInt(playTime.seconds);
const incrementH = parseInt(playTime.incrementH);
const incrementM = parseInt(playTime.incrementM);
const incrementS = parseInt(playTime.incrementS);
const label = playTime.label;

// Setting time mode as preset label
document.querySelectorAll(".time-mode").forEach((mode) => {
  mode.textContent = label;
  clock1.updateClock(hours, minutes, seconds);
  clock2.updateClock(hours, minutes, seconds);
});

// Retrieve selected color
let selectedColor = localStorage.getItem("selectedColor")
  ? localStorage.getItem("selectedColor")
  : "#7FA44F";

// Execute code when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  // Add click event listeners to game fields"
  addPlayingEventListener();
  initializeTimer(
    clock1,
    "cancel",
    "save",
    ".adjust-time",
    "hours",
    "minutes",
    "seconds"
  );
  initializeTimer(
    clock2,
    "cancel2",
    "save2",
    ".adjust-time2",
    "hours2",
    "minutes2",
    "seconds2"
  );
});

// Start game
getQS("#play-btn").addEventListener("click", (e) => {
  firstTapClickHandler(e);
});

const firstTappingField = getQS(".first-tapping-field");
const secondTappingField = getQS(".second-tapping-field");

// First player field
function firstTapClickHandler(e) {
  e.stopPropagation();
  if (e.target.parentElement.id !== "change-time") {
    clickSound.play();

    // Change the color of the field
    updateFieldColor(
      secondClock,
      firstClock,
      secondTappingField,
      firstTappingField,
      selectedColor
    );

    // Stops the incrementation of the first field tapped
    const totalMoves = moveCounterIncrementation(true);

    // initializes second clock
    if (totalMoves < 2) {
      initializeClock(clock2, "hours2", "minutes2", "seconds2");
      getQS("#play-btn").disabled = true;
    } else {
      clock1.increment(incrementH, incrementM, incrementS);
    }

    // Add the click second event and removes the first click event
    firstTappingField.removeEventListener("click", firstTapClickHandler);
    secondTappingField.addEventListener("click", secondTapClickHandler);

    clock1.stop();
    clock2.start();
  }
}

// Second player field"
function secondTapClickHandler(e) {
  e.stopPropagation();
  if (e.target.parentElement.id !== "sec-change-time") {
    clickSound.play();

    // Change the color of the field
    updateFieldColor(
      firstClock,
      secondClock,
      firstTappingField,
      secondTappingField,
      selectedColor
    );

    // Stops the incrementation of the first tapped
    const totalMoves = moveCounterIncrementation(false);

    // initializes the first clock
    if (totalMoves < 2) {
      initializeClock(clock1, "hours", "minutes", "seconds");
      getQS("#play-btn").disabled = true;
    } else {
      clock2.increment(incrementH, incrementM, incrementS);
    }

    // Add the click first event and removes the second event
    secondTappingField.removeEventListener("click", secondTapClickHandler);
    firstTappingField.addEventListener("click", firstTapClickHandler);

    clock2.stop();
    clock1.start();
  }
}

export { firstTapClickHandler, secondTapClickHandler };

////////////////////////////////////////////////////////////////////////
/** Volume */
import { toggleVolume } from "./components/volumeControl.js";
import { openTimerSetting } from "./components/timerSettings.js";

// Volume control
const volumeBtn = getQS("#volume-btn");
volumeBtn.addEventListener("click", toggleVolume);

// Player Timer Setting
const timerSettingBtn = getQS("#change-time");
const timerSettingBtn2 = getQS("#sec-change-time");

timerSettingBtn.addEventListener("click", () => {
  openTimerSetting(".adjust-time");
});

timerSettingBtn2.addEventListener("click", () => {
  openTimerSetting(".adjust-time2");
});

// Get references to the input elements
const hoursInput = getQS("#hours");
const minutesInput = getQS("#minutes");
const secondsInput = getQS("#seconds");
const hoursInput2 = getQS("#hours2");
const minutesInput2 = getQS("#minutes2");
const secondsInput2 = getQS("#seconds2");

// Add event listeners to validate input
hoursInput.addEventListener("input", validateAndReplaceNaN);
minutesInput.addEventListener("input", validateAndReplaceNaN);
secondsInput.addEventListener("input", validateAndReplaceNaN);
hoursInput2.addEventListener("input", validateAndReplaceNaN);
minutesInput2.addEventListener("input", validateAndReplaceNaN);
secondsInput2.addEventListener("input", validateAndReplaceNaN);

// Check the initial orientation and apply styles accordingly
if (window.innerWidth > window.innerHeight) {
  // Initial orientation is horizontal
  applyHorizontalStyles();
  removeVerticalStyles();
} else {
  // Initial orientation is vertical
  applyVerticalStyles();
  removeHorizontalStyles();
}

// Listen for orientation change events
window.addEventListener("resize", function () {
  if (window.innerWidth > window.innerHeight) {
    // Device is in a horizontal orientation
    applyHorizontalStyles();
    removeVerticalStyles();
  } else {
    // Device is in a vertical orientation
    applyVerticalStyles();
    removeHorizontalStyles();
  }
});
