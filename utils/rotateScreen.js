function applyVerticalStyles() {
  // Create a link element for the CSS file
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "vertical.css";

  // Add the link element to the head of the HTML document
  document.head.appendChild(link);
}

function removeVerticalStyles() {
  // Remove the link element if it exists
  var existingLink = document.querySelector("link[href='vertical.css']");
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

export {
  applyHorizontalStyles,
  applyVerticalStyles,
  removeHorizontalStyles,
  removeVerticalStyles,
};
