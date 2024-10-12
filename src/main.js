let storiesHidden = true; // Set default to true (stories hidden)

// Function to toggle stories visibility
function toggleStoriesVisibility() {
  storiesHidden = !storiesHidden; // Toggle the state

  // Execute the script to hide/show stories in the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: storiesHidden ? hideFacebookStories : showFacebookStories,
    });
  });

  // Update the button text
  updateButtonText();
}

// Function to hide Facebook stories
function hideFacebookStories() {
  const stories = document.querySelectorAll(".x193iq5w.xgmub6v.x1ceravr");
  stories.forEach((story) => {
    story.style.visibility = "hidden";
  });
}

// Function to show Facebook stories
function showFacebookStories() {
  const stories = document.querySelectorAll(".x193iq5w.xgmub6v.x1ceravr");
  stories.forEach((story) => {
    story.style.visibility = "visible";
  });
}

// Function to update button text based on the current state
function updateButtonText() {
  document.getElementById("toggleButton").innerText = storiesHidden
    ? "Facebook | Show Stories"
    : "Facebook | Hide Stories";
}

// Load the initial state when the popup opens
document.addEventListener("DOMContentLoaded", function () {
  updateButtonText(); // Update button text based on the default state

  // Add click event listener to the button
  document
    .getElementById("toggleButton")
    .addEventListener("click", toggleStoriesVisibility);
});
