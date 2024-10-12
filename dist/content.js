"use strict";
function hideFacebookStoriesUnique() {
    const stories = document.querySelectorAll(".x193iq5w.xgmub6v.x1ceravr");
    stories.forEach((story) => {
        story.style.visibility = "hidden"; // Hide stories
    });
}
// Execute the function when the content script runs
hideFacebookStoriesUnique();
