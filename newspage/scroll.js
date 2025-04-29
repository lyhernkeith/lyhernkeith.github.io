const container = document.getElementById("scrollContainer");
const sections = document.querySelectorAll(".section");

container.addEventListener("scroll", () => {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.left > window.innerWidth || rect.right < 0) {
      section.querySelector("img").classList.add("hidden");
    } else {
      section.querySelector("img").classList.remove("hidden");
    }
  });
});

// Trigger scroll event on load to initialize states
window.addEventListener("load", () => {
  container.dispatchEvent(new Event("scroll"));
});
