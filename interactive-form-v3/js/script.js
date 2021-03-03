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
  //real time error messaging
  userNameInput.addEventListener("keyup", createListener(isValidName));

//EMAIL FIELD
  //email validation: a few characters followed by @ followed by a few more characters and a . and more characters
  function isValidEmail(userEmail) {
    return /[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail);
  }
  //real time error messaging
  userEmailInput.addEventListener("keyup", createListener(isValidEmail));

/*BASIC INFO SECTION VALIDATION HELPER FUNCTIONS : the following helper functions are
based on the funtions used in the Regular Expressions in Javascript lessons*/
  //helper function to determine whether input is valid
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
    } if (activity.name === "all" && !activity.checked) {
        mainEventUnchecked(activity, activityCost);
    } if (activity.name !== "all" && activity.checked) {
        eventChecked(activity, activityCost);
    } if (activity.name !== "all" && !activity.checked) {
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
  // const expirationMonthInput = document.querySelector('#exp-month');
  // const expirationYearInput = document.querySelector('#exp-year');
  // const creditCardNumberInput = document.querySelector('#cc-num');
  // const zipCodeInput = document.querySelector('#zip');
  // const cvvInput = document.querySelector('#cvv')
  // I'm going to pay with <select> element to listen to changes
  //   when a change => hide all payment sections except the selected one

  let paymentDiv = document.querySelectorAll('.payment-methods>div:nth-last-child(-n+3)');
  const paymentArray = Array.prototype.slice.call(paymentDiv);
  console.log(Array.isArray(paymentArray));
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

  function showPaymentDiv(paymentSelection) {
      console.log(paymentDiv); //nodelist
      const selectedDiv = paymentArray.filter(function(selection) {
      return selection.id == `${paymentSelection}`;
    });
      console.log(selectedDiv); //array
      // paymentDiv = Object.assign({},selectedDiv); //
      selectedDiv.style.display = 'inherit';

}

  // paymentMethodInput.addEventListener('change', e => {
  //   let paymentSelection = e.target.value;
  //   showPaymentDiv(paymentSelection);
  // })

// //form validation
//   if credit card is the selected payment method,
//     card number field must contain a 13-16 digit number, no dashes or spaces
//     zip code must contain 5 digit Number
//     cvv field must contain a 3 digit Number

// SUBMIT BUTTON FORM VALIDATION
const formElement = document.querySelector("form");
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
