//interactive forms

// BASIC INFO SECTION
const userNameInput = document.querySelector('#name');
const userEmailInput = document.querySelector('#email');
  //NAME FIELD
  //default focus on the name field
  userNameInput.focus();
  //name valdiation: name field cannot be blank, empty, or contain numbers
  function isValidName (userName) {
    return /^[a-zA-Z][a-zA-Z\s]*$/.test(userName);
  }

//EMAIL FIELD
  //email validation: a few characters followed by @ followed by a few more characters and a . and more characters
  function isValidEmail(userEmail) {
    return /[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail);
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
  /*QUESTION: How can I pull the data-theme name and run the following using a variable?
  Template literals don't seem to work in querySelectors. Is there a better & more concise way
  that isn't JQuery?*/
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

//REGISTER FOR ACTIVITIES SECTION
const registerForActivities = document.querySelector('#activities');
const allActivities = document.querySelectorAll('#activities input');
  /*When an activity is selected, the total cost increases by the
  cost of that activity. When an activity is unselected, the total cost decreases by the cost of that
  activity. If an activity is selected that occurs at a conflicting time at another activity, the
  conflicting activity is disabled.*/
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
    for (i=1; i<allActivities.length; i++) {
      allActivities[i].disabled = true;
      let parentLabel = allActivities[i].parentElement;
      parentLabel.className = 'disabled';
      allActivities[i].checked = false;
      totalCost = activityCost;
    }
  }

  function mainEventUnchecked(activity, activityCost) {
    for (i=1; i<allActivities.length; i++) {
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

  function reactivatePreviousConflicts(activity) {
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
// userEmailInput.addEventListener("keyup", createListener(isValidEmail));
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


// PAYMENT SECTION
  const paymentMethodInput = document.querySelector('#payment');
  const payWithCreditCard = document.querySelector('#payment option[value="credit-card"]')
//dropdown payment method selection shows selected payment method and hids nonselected options
  const paymentDiv = document.querySelectorAll('.payment-methods>div:nth-last-child(-n+3)');
  initializePaymentSection();

  function initializePaymentSection() {
    hideAllPaymentDivs();
    payWithCreditCard.selected = true;
    let paymentSelection = 'credit-card';
    showPaymentDiv(paymentSelection);
  }

  function hideAllPaymentDivs() {
    for (i=0; i<paymentDiv.length; i++) {
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

  paymentMethodInput.addEventListener('change', e => {
    hideAllPaymentDivs();
    let paymentSelection = e.target.value;
    showPaymentDiv(paymentSelection);
  });

// Credit Card Information validation
const creditCardNumberInput = document.querySelector('#cc-num');
const zipCodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');

function isValidCardNumber(userCreditCard) {
  return /^\d{13,16}$/.test(userCreditCard);
}

function isValidZip(userZip) {
  return /^\d{5}$/.test(userZip);
}

function isValidCvv(userCvv) {
  return /^\d{3}$/.test(userCvv);
}


//REAL TIME VALIDATION
const formElement = document.querySelector("form");
// declare constants as false
let name;
let email;
let creditCard;
let zipCode;
let cvv;

// listen for all form events and use if statements to determine validity
formElement.addEventListener('keyup', e => {
    if (e.target === userNameInput) {
      name = createListener(isValidName, e);
      console.log(name);
    } else if (e.target === userEmailInput) {
      email = createListener(isValidEmail, e);
      console.log(email);
    } else if (e.target === creditCardNumberInput) {
      creditCard = createListener(isValidCardNumber, e);
      console.log(creditCard);
    } else if (e.target === zipCodeInput) {
      zipCode = createListener(isValidZip, e);
      console.log(zipCode);
    } else if (e.target === cvvInput) {
      cvv = createListener(isValidCvv, e);
      console.log(cvv);
    }
});

/*REAL TIME VALIDATION HELPER FUNCTIONS : the following helper functions are
based on the funtions used in the Regular Expressions in Javascript lessons*/
  //helper function to determine whether input is valid
  function createListener(validator, e) {
      const text = e.target.value;
      const valid = validator(text);
      const show = !valid;
      const element = e.target;
      if (show) {
        showHint(element);
      } if (!show) {
        hideHint(element);
      }
      return valid;
    };

  // helper function to  update styles when errors are detected
  function showHint(element) {
    let parentElement = element.parentNode;
    parentElement.className = "not-valid";
    let hint = parentElement.lastElementChild;
    hint.style.display = "inherit";
  }
  // helper function to update styles when errors are resolved
  function hideHint(element) {
    let parentElement = element.parentNode;
    parentElement.className = "valid";
    let hint = parentElement.lastElementChild;
    hint.style.display = "none";
  }

// SUBMIT BUTTON FORM VALIDATION
formElement.addEventListener('submit', e => {
    if (!name || !email || !creditCard || !zipCode || !cvv) {
      preventDefault();
    }

})
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
