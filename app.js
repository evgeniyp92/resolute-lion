// DATA CONTROLLER
var dataController = (function () {
  // Stuff to do with the backend goes here

  ///// PRIVATE FUNCTIONS /////

  // Private functions are here

  // 1. Create a function constructor for members
  var Case = function (uid, name, flight, contact, status, reason, directedBy) {
    this.uid = uid;
    this.name = name;
    this.flight = flight;
    this.contact = contact;
    this.status = status;
    this.reason = reason;
    this.directedBy = directedBy;
  };

  // 2. Set up a data struct to hold members, an array of objects
  var cases = [];

  ///// PUBLIC FUNCTIONS /////

  return {
    addItem: function (nm, fl, cnt, st, rsn, dirby) {
      var newItem, UID;
      UID = 0;
      // ID = last ID + 1

      // Create a new ID
      // If the length of the cases array is > 0, find the last object in the array, take its id and add 1 to it, else set the ID to 0 because the array is empty
      if (cases.length > 0) {
        // For some reason this comes out to be NaN
        UID = cases[cases.length - 1].uid + 1;
      } else {
        UID = 0;
      }

      // Create the actual object
      newItem = new Case(UID, nm, fl, cnt, st, rsn, dirby);
      // Push it into the data structure
      cases.push(newItem);
      return newItem;
    },

    testing: function () {
      console.log(cases);
    },
  };
})();

// FRONTEND CONTROLLER
var frontController = (function () {
  // Stuff to do with updating the UI goes here

  ///// PRIVATE FUNCTIONS /////
  var DOMStrings = {
    name: `.add__name`,
    flight: `.add__flight`,
    contact: `.add__contact`,
    status: `.status__type`,
    reason: `.iso__quara__reason`,
    directedBy: `.directed__by`,
    caseList: `.case__list`,
  };

  ///// PUBLIC FUNCTIONS /////

  return {
    // getInput: reads values from the HTML input fields and creates an anon object with properties from fields
    getInput: function () {
      return {
        inputName: document.querySelector(DOMStrings.name).value, // Can be any string
        inputFlight: document.querySelector(DOMStrings.flight).value, // Can be any string
        inputContact: document.querySelector(DOMStrings.contact).value, // Can be any alphanumeric combo
        inputStatus: document.querySelector(DOMStrings.status).value, // Can be Quarantine or Isolation
        inputReason: document.querySelector(DOMStrings.reason).value, // Can be any string
        inputDirectedBy: document.querySelector(DOMStrings.directedBy).value, // Can be any string
      };
    },

    addListItem: function (obj) {
      // Declare vars
      var html, newHtml, element;

      // Set up vars
      element = DOMStrings.caseList;
      html = `<div class="member" id=case__%uid%><div class="member__name">Name: %name%</div><div class="member__flight">Flight: %flight%</div><div class="member__contact">Contact: %contact%</div><div class="member__status">Status: %status%</div><div class="member__reason">Reason: %reason%</div><div class="member__directedby">Directed by: %directedBy%</div><div class="separator">--------------------</div></div>`;

      // Replace placeholders in the string with actual data
      // newHtml = html.replace(`%name%`, obj.inputName);
      // html.replace is borked for some reason...
      console.log(html);
      newHtml = html.replace(`%name%`, obj.name);
      newHtml = newHtml.replace(`%uid%`, obj.uid);
      newHtml = newHtml.replace(`%flight%`, obj.flight);
      newHtml = newHtml.replace(`%contact%`, obj.contact);
      newHtml = newHtml.replace(`%status%`, obj.status);
      newHtml = newHtml.replace(`%reason%`, obj.reason);
      newHtml = newHtml.replace(`%directedBy%`, obj.directedBy);

      console.log(
        obj.uid,
        obj.name,
        obj.flight,
        obj.contact,
        obj.status,
        obj.reason,
        obj.directedBy
      );

      // Display it on the DOM
      document.querySelector(element).insertAdjacentHTML(`beforeend`, newHtml);
    },

    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

// GLOBAL CONTROLLER
var controller = (function (dataCtrl, frontCtrl) {
  // Calling stuff from the others
  var DOM = frontCtrl.getDOMStrings();
  var input, newItem;

  ///// PRIVATE FUNCTIONS /////
  // Setup event listeners
  var setupEventListeners = function () {
    document
      .querySelector(`.btn__newcase`)
      .addEventListener(`click`, ctrlAddItem);
  };

  // Adding a new item
  var ctrlAddItem = function () {
    //1. Get input field data
    input = frontCtrl.getInput();
    console.log(input);
    //2. Add the item to the backend DB
    newItem = dataCtrl.addItem(
      input.inputName,
      input.inputFlight,
      input.inputContact,
      input.inputStatus,
      input.inputReason,
      input.inputDirectedBy
    );
    dataCtrl.testing();
    console.log(newItem);
    //3. Add the new item to the UI
    frontCtrl.addListItem(newItem);
    //4. Clear the user fields

    // ISSUE [RESOLVED]: Right now the input is getting successfully captured, the newItem is being created on the backend and is visible in the array (UID fault notwithstanding), but it fails to read anything other than the directedBy field when updating the DOM
  };

  ///// PUBLIC FUNCTIONS (INIT ONLY) /////
  return {
    init: function () {
      setupEventListeners();
      console.log(`The application has initialized successfuly`);
    },
  };
})(dataController, frontController);

controller.init();