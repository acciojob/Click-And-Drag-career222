// Get the container and all items
const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Make every item draggable
items.forEach((item) => {
  item.addEventListener("mousedown", function (e) {
    selectedItem = item;

    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Remember where inside the item the mouse was clicked
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    // Change item from grid position to absolute position
    item.style.position = "absolute";

    item.style.left =
      itemRect.left - containerRect.left + "px";

    item.style.top =
      itemRect.top - containerRect.top + "px";

    item.style.cursor = "grabbing";
    item.style.zIndex = "1000";

    container.classList.add("active");

    e.preventDefault();
  });
});

// Move selected item
document.addEventListener("mousemove", function (e) {
  if (!selectedItem) return;

  const containerRect = container.getBoundingClientRect();

  let newLeft =
    e.clientX - containerRect.left - offsetX;

  let newTop =
    e.clientY - containerRect.top - offsetY;

  // Keep item inside container
  const maxLeft =
    container.clientWidth - selectedItem.offsetWidth;

  const maxTop =
    container.clientHeight - selectedItem.offsetHeight;

  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  newTop = Math.max(0, Math.min(newTop, maxTop));

  selectedItem.style.left = newLeft + "px";
  selectedItem.style.top = newTop + "px";
});

// Drop item
document.addEventListener("mouseup", function () {
  if (selectedItem) {
    selectedItem.style.cursor = "grab";
    selectedItem.style.zIndex = "";
  }

  selectedItem = null;
  container.classList.remove("active");
});