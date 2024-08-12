// Define the class names
const buttonContainer =
  "group mx-auto mt-1 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 shadow-md transition-transform duration-200 hover:scale-95 hover:shadow-none";
const button =
  "flex items-center gap-2 rounded-full px-6 py-2 transition-colors duration-200 group-hover:bg-richblack-900";

// Get the div elements
const container1 = document.querySelectorAll(".button-myContainer");
const container2 = document.querySelectorAll(".myButton");

// Apply the class names to all elements in the NodeLists
container1.forEach((el) => {
  el.className = buttonContainer;
});
container2.forEach((el) => {
  el.className = button;
});

// Select the first element with the class "myClass"
// const element = document.querySelector('.myClass');

// Select all elements with the class "myClass"
// const elements = document.querySelectorAll('.myClass');

// Select all elements with the class "myClass"
// const elements = document.getElementsByClassName('myClass');
