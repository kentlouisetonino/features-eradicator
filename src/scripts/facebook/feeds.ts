const facebookFeedsClass = ".x1hc1fzr.x1unhpq9.x6o7n8i";
let facebookFeedsHidden: boolean = true;
let facebookFeedsInitialLoad: boolean = true;

function hideFacebookFeeds(): void {
  // Get the class of the stories from facebook.
  const stories = document.querySelectorAll(facebookFeedsClass);

  stories.forEach((story) => {
    (story as HTMLElement).style.visibility = "hidden";
  });
}

function showFacebookFeeds(): void {
  const stories = document.querySelectorAll(facebookFeedsClass);

  stories.forEach((story) => {
    (story as HTMLElement).style.visibility = "visible";
  });
}

function updateFacebookFeedsButtonText(): void {
  const button = document.getElementById("facebook-feeds-button");

  if (button) {
    button.innerText = facebookFeedsHidden
      ? "Facebook | Show Feeds"
      : "Facebook | Hide Feeds";
  }
}

function toggleFacebookFeedsVisibility(): void {
  // Reverse the current state.
  // If true, set to false.
  // If false, set to true.
  facebookFeedsHidden = !facebookFeedsHidden;

  // Execute the script to hide/show stories in the active tab..
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id ?? 0 },
      func: facebookFeedsHidden ? hideFacebookFeeds : showFacebookFeeds,
    });
  });

  // Update the button text.
  updateFacebookFeedsButtonText();
}

document.addEventListener("DOMContentLoaded", () => {
  // Update button text based on the default state.
  updateFacebookFeedsButtonText();

  // Add click event listener to the button.
  const button = document.getElementById("facebook-feeds-button");

  if (button) {
    button.addEventListener("click", toggleFacebookFeedsVisibility);
  }
});

if (facebookFeedsInitialLoad) {
  hideFacebookFeeds();
  facebookFeedsInitialLoad = false;
}
