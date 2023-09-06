class Clock {
  constructor(hours, minutes, seconds, clockElement) {
    this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
    this.clockElement = clockElement;
    this.timerInterval = null;
  }

  start() {
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        if (this.totalSeconds <= 0) {
          this.stop();
          console.log("Timer expired");
        } else {
          const hoursRemaining = Math.floor(this.totalSeconds / 3600);
          const minutesRemaining = Math.floor((this.totalSeconds % 3600) / 60);
          const secondsRemaining = this.totalSeconds % 60;

          // Update the clock display with the formatted time
          this.updateClock(hoursRemaining, minutesRemaining, secondsRemaining);

          this.totalSeconds--;
        }
      }, 1000);
    }
  }

  stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  setClock(hours, minutes, seconds) {
    this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
  }

  updateClock(hours, minutes, seconds) {
    let formattedTime;
    if (hours == 0 && minutes == 0) {
      formattedTime = `${String(seconds)}s`;
    } else if (hours == 0) {
      formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    } else {
      formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    this.clockElement.textContent = formattedTime;
  }
}
export default Clock;
