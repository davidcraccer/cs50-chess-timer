// Add click to fields
import getQS from "../helpers/getQS.js";
import { firstTapClickHandler, secondTapClickHandler } from "../index.js";

function addPlayingEventListener() {
  getQS(".first-tapping-field").addEventListener("click", firstTapClickHandler);
  getQS(".second-tapping-field").addEventListener(
    "click",
    secondTapClickHandler
  );
}

// remove click from fields
function removePlayingEventListener() {
  getQS(".first-tapping-field").removeEventListener(
    "click",
    firstTapClickHandler
  );
  getQS(".second-tapping-field").removeEventListener(
    "click",
    secondTapClickHandler
  );
}

export { addPlayingEventListener, removePlayingEventListener };
