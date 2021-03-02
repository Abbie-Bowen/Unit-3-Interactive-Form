//interactive forms

const userNameInput = document.querySelector('#name');
const userEmailInput = document.querySelector('#email');
const jobRoleInput = document.querySelector('#title');
const otherJobRoleInput = document.querySelector('#other-job-role');
const shirtDesignInput = document.querySelector('#design');
const shirtColorInput =document.querySelector('#shirt-colors');
const registerForActivities = document.querySelector('#activities');
const allActivities = document.querySelectorAll('#activities input');
const paymentMethodInput = document.querySelector('#payment');
const expirationMonthInput = document.querySelector('#exp-month');
const expirationYearInput = document.querySelector('#exp-year');
const creditCardNumberInput = document.querySelector('#cc-num');
const zipCodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv')
const formElement = document.querySelector("form");

// BASIC INFO SECTION
//default focus on the name field
userNameInput.focus();
//name valdiation: name field cannot be blank, empty, or contain numbers
function isValidName (userName) {
  return /^[a-zA-Z][a-zA-Z\s]*$/.test(userName);
}
//real time error messaging
userNameInput.addEventListener("keyup", createListener(isValidName));

//email validation: a few characters followed by @ followed by a few more characters and a . and more characters
function isValidEmail(userEmail) {
  return /[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail);
}
//real time error messaging
userEmailInput.addEventListener("keyup", createListener(isValidEmail));

// JOB ROLE SECTION
//if other job role is selected, text box appears for user
otherJobRoleInput.style.display = 'none';

jobRoleInput.addEventListener('change', e => {
  if (e.target.value === 'other') {
    otherJobRoleInput.style.display = 'inherit';
  } else {
    otherJobRoleInput.style.display = 'none';
  }
});

// TSHIRT INFO SECTION
// default disable "color" <select> element
shirtColorInput.style.display = 'none';
// Design selection listens for changes and filters color choices based on user selection
shirtDesignInput.addEventListener('change', e =>{
  shirtColorInput.style.display = 'inherit';
  let colorTheme = e.target.value;
  toggleColors(colorTheme);
});

function toggleColors (colorTheme) {
  const allColors = document.querySelectorAll('#color option[data-theme]');
/*QUESTION: How can I pull the data-theme name and run the following using a variable?
Template literals don't seem to work in querySelectors. Is there a better & more concise way?*/
  const jsPuns = document.querySelectorAll('#color option[data-theme="js puns"]');
  const heartJs = document.querySelectorAll('#color option[data-theme="heart js"]');
  for (i=0; i<allColors.length; i++) {
    allColors[i].hidden=true;
  }
  if (colorTheme === "js puns") {
    for (i=0; i<=jsPuns.length; i++) {
      jsPuns[i].hidden=false;
    }
    jsPuns[0].selected=true;
  } if (colorTheme === "heart js") {
    for (i=0; i<=heartJs.length; i++) {
      heartJs[i].hidden=false;
    }
    heartJs[0].selected=true;
  }
}

/* Register for Activities section: when an activity is selected, the total cost increases by the
cost of that activity. When an activity is unselected, the total cost decreases by the cost of that
activity. If an activity is selected that occurs at a conflicting time at another activity, the
conflicting activity is disabled.*/
let totalCost = 0;
registerForActivities.addEventListener('change', e => {
  const activity=e.target;
  const costTotalHTML = document.querySelector('.activities-cost');
  const activityCost = activity.dataset.cost;
  if (activity.name === "all" && activity.checked) {
    for (i=1; i<allActivities.length; i++) {
      allActivities[i].disabled = true;
      let parentLabel = allActivities[i].parentElement;
      parentLabel.className = 'disabled';
      allActivities[i].checked = false;
      totalCost = activityCost;
      }
  } if (activity.name === "all" && !activity.checked) {
      for (i=1; i<allActivities.length; i++) {
        allActivities[i].disabled = false;
        let parentLabel = allActivities[i].parentElement;
        parentLabel.className = '';
        totalCost = 0;
        }
  } if (activity.name !== "all" && activity.checked) {
        totalCost += +activityCost;
        removeConflictingActivities(activity);
  } if (activity.name !== "all" && !activity.checked) {
        totalCost -= +activityCost;
        undoConflicts(activity);
  }
costTotalHTML.innerHTML=(`Total: $${totalCost}`);
});

function removeConflictingActivities(activity) {
  const schedule = activity.dataset.dayAndTime;
  for (i=1; i<allActivities.length; i++) {
    if (allActivities[i].dataset.dayAndTime === schedule && allActivities[i] !== activity) {
      allActivities[i].disabled = true;
      let parentLabel = allActivities[i].parentElement;
      parentLabel.className = 'disabled';
    }
  }
}

function undoConflicts(activity) {
  const schedule = activity.dataset.dayAndTime;
  const allActivities = document.querySelectorAll('#activities input');
  for (i=1; i<allActivities.length; i++) {
    if (allActivities[i].dataset.dayAndTime === schedule && allActivities[i] !== activity) {
      allActivities[i].disabled = false;
      let parentLabel = allActivities[i].parentElement;
      parentLabel.className = '';
    }
  }
}

// //form validation
//   register for activities must have at least one activity selected

//   const checkedActivities = document.querySelectorAll('#activities [type="checkbox"]:checked');
//   let hint = document.querySelector('.activities-hint-hint');
//   let hintBorder = document.querySelector('.activities-box error-border');
//   if (checkedActivities.length === 0) {
//     hint.style.display = "inherit";
//     // hintBorder.style.display = ".not-valid";
//   } else {
//     let hint = registerForActivities.lastElementChild;
//     hint.style.display = "none";
//     // hintBorder.style.display = "none";
//   }
// });


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


//   //accessibility
//   //focus states
//     checkbox input elements listen for focus and blur events
//     if focus=> add ".focus" ClassName to the checkbox input's parent element
//
//     if blur=> remove the focus ClassName from the label element that possessess it
//     (target element with className of .focus)

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const show = !valid;
    const element = e.target;
    if (show) {
      showHint(element);
    } if (!show) {
      hideHint(element);
    }
  };
}

// helper function to  update styles when errors are detected
function showHint(element) {
  let parentElement = element.parentNode;
  if (parentElement.parentNode.className === ".basic-info") {
    parentElement.className = '';
    parentElement.className = "not-valid";
    let hint = parentElement.lastElementChild;
    hint.style.display = "inherit";
  } if (parentElement.parentNode.className === ".activities")  {

  } if (parentElement.parentNode.className === ".num-box")
}
// helper function to update styles when errors are resolved
function hideHint(element) {
  let parentElement = element.parentNode;
  parentElement.className = '';
  parentElement.className = "valid";
  let hint = parentElement.lastElementChild;
  hint.style.display = "none";
}
