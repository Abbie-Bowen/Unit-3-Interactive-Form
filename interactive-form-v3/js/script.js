//interactive forms

// BASIC INFO SECTION
const userNameInput = document.querySelector('#name');
const userEmailInput = document.querySelector('#email');
  //NAME FIELD
  //default focus on the name field
  userNameInput.focus();
  //name valdiation: name field cannot be blank, empty, or contain numbers
  function isValidName (userName) {
    if (/^[a-zA-Z][a-zA-Z\s]*$/.test(userName)) {
      return true;
    } else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(userName)) {
      if (/^[\s]*$/.test(userName)) {
        return "blank";
      } else if (/\d+/.test(userName)) {
       return "number";
      }
    }
  }

//EMAIL FIELD
  //email validation: a few characters followed by @ followed by a few more characters and a . and more characters
  userEmailInput.addEventListener("focusin", e => {
        let parentElement = e.target.parentNode;
        let hint = document.createElement("span");
        hint.innerHTML = `Email must contain a . and an @ for correct formatting.`;
        parentElement.appendChild(hint);
        hint.style.display = "inherit";
  });

  function isValidEmail(userEmail) {
    return /[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail);
    //if contains @ & . (link to, hide @. hint)
    //if '' return blank (link to, show hint: cannot be blank)
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

  let name;
  let email;
  let creditCard;
  let zipCode;
  let cvv;

  // listen for all form events and use if statements to determine validity
  //inspired by https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/
  formElement.addEventListener('keyup', e => {
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
  });

/*REAL TIME VALIDATION HELPER FUNCTIONS : the following helper functions are
based on the funtions used in the Regular Expressions in Javascript lessons*/
  //helper function to determine whether input is valid
  function createListener(validator, e) {
      const element = e.target;
      const text = element.value;
      const valid = validator(text);
      if (valid) {
          hideHint(element);
          return valid;
      } else if (valid === "blank") {
          hideHint(element);
          let parentElement = element.parentNode;
          parentElement.className = 'not-valid';
          let hint = document.createElement("span");
          hint.innerHTML = `This field cannot be blank`;
          parentElement.appendChild(hint);
          hint.style.display = "inherit";
          return valid;
      } else if (valid === "number") {
          hideHint(element);
          let parentElement = element.parentNode;
          parentElement.className = 'not-valid';
          let hint = document.createElement("span");
          hint.innerHTML = `Name field cannot contain numbers.`;
          parentElement.appendChild(hint);
          hint.style.display = "inherit";
          return valid;
    }
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
  if (!name) {
    showHint(userNameInput);
    console.log('name invalid');
    e.preventDefault();
  }

  if (!email) {
      showHint(userEmailInput);
      console.log('email invalid');
      e.preventDefault();
    }

  const checkedActivities = document.querySelectorAll('#activities [type="checkbox"]:checked');
  let hint = document.querySelector('#activities-hint');
  if (checkedActivities.length === 0) {
    hint.style.display = "inherit";
    registerForActivities.className = 'activities not-valid';
    console.log('activities invalid');
    e.preventDefault();
  } else if (checkedActivities.length>0){
    let hint = registerForActivities.lastElementChild;
    hint.style.display = "none";
    registerForActivities.className = 'activities valid';
    console.log('activities valid');
  }

  if (payWithCreditCard.selected === true) {
    let creditCardSection = validCreditCardSection();
    if (!creditCardSection) {
      console.log('credit card invalid');
      e.preventDefault();
    }
  }
});

function validCreditCardSection() {
  if (creditCard && zipCode && cvv) {
    return true;
  } else {
    return false;
  }
}
// form element listen for the submit event
//   when submit=>
//     check name validation, if false, return
//     check email validation, if false, return
//     check register for activities validation, if false return
//     check credit card validation, if cc is selected if false return
//   preventDefault if one of more of the required fields is invalid



//   //accessibility
//   //focus states
//     checkbox input elements listen for focus and blur events
//     if focus=> add ".focus" ClassName to the checkbox input's parent element
//
//     if blur=> remove the focus ClassName from the label element that possessess it
//     (target element with className of .focus)
