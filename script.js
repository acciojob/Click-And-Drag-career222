const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Select a cube
items.forEach((item) => {
  item.addEventListener("mousedown", function (e) {
    selectedItem = item;

    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Mouse position inside the cube
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    // Change grid item to freely movable item
    item.style.position = "absolute";

    item.style.left =
      itemRect.left - containerRect.left + "px";

    item.style.top =
      itemRect.top - containerRect.top + "px";

    item.style.zIndex = "1000";
    item.style.cursor = "grabbing";

    container.classList.add("active");

    e.preventDefault();
  });
});

// Drag the selected cube
document.addEventListener("mousemove", function (e) {
  if (!selectedItem) return;

  const containerRect = container.getBoundingClientRect();

  let left =
    e.clientX - containerRect.left - offsetX;

  let top =
    e.clientY - containerRect.top - offsetY;

  // Keep cube inside the defined area
  const maxLeft =
    container.clientWidth - selectedItem.offsetWidth;

  const maxTop =
    container.clientHeight - selectedItem.offsetHeight;

  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  selectedItem.style.left = left + "px";
  selectedItem.style.top = top + "px";
});

// Drop the cube
document.addEventListener("mouseup", function () {
  if (selectedItem) {
    selectedItem.style.cursor = "grab";
    selectedItem.style.zIndex = "";
  }

  selectedItem = null;
  container.classList.remove("active");
});