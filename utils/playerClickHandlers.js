// Add click to fields
import { firstTapClickHandler, secondTapClickHandler} from '../main js/index.js'

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

export { addPlayingEventListener, removePlayingEventListener }