const firstTimer = document.getElementById("change-time");
const secondTimer = document.getElementById("sec-change-time");
const timePicker = document.querySelector(".adjust-time");
const timePicker2 = document.querySelector(".adjust-time2");
const buttons = document.querySelectorAll("button")


firstTimer.addEventListener("click", () => {
  timePicker.classList.remove("hidden")
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
  buttons.forEach(button => {
    if (button.parentElement.classList != "papa"){
        button.disabled = true;
    }
   })
});

secondTimer.addEventListener("click", () => {
  timePicker2.classList.remove("hidden")
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
   buttons.forEach(button => {
    if (button.parentElement.classList != "papa"){
        button.disabled = true;
    }
   })
});

document.addEventListener("DOMContentLoaded", function () {
  const hoursInput = document.getElementById("hours");
  const minutesInput = document.getElementById("minutes");
  const secondsInput = document.getElementById("seconds");
  const cancelBtn = document.getElementById("cancel");
  const saveBtn = document.getElementById("save");
  
  const hoursInput2 = document.getElementById("hours2");
  const minutesInput2 = document.getElementById("minutes2");
  const secondsInput2 = document.getElementById("seconds2");
  const cancelBtn2 = document.getElementById("cancel2");
  const saveBtn2 = document.getElementById("save2");

  cancelBtn.addEventListener("click", () => {
    timePicker.classList.add("hidden")
    document.body.style.backgroundColor = ""

    buttons.forEach(button => {
        button.disabled = false;
       })
  });
  saveBtn.addEventListener("click", () => {
    timePicker.classList.add("hidden")
    document.body.style.backgroundColor = ""

    buttons.forEach(button => {
        button.disabled = false;
       })
  });
  cancelBtn2.addEventListener("click", () => {
    timePicker2.classList.add("hidden")
    document.body.style.backgroundColor = ""

    buttons.forEach(button => {
        button.disabled = false;
       })
  });
  saveBtn2.addEventListener("click", () => {
    timePicker2.classList.add("hidden")
    document.body.style.backgroundColor = ""

    buttons.forEach(button => {
        button.disabled = false;
       })
  });


});

// david
const volumeBtn = document.getElementById("volume-btn");
const spanVolumeOn = document.getElementById("volume-on");
const spanVolumeOff = document.getElementById("volume-off");

volumeBtn.addEventListener("click", () => {
  spanVolumeOn.hidden = !spanVolumeOn.hidden;
  spanVolumeOff.hidden = !spanVolumeOff.hidden;
});
