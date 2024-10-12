const facebookStoriesClass = ".x193iq5w.xgmub6v.x1ceravr";
let facebookStoriesHidden: boolean = true;
let facebookStoriesInitialLoad: boolean = true;

function hideFacebookStories(): void {
  // Get the class of the stories from facebook.
  const stories = document.querySelectorAll(facebookStoriesClass);

  stories.forEach((story) => {
    (story as HTMLElement).style.visibility = "hidden";
  });
}

function showFacebookStories(): void {
  const stories = document.querySelectorAll(facebookStoriesClass);

  stories.forEach((story) => {
    (story as HTMLElement).style.visibility = "visible";
  });
}

function updateFacebookStoriesButtonText(): void {
  const button = document.getElementById("facebook-stories-button");
  if (button) {
    button.innerText = facebookStoriesHidden
      ? "Facebook | Show Stories"
      : "Facebook | Hide Stories";
  }
}

function toggleFacebookStoriesVisibility(): void {
  // Reverse the current state.
  // If true, set to false.
  // If false, set to true.
  facebookStoriesHidden = !facebookStoriesHidden;

  // Execute the script to hide/show stories in the active tab..
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id ?? 0 },
      func: facebookStoriesHidden ? hideFacebookStories : showFacebookStories,
    });
  });

  // Update the button text.
  updateFacebookStoriesButtonText();
}

document.addEventListener("DOMContentLoaded", () => {
  // Update button text based on the default state.
  updateFacebookStoriesButtonText();

  // Add click event listener to the button.
  const button = document.getElementById("facebook-stories-button");

  if (button) {
    button.addEventListener("click", toggleFacebookStoriesVisibility);
  }
});

if (facebookStoriesInitialLoad) {
  hideFacebookStories();
  facebookStoriesInitialLoad = false;
}
