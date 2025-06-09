document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const navigations = document.getElementById("navigations");
  console.log(navigations);

  let isClicked = false;

  // Toggle on click
  menuIcon.addEventListener("click", () => {
    isClicked = !isClicked;
    dropdownMenu.classList.toggle("show", isClicked);
  });

  document.addEventListener("click", (e) => {
    const isClickInside =
      menuIcon.contains(e.target) || dropdownMenu.contains(e.target);
    if (!isClickInside) {
      dropdownMenu.classList.remove("show");
      isClicked = false;
    }
  });

  const stickyOffset = 100;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= stickyOffset) {
      navigations.classList.add("sticky-nav");
    } else {
      navigations.classList.remove("sticky-nav");
    }
  });
});
