//interactive forms

// BASIC INFO SECTION
const userNameInput = document.querySelector('#name');
const userEmailInput = document.querySelector('#email');
//NAME FIELD
  //default focus on the name field
  userNameInput.focus();
  //name valdiation: name field cannot be blank, empty, or contain numbers
  //Feedback edits: extra if test to determine false is unnecessary
  //feedback edits: return consistent types --either boolean or string
  function isValidName (userName) {
    if (/^[a-zA-Z][a-zA-Z\s]*$/.test(userName)) {
      return "valid";
    } else if (userName === "") {
      return "blank";
    } else if (/[\d]+/.test(userName)) {
      return "number";
    } else {
      return "invalid";
    }
  }

//EMAIL FIELD
  //when user starts entering email, add clear validation requirements
  userEmailInput.addEventListener("focus", e => {
    let emailFormattingHint = document.querySelector("#email-hint");
    emailFormattingHint.innerHTML = `Email must contain <strong>.</strong> and <strong>@</strong> for correct formatting.`;
    emailFormattingHint.style.display = "inline";
    emailFormattingHint.style.position = "relative";
    emailFormattingHint.style.color = "black";
  });
  //email validation: a few characters followed by @ followed by a few more characters and a . and more characters
  //feedback edits: return consistent types --either boolean or string
  function isValidEmail(userEmail) {
    if (userEmail === "") {
      return "blank";
    } else if (/[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail)) {
      return "valid";
    } else {
      return "invalid";
    }
  }


// JOB ROLE SECTION
const jobRoleInput = document.querySelector('#title');
const otherJobRoleInput = document.querySelector('#other-job-role');

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
const shirtDesignInput = document.querySelector('#design');
const shirtColorInput =document.querySelector('#shirt-colors');
  // default disable "color" <select> element
  shirtColorInput.style.display = 'none';
  // Design selection listens for changes and filters color choices based on user selection
  shirtDesignInput.addEventListener('change', e =>{
    shirtColorInput.style.display = 'inherit';
    let colorTheme = e.target.value;
    toggleColors(colorTheme);
  });
  //helper function to toggle color theme displayed
  function toggleColors (colorTheme) {
    const allColors = document.querySelectorAll('#color option[data-theme]');
    const jsPuns = document.querySelectorAll('#color option[data-theme="js puns"]');
    const heartJs = document.querySelectorAll('#color option[data-theme="heart js"]');
    for (let i=0; i<allColors.length; i++) {
      allColors[i].hidden=true;
    }
    if (colorTheme === "js puns") {
      for (let i=0; i<jsPuns.length; i++) {
        jsPuns[i].hidden=false;
      }
      jsPuns[0].selected=true;
    } if (colorTheme === "heart js") {
      for (let i=0; i<heartJs.length; i++) {
        heartJs[i].hidden=false;
      }
      heartJs[0].selected=true;
    }
  }

//REGISTER FOR ACTIVITIES SECTION
const registerForActivities = document.querySelector('#activities');
const allActivities = document.querySelectorAll('#activities input');
  /*When an activity is selected, the total cost increases by the
  cost of that activity. When an activity is unselected, the total cost decreases by the cost of that
  activity. If an activity is selected that occurs at a conflicting time at another activity, the
  conflicting activity is disabled.
  From my understanding, registering for the Main Event means that sub events can't be
  selected because it includes all of them. I'm not sure if that is the correct understanding,
  but that is the assumption the following is based on.*/
  let totalCost = 0;
  registerForActivities.addEventListener('change', e => {
    const activity=e.target;
    const costTotalHTML = document.querySelector('.activities-cost');
    const activityCost = +activity.dataset.cost;
    if (activity.name === "all" && activity.checked) {
        mainEventChecked(activity, activityCost);
    } else if (activity.name === "all" && !activity.checked) {
        mainEventUnchecked(activity, activityCost);
    } else if (activity.name !== "all" && activity.checked) {
        eventChecked(activity, activityCost);
    } else if (activity.name !== "all" && !activity.checked) {
        eventUnchecked(activity, activityCost);
    }
    costTotalHTML.innerHTML=(`Total: $${totalCost}`);
  });

  function mainEventChecked(activity, activityCost) {
    for (let i=1; i<allActivities.length; i++) {
      allActivities[i].disabled = true;
      let parentLabel = allActivities[i].parentElement;
      parentLabel.className = 'disabled';
      allActivities[i].checked = false;
      totalCost = activityCost;
    }
  }

  function mainEventUnchecked(activity, activityCost) {
    for (let i=1; i<allActivities.length; i++) {
      allActivities[i].disabled = false;
      let parentLabel = allActivities[i].parentElement;
      parentLabel.className = '';
      totalCost = 0;
    }
  }

  function eventChecked(activity, activityCost) {
    totalCost += activityCost;
    removeConflictingActivities(activity);
  }

  function eventUnchecked(activity, activityCost) {
    totalCost -= activityCost;
    reactivatePreviousConflicts(activity);
  }
//deactivates conflicting events when one option is selected.
  function removeConflictingActivities(activity) {
    const schedule = activity.dataset.dayAndTime;
    for (let i=1; i<allActivities.length; i++) {
      if (allActivities[i].dataset.dayAndTime === schedule && allActivities[i] !== activity) {
        allActivities[i].disabled = true;
        let parentLabel = allActivities[i].parentElement;
        parentLabel.className = 'disabled';
      }
    }
  }
//allows users to select previously deactivated events when an option is unselected.
  function reactivatePreviousConflicts(activity) {
    const schedule = activity.dataset.dayAndTime;
    const allActivities = document.querySelectorAll('#activities input');
    for (let i=1; i<allActivities.length; i++) {
      if (allActivities[i].dataset.dayAndTime === schedule && allActivities[i] !== activity) {
        allActivities[i].disabled = false;
        let parentLabel = allActivities[i].parentElement;
        parentLabel.className = '';
      }
    }
  }

  //obvious focus state for activity section.
  const checkbox = document.querySelectorAll('input[type="checkbox"]');
  for (i=0; i<checkbox.length; i++) {
      checkbox[i].addEventListener('focus', e=>{
          let parentCheckbox = e.target.parentNode;
          parentCheckbox.className = 'focus';
        });

      checkbox[i].addEventListener('blur', e=>{
        let focusedCheckbox = document.querySelector('.focus');
        focusedCheckbox.className = '';
      });
    }


// PAYMENT SECTION
  const paymentMethodInput = document.querySelector('#payment');
  const payWithCreditCard = document.querySelector('#payment option[value="credit-card"]')
  const paymentDiv = document.querySelectorAll('.payment-methods>div:nth-last-child(-n+3)');
  //sets initial selection to Credit Card Payment
  initializePaymentSection();

  function initializePaymentSection() {
    hideAllPaymentDivs();
    payWithCreditCard.selected = true;
    let paymentSelection = 'credit-card';
    showPaymentDiv(paymentSelection);
  }
//helper functions to show or hide payment information
  function hideAllPaymentDivs() {
    for (let i=0; i<paymentDiv.length; i++) {
      paymentDiv[i].style.display = 'none';
    }
  }
//helper function below from https://developer.mozilla.org/en-US/docs/Web/API/NodeList/values
  function showPaymentDiv(paymentSelection) {
      for (let div of paymentDiv) {
        if (div.id === paymentSelection) {
          div.style.display = 'inherit';
        };
      }
    }
//listener for user selection of payment option
  paymentMethodInput.addEventListener('change', e => {
    hideAllPaymentDivs();
    let paymentSelection = e.target.value;
    showPaymentDiv(paymentSelection);
  });

// Credit Card Information validation
  const creditCardNumberInput = document.querySelector('#cc-num');
  const zipCodeInput = document.querySelector('#zip');
  const cvvInput = document.querySelector('#cvv');

  creditCardNumberInput.addEventListener("focus", e => {
      let creditCardFormattingHint = document.querySelector("#cc-hint");
      creditCardFormattingHint.style.display = "inherit";
      creditCardFormattingHint.style.color = "black";
  });

  //Feedback edits: extra if test to determine false is unnecessary
  //feedback edits: return consistent types --either boolean or string
  function isValidCardNumber (userCreditCard) {
    if (/^\d{13,16}$/.test(userCreditCard)) {
      return "valid";
    } else if (userCreditCard === "") {
        return "blank";
    } else if (/[^\d]+/.test(userCreditCard)) {
     return "not a number";
    } else if (/^\d{1,12}$/.test(userCreditCard)) {
     return "in progress";
    } else {
     return "invalid";
    }
  }

  //Feedback edits: extra if test to determine false is unnecessary
  //feedback edits: return consistent types --either boolean or string
  function isValidZip(userZip) {
    if (/^\d{5}$/.test(userZip)) {
      return "valid";
    } else if (userZip === "") {
        return "blank";
    } else if (/[^\d]+/.test(userZip)) {
        return "not a number";
    } else if (/^\d{1,4}$/.test(userZip)) {
        return "in progress";
    } else {
        return "invalid";
    }
  }

  //Feedback edits: extra if test to determine false is unnecessary
  //feedback edits: return consistent types --either boolean or string
  function isValidCvv(userCvv) {
    if (/^\d{3}$/.test(userCvv)) {
      return "valid";
    } else if (userCvv === "") {
      return "blank";
    } else if (/[^\d]+/.test(userCvv)) {
      return "not a number";
    } else if (/^\d{1,2}$/.test(userCvv)) {
      return "in progress";
    } else {
      return "invalid";
    }
  }


//REAL TIME VALIDATION
const formElement = document.querySelector("form");

let name;
let email;
let creditCard;
let zipCode;
let cvv;

//append error messaging for real time user feedback
appendErrorMessaging();

function appendErrorMessaging() {
  const textInputs = document.querySelectorAll('input');
  for (i=0; i<textInputs.length; i++) {
    let element = textInputs[i];
    let parentElement = textInputs[i].parentNode;
      errorBlank(element, parentElement);
      errorContainsNumber(element, parentElement);
      errorNumbersOnly(element, parentElement);
  }
}

function errorBlank(element, parentElement) {
  let hint = document.createElement("span");
  hint.innerHTML = `This field cannot be blank`;
  parentElement.appendChild(hint);
  hint.className = ('blank');
  hint.style.display = "none";
}

function errorContainsNumber(element, parentElement) {
  if (element.id === "name") {
    let hint = document.createElement("span");
    hint.innerHTML = `This field cannot contain numbers.`;
    parentElement.appendChild(hint);
    hint.className = ('number');
    hint.style.display = "none";
  }
}

function errorNumbersOnly(element, parentElement) {
  let section = parentElement.parentNode.parentNode;
  if (section.className === "credit-card-box") {
    let hint = document.createElement("span");
    hint.innerHTML = `This field can only contain numbers.`;
    parentElement.appendChild(hint);
    hint.className = ('num-only');
    hint.style.display = "none";
  }
}

// listen for all form events and use if statements to determine validity
//inspired by https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/
formElement.addEventListener('keyup', e => {
  if (e.keyCode !== 9) {
    if (e.target === userNameInput) {
      name = createListener(isValidName, e);
    } else if (e.target === userEmailInput) {
      email = createListener(isValidEmail, e);
    } else if (e.target === creditCardNumberInput) {
      creditCard = createListener(isValidCardNumber, e);
    } else if (e.target === zipCodeInput) {
      zipCode = createListener(isValidZip, e);
    } else if (e.target === cvvInput) {
      cvv = createListener(isValidCvv, e);
    }
  }
});

/*REAL TIME VALIDATION HELPER FUNCTIONS : the following helper functions are
based on the funtions used in the Regular Expressions in Javascript Treehouse lessons*/
  //helper function to determine whether input is valid
  function createListener(validator, e) {
      const element = e.target;
      const text = element.value;
      const parentElement = element.parentNode;
      hideHint(element, parentElement);
      hintManagement(validator(text), parentElement);
    };

    //helper function to manage different validation feedback
    /*QUESTION: this function seems like it would be easier to read using a switch,
    but I can't pass two argumnts through a switch. Is the following function the
    best way to do this?*/
    //answer: you nest the switch inside the function.
    function hintManagement(valid, parentElement) {
      let hint = '';
      let defaultHint = '';

      switch (valid) {
      case "valid":
          return valid;
      case "blank":
          parentElement.className = 'not-valid';
          hint = parentElement.querySelector('.blank')
          hint.style.display = "inherit";
          return valid;
       case "number":
          parentElement.className = 'not-valid';
          hint = parentElement.querySelector('.number')
          hint.style.display = "inherit";
          return valid;
      case "not a number":
          parentElement.className = 'not-valid';
          hint = parentElement.querySelector('.num-only')
          hint.style.display = "inherit";
          return valid;
      case "in progress":
          parentElement.className = 'not-valid';
          defaultHint = parentElement.querySelector('.hint');
          defaultHint.style.display = "inherit";
          defaultHint.style.color = "black";
          return valid;
      case "invalid":
      default:
          parentElement.className = "not-valid";
          defaultHint = parentElement.querySelector('.hint');
          defaultHint.style.display = "inherit";
          defaultHint.style.color = "red";
          return valid;
        }
    }

  // helper function to update styles when errors are resolved
  function hideHint(element, parentElement) {
    parentElement.className = "valid";
    let hints = document.querySelectorAll(".hint, .blank, .number, .num-only")
    for (i=0; i<hints.length; i++) {
      hints[i].style.display = "none";
    }
  }

  //credit card section validation helper function
  function validCreditCardSection() {
    creditCard = hintManagement(isValidCardNumber(creditCardNumberInput.value), creditCardNumberInput.parentNode);
    zipCode = hintManagement(isValidZip(zipCodeInput.value), zipCodeInput.parentNode);
    cvv = hintManagement(isValidCvv(cvvInput.value), cvvInput.parentNode);
    if (creditCard === "valid" && zipCode === "valid" && cvv === "valid") {
      return true;
    } else {
      return false;
    }
  }

// SUBMIT BUTTON FORM VALIDATION
formElement.addEventListener('submit', e => {
  name = hintManagement(isValidName(userNameInput.value), userNameInput.parentNode);
  email = hintManagement(isValidEmail(userEmailInput.value), userEmailInput.parentNode);

  if (name !== "valid") {
    e.preventDefault();
  }

  if (email !== "valid") {
      e.preventDefault();
    }

  const checkedActivities = document.querySelectorAll('#activities [type="checkbox"]:checked');
  let hint = document.querySelector('#activities-hint');
  if (checkedActivities.length === 0) {
    hint.style.display = "inherit";
    registerForActivities.className = 'activities not-valid';
    e.preventDefault();
  } else if (checkedActivities.length>0){
    let hint = registerForActivities.lastElementChild;
    hint.style.display = "none";
    registerForActivities.className = 'activities valid';
  }

  if (payWithCreditCard.selected === true) {
    let creditCardSection = validCreditCardSection();
    if (!creditCardSection) {
      e.preventDefault();
    }
  }
});
