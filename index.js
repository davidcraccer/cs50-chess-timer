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

// TODO: store color in localStorage
// TODO: Disable start button when played
// TODO: Make second player be able to start as well

let isGameOn = false;
let disableGame = false;

let firstPlayerTurn = true;
let moveCounter1 = 0;
let moveCounter2 = 0;
let startGameMoveCounter = 0;

// Execute code when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  // document.addEventListener("click", () => {
  //   if (disableGame == false) {
  //     isGameOn = true;
  //   }
  // });

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
  // Add event listeners for the "cancel" and "save" buttons for the first timer.
  cancelBtn.addEventListener("click", () => {
    timerSetting.classList.add("hidden");
    document.body.style.backgroundColor = "";
    disableGame = true;
    addPlayingEventListener();
    buttons.forEach((button) => {
      button.disabled = false;
    });
  });
  // Add a click event listener to the save button
  saveBtn.addEventListener("click", () => {
    // Retrieve user input for hours, minutes, and seconds.
    const hoursInput = parseInt(document.getElementById(hours).value, 10);
    const minutesInput = parseInt(document.getElementById(minutes).value, 10);
    const secondsInput = parseInt(document.getElementById(seconds).value, 10);

    timerSetting.classList.add("hidden");
    document.body.style.backgroundColor = "";
    disableGame = true;
    addPlayingEventListener();
    buttons.forEach((button) => {
      button.disabled = false;
    });

    // Update the timer with the provided input values
    clock.updateClock(hoursInput, minutesInput, secondsInput);
  });
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
  if (e.target.parentElement.id !== "change-time" && firstPlayerTurn) {
    isGameOn = true;
    //clickSound.play();

    // Change the color of the field
    document.querySelector(".second-tapping-field").style.backgroundColor =
      selectedColor;
    secondClock.style.color = "white";
    firstClock.style.color = "#323232";
    document.querySelector(".first-tapping-field").style.backgroundColor = "";

    firstPlayerTurn = !firstPlayerTurn;

    // Stops the incrementation of the first field tapped
    if (startGameMoveCounter >= 1) {
      moveCounter1++;
    }

    // initializes second clock
    if (startGameMoveCounter < 2) {
      startGameMoveCounter++;
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
    if (clock2.totalSeconds <= 0){
      clock2.lose("second-tapping-field")
    }
  }
}

// Second player field"
function secondTapClickHandler(e) {
  e.stopPropagation();
  if (e.target.parentElement.id !== "sec-change-time" && !firstPlayerTurn) {
    isGameOn = true;
    //clickSound.play();

    // update the field
    document.querySelector(".first-tapping-field").style.backgroundColor =
      selectedColor;
    firstClock.style.color = "white";
    secondClock.style.color = "#323232";
    document.querySelector(".second-tapping-field").style.backgroundColor = "";

    moveCounter2++;
    firstPlayerTurn = !firstPlayerTurn;

    // initializes the first clock
    if (startGameMoveCounter < 2) {
      startGameMoveCounter++;
      const hoursInput = parseInt(document.getElementById("hours").value, 10);
      let minutesInput = parseInt(document.getElementById("minutes").value, 10);
      const secondsInput = parseInt(
        document.getElementById("seconds").value,
        10
      );

      if (hoursInput === 0 && minutesInput === 0 && secondsInput === 0) {
        minutesInput = 10;
      }

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
    if (clock1.totalSeconds <= 0){
      clock1.lose("first-tapping-field")
    }
    clock1.start();
  }
}

function hidePlayersSettings() {
  // Hide elements with class "hide."
  document.querySelectorAll(".hide").forEach((element) => {
    element.classList.add("hidden");
  });
}

// Add a click event listener to the first timer button.
timerSettingBtn.addEventListener("click", () => {
  // Show the time setting and dim the background.
  timerSetting.classList.remove("hidden");
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  disableGame = true;
  // Disable buttons except those within an element with class "papa."
  // anchors.forEach((anchor) => {
  //   const grandparent = anchor.parentElement.parentElement;
  //   if (grandparent.classList.contains("papa")) {
  //     anchor.disabled = true;
  //   }
  // })
  buttons.forEach((button) => {
    if (!button.parentElement.classList.contains("papa")) {
      button.disabled = true;
    }
  });
  removePlayingEventListener();
});

// Add a click event listener to the second timer button (similar to the first timer).
timerSettingBtn2.addEventListener("click", () => {
  timerSetting2.classList.remove("hidden");
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  disableGame = true;
  // anchors.forEach((anchor) => {
  //   const grandparent = anchor.parentElement.parentElement;
  //   if (grandparent.classList.contains("papa")) {
  //     anchor.disabled = true;
  //   }
  // })
  buttons.forEach((button) => {
    if (!button.parentElement.classList.contains("papa")) {
      button.disabled = true;
    }
  });
  removePlayingEventListener();
});

function addPlayingEventListener() {
  document
    .querySelector(".first-tapping-field")
    .addEventListener("click", firstTapClickHandler);
  document
    .querySelector(".second-tapping-field")
    .addEventListener("click", secondTapClickHandler);
}

function removePlayingEventListener() {
  document
    .querySelector(".first-tapping-field")
    .removeEventListener("click", firstTapClickHandler);
  document
    .querySelector(".second-tapping-field")
    .removeEventListener("click", secondTapClickHandler);
}
