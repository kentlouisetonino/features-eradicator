const linkedinFeedsClass = ".scaffold-layout__main";
let linkedinFeedsHidden: boolean = true;
let linkedinFeedsInitialLoad: boolean = true;

function isFeedPage() {
  return window.location.pathname == "/feed/";
}

function hideLinkedinFeeds(): void {
  // Get the class of the stories from facebook.
  const feeds = document.querySelectorAll(linkedinFeedsClass);

  feeds.forEach((feed) => {
    (feed as HTMLElement).style.visibility = "hidden";
  });
}

function showLinkedinFeeds(): void {
  const feeds = document.querySelectorAll(linkedinFeedsClass);

  feeds.forEach((feed) => {
    (feed as HTMLElement).style.visibility = "visible";
  });
}

function updateLinkedinFeedsButtonText(): void {
  const button = document.getElementById("linkedin-feeds-button");

  if (button) {
    button.innerText = linkedinFeedsHidden
      ? "Linkedin | Show Feeds"
      : "Linkedin | Hide Feeds";
  }
}

function toggleLinkedinFeedsVisibility(): void {
  // Reverse the current state.
  // If true, set to false.
  // If false, set to true.
  linkedinFeedsHidden = !linkedinFeedsHidden;

  // Execute the script to hide/show stories in the active tab..
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id ?? 0 },
      func: linkedinFeedsHidden ? hideLinkedinFeeds : showLinkedinFeeds,
    });
  });

  // Update the button text.
  updateLinkedinFeedsButtonText();
}

document.addEventListener("DOMContentLoaded", () => {
  // Update button text based on the default state.
  updateLinkedinFeedsButtonText();

  // Add click event listener to the button.
  const button = document.getElementById("linkedin-feeds-button");

  if (button) {
    button.addEventListener("click", toggleLinkedinFeedsVisibility);
  }
});

if (linkedinFeedsInitialLoad && isFeedPage()) {
  hideLinkedinFeeds();
  linkedinFeedsInitialLoad = false;
}

// MutationObserver to detect dynamic page changes
const observerLinkedinFeeds = new MutationObserver(() => {
  if (linkedinFeedsHidden && isFeedPage()) {
    hideLinkedinFeeds();
  }
});

// Start observing the body for child list changes.
// This will allow to make the page is consistent as you move across pages.
observerLinkedinFeeds.observe(document.body, {
  childList: true,
  subtree: true,
});
