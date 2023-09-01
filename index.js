const firstTimer = document.getElementById("change-time")
const secondTimer = document.getElementById("sec-change-time")
const timePicker = document.querySelector(".adjust-time")
const timePicker2 = document.querySelector(".adjust-time2")
const buttons = document.querySelectorAll("button")


firstTimer.addEventListener("click", () => {
  timePicker.classList.remove("hidden")
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
  buttons.forEach(button => {
    if (button.parentElement.classList != "papa"){
        button.disabled = true;
    }
   })
})

secondTimer.addEventListener("click", () => {
  timePicker2.classList.remove("hidden")
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)"
   buttons.forEach(button => {
    if (button.parentElement.classList != "papa"){
        button.disabled = true;
    }
   })
})

document.addEventListener("DOMContentLoaded", function () {
  const cancelBtn = document.getElementById("cancel")
  const saveBtn = document.getElementById("save")
  const firstClock = document.getElementById("clock")
  let counter1 = 0
  let counter2 = 0

  document.querySelector(".first-tap").addEventListener("click", e => {
    if (e.target.parentElement.id != "change-time") {
      counter1++
      document.getElementById("counter1").textContent = counter1
      
      document.querySelectorAll(".hide").forEach(element => {
        element.classList.add("hidden")
      }) 
    }
  })
  
  document.querySelector(".second-tap").addEventListener("click", e => {
    if (e.target.parentElement.id != "sec-change-time") {
      counter2++
      document.getElementById("counter2").textContent = counter2
      
      document.querySelectorAll(".hide").forEach(element => {
        element.classList.add("hidden")
      })  
    }
  })

  cancelBtn.addEventListener("click", () => {
    timePicker.classList.add("hidden")
    document.body.style.backgroundColor = ""
    buttons.forEach(button => {
        button.disabled = false;
       })
  })
  saveBtn.addEventListener("click", () => {
    const hoursInput = document.getElementById("hours").value
    const minutesInput = document.getElementById("minutes").value
    const secondsInput = document.getElementById("seconds").value
    updateClock(firstClock, hoursInput, minutesInput, secondsInput)
    timePicker.classList.add("hidden")
    document.body.style.backgroundColor = ""
    buttons.forEach(button => {
        button.disabled = false;
       })
  })
  const cancelBtn2 = document.getElementById("cancel2")
  const saveBtn2 = document.getElementById("save2")
  const secondClock = document.getElementById("sec-clock")
  
  cancelBtn2.addEventListener("click", () => {
    timePicker2.classList.add("hidden")
    document.body.style.backgroundColor = ""
    buttons.forEach(button => {
        button.disabled = false;
       })
  })
  saveBtn2.addEventListener("click", () => {
    const hoursInput2 = document.getElementById("hours2").value
    const minutesInput2 = document.getElementById("minutes2").value
    const secondsInput2 = document.getElementById("seconds2").value
    updateClock(secondClock, hoursInput2, minutesInput2, secondsInput2)
    timePicker2.classList.add("hidden")
    document.body.style.backgroundColor = ""
    buttons.forEach(button => {
        button.disabled = false;
       })
  })
})

function updateClock(clockElement, hours, minutes, seconds) {
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  clockElement.textContent = formattedTime;
}

// david
const volumeBtn = document.getElementById("volume-btn");
const spanVolumeOn = document.getElementById("volume-on");
const spanVolumeOff = document.getElementById("volume-off");

volumeBtn.addEventListener("click", () => {
  spanVolumeOn.hidden = !spanVolumeOn.hidden;
  spanVolumeOff.hidden = !spanVolumeOff.hidden;
});
