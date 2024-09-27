// Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

//----------------------------------------------------------------------
//toggleDarkMode function
const toggleDarkMode = () => {
    // manipulate the DOM
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

//-------------------------------------------------------------------
//Petition
let count = 3;
let signNowButton = document.getElementById("sign-now-button");

//-------------------------------------------------------------------
// Function to update the signature count in the HTML
const updateSignatureCount = () => {
  const counter = document.getElementById("counter");
  counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
}

//----------------------------------------------------------------------
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

//-------------------------------------------------------------
// Create a new variable outside of any functions called scaleFactor and set it to 1
let scaleFactor = 1;

// Create another variable outside any function called modalImage that selects the image within the modal
const modalImage = document.querySelector("#thanks-modal img");

// Create a new function called scaleImage that takes no arguments
const scaleImage = () => {
  // Within the scaleImage function, it will first toggle the image size between a factor of 1 and 0.8.
  // Check if the scaleFactor is 1
  scaleFactor = scaleFactor === 1 ? 0.8 : 1

  // Set the transform style property of the modalImage to scale(${scaleFactor}) as a String
  modalImage.style.transform = `scale(${scaleFactor})`;
};

//-------------------------------------------------------------
function toggleModal(person) {
  // Select the modal and modal content elements
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("thanks-modal-content");

  // Set the display style property of the entire modal to flex
  modal.style.display = "flex";

  // Set the textContent of the modal to a nice message using the user's name
  modalContent.textContent = `Thank you, ${person.name}, for your support! We appreciate your signature.`;

  // Use setTimeout to hide the modal after a delay (e.g., 4000 milliseconds or 4 seconds)
  setTimeout(() => {
    modal.style.display = "none";

    // Clear the interval when the modal is hidden
    clearInterval(intervalId);
  }, 4000); // Adjust the delay as needed

  // Create a new variable called intervalId and set it equal to a call to setInterval that calls scaleImage every half a second.
  const intervalId = setInterval(scaleImage, 500);
}

//---------------------------------------------------------------
const addSignature = (person) => {
  // Get the name and hometown from the form inputs
  const nameInput = document.getElementById("name");
  const hometownInput = document.getElementById("hometown");

  // Collect the values from the inputs
  const hometown = hometownInput.value;

  // Create a new paragraph element for the signature
  const newSignature = document.createElement("p");
  newSignature.textContent = `🖊️ ${person.name} from ${hometown} supports this.`;

  // Find the signatures section using DOM methods
  const signaturesSection = document.querySelector(".signatures");

  // Append the new signature to the signatures section
  signaturesSection.appendChild(newSignature);

  // Clear the form inputs after adding the signature
  nameInput.value = "";
  hometownInput.value = "";

  count = count + 1;

  // Remove the old counter if it exists
  const oldCounter = document.getElementById("counter");
  if (oldCounter) {
    oldCounter.remove();
  }

  // Create a new counter HTML p tag
  const newCounter = document.createElement("p");
  newCounter.id = "counter";
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  // Append the new counter to the signatures section
  signaturesSection.appendChild(newCounter);
}

//--------------------------------------------------------------------
// signNowButton.addEventListener("click", addSignature);
updateSignatureCount();

//-------------------------------------------------------------------
// Select the button and save it to a variable
const closeModalButton = document.getElementById("closeModalButton");

// Write a function that sets the display style property to none for the whole modal
const closeAndClearModal = () => {
  const modal = document.getElementById("thanks-modal");
  modal.style.display = "none";

  // Clear the interval if it exists (assuming you have an intervalId variable declared globally)
  clearInterval(intervalId);
};

// Add the function as a click event listener to the button
closeModalButton.addEventListener("click", closeAndClearModal);

//--------------------------------------------------------------------
const validateForm = () => {
  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;

  // Create a 'person' object to store form input values
  let person = {
    name: petitionInputs[0].value, // Save the value of the first input (assuming it's the name)
  };

  for (let i = 0; i < petitionInputs.length; i++) {
    const input = petitionInputs[i];

    if (input.value.length < 2) {
      input.classList.add('error');
      containsErrors = true;
    } else {
      input.classList.remove('error');
    }

    // Update the 'person' object based on input values
    if (input.name === 'email') {
      person.email = input.value; // Save the email value
      if (!input.value.includes('.com')) {
        containsErrors = true;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    }
  }

  if (!containsErrors) {
    // Pass the 'person' object to the addSignature function
    addSignature(person);
    toggleModal(person);
    // Clear the form fields and reset containsErrors to false
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
    containsErrors = false;
  }
};

signNowButton.addEventListener('click', validateForm);

//------------------------------------------------------------
// Create a new variable revealableContainers and use document.querySelectorAll to select every element with the class revealable.
let revealableContainers = document.querySelectorAll('.revealable');

// Create a new function called reveal
const reveal = () => {
  // Create a for loop that starts with i = 0 and continues by 1 as long as i is less than revealableContainers.length
  for (let i = 0; i < revealableContainers.length; i++) {
    // Inside the loop, save the height of the window
    let windowHeight = window.innerHeight;

    // Inside the loop, find the top of the revealable container
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    // Check if the topOfRevealableContainer should be loaded in
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      // Add the 'active' class to the revealableContainer's classlist
      revealableContainers[i].classList.add('active');
    } else {
      // Remove the 'active' class from the revealableContainer's classlist
      revealableContainers[i].classList.remove('active');
    }
  }
};

// Add reveal as an event listener to window, with the type of event as 'scroll' rather than 'click'
window.addEventListener('scroll', reveal);

//---------------------------------------------------------------
