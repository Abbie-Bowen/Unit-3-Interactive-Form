//interactive forms

const userNameInput = document.querySelector('#name');
const userEmailInput = document.querySelector('#email');
const jobRoleInput = document.querySelector('#title');
const shirtSizeInput = document.querySelector('#size');
const shirtDesignInput = document.querySelector('#design');
const shirtColorInput =document.querySelector('#color');
//checkboxes workshops variable(s)
const paymentMethodInput = document.querySelector('#payment');
const expirationMonthInput = document.querySelector('#exp-month');
const expirationYearInput = document.querySelector('#exp-year');
const creditCardNumberInput = document.querySelector('#cc-num');
const zipCodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv')

//default focus on the name field
  userNameInput.focus();
//name valdiation: name field cannot be blank, empty, or contain numbers
function isValidName (userName) {
  return /^[a-zA-Z\s]+$/.test(userName);
}
userNameInput.addEventListener("input", createListener(isValidName));

//email validation: a few characters followed by @ followed by a few more characters and a . and more characters
function isValidEmail(userEmail) {
  return /[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail);
}
userEmailInput.addEventListener("input", createListener(isValidEmail));
// //Job Role section
//   hide the "text field" with the id of "other-job-role" //hide by default
//   job role <select> element listen for user changes
//   if change, display/hide the "text field" based on selection in drop down menu
// //no validation requirements
//
// //TShirt Info section
// disable "color" <select> element
// "design" <select< element listen for uesr changes
//   when change=>
//     "color"<select> element should enable
//     "color"<select> element should dispay available colors
//       if "theme-JS Puns" then "color" = cornflower blue, darkslategrey, Gold
//       if "Theme-I<3 JS" then "color"= tomato, steelblue, dimgrey
//       //use "selected" and "hidden" attributes for above
//
// //Register for Activities section
//   register for activities fieldset listen for changes
//     when a change=>
//       if an activity is checked, total cost should increase by the value
//       in data-cost attribute of the activity's <input type="checkbox"> element
//
//       if an activty is unchecked, total cost should decrease by that amount
//
//       <p> with id of "activity-cost" updates to reflect new total cost
// //form validation
//   register for activities must have at least one activity selected
//   //extra Credit--no registering for conflicting Activities
//   when a user selects an activity, loop over all activities and check if any
//   have the same day & time as the activity that was just checked/unchecked
//     as long as the activity was not just checked/unchecked, disable/enable
//     the conflicting activity's checkbox input and add/remove the 'disabled' className
//     to the activity's parent label element
//
// //Payment selection
// I'm going to pay with <select> element to listen to changes
//   when a change => hide all payment sections except the selected one
// //form validation
//   if credit card is the selected payment method,
//     card number field must contain a 13-16 digit number, no dashes or spaces
//     zip code must contain 5 digit Number
//     cvv field must contain a 3 digit Number
//
// //submit validation
// form element listen for the submit event
//   when submit=>
//     check name validation, if false, return
//     check email validation, if false, return
//     check register for activities validation, if false return
//     check credit card validation, if cc is selected if false return
//   preventDefault if one of more of the required fields is invalid
//
function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showHint = text !== "" && !valid;
    const element = e.target;
    showOrHideHint(showHint, element);
  };
}

//   //accessibility
//   //focus states
//     checkbox input elements listen for focus and blur events
//     if focus=> add ".focus" ClassName to the checkbox input's parent element
//
//     if blur=> remove the focus ClassName from the label element that possessess it
//     (target element with className of .focus)

// obvious error messaging
function showOrHideHint (show, element) {
  if (show) {
    showHint(element);
  } else {
    hideHint(element);
  }
}
// helper function to  update styles when errors are detected
function showHint (element) {
  let parentElement = element.parentNode;
  parentElement.className = '';
  parentElement.className = "not-valid";
  let hint = parentElement.lastElementChild;
  hint.style.display = "inherit";
}
// helper function to update styles when errors are resolved
function hideHint(element) {
  let parentElement = element.parentNode;
  parentElement.className = '';
  parentElement.className = "valid";
  let hint = parentElement.lastElementChild;
  hint.style.display = "none";
}
