// DATA CONTROLLER
var dataController = (function () {
	// Create a function constructor for members
	var Case = function (
		uid,
		name,
		flight,
		contact,
		status,
		reason,
		directedBy
	) {
		this.uid = uid;
		this.name = name;
		this.flight = flight;
		this.contact = contact;
		this.status = status;
		this.reason = reason;
		this.directedBy = directedBy;
	};

	// var member = function (
	// 	uid,
	// 	name,
	// 	flight,
	// 	contact,
	// 	address,
	// 	dutyStatus,
	// 	status,
	// 	reason,
	// 	directedBy,
	// 	COVIDHotline,
	// 	dateIdentified,
	// 	observationPeriod,
	// 	returnToDuty,
	// 	dateTested,
	// 	result,
	// ) {
	// 	vitals: {
	// 		this.uid = uid; // Num
	// 		this.name = name; // String
	// 		this.flight = flight; // String w/ input masking
	// 		this.contact = contact; // String, data mask so only German style phone numbers or @us.af.mil emails are accepted
	// 		this.address = address; // String w/ input masking
	// 		this.dutyStatus = dutyStatus; // String w/ list of choices
	// 	};
	// 	observation: {
	// 		this.status = status; // 'Quarantine' or 'Isolation'
	// 		this.reason = reason; // String
	// 		this.directedBy = directedBy; // String w/ list of choices
	// 		this.COVIDHotline = COVIDHotline; // Bool
	// 	};
	// 	dates: {
	// 		this.dateIdentified = dateIdentified; // Date
	// 		this.observationPeriod = observationPeriod; // Date range
	// 		this.returnToDuty = returnToDuty; // Date
	// 		this.dateTested = dateTested; // Date
	// 		this.result = result; // Pos, Neg or Null
	// 	}
	// };

	// Set up a data struct to hold members, an array of objects
	var cases = [];

	return {
		// Function for adding a new item
		addItem: function (nm, fl, cnt, st, rsn, dirby) {
			var newItem, UID;
			UID = 0;
			// UID = last UID + 1
			// Create a new UID
			// If the length of the cases array is > 0, find the last object in the array, take its id and add 1 to it, else set the ID to 0 because the array is empty
			if (cases.length > 0) {
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
	// Declaring reusable variables in an object
	var DOMStrings = {
		name: `.add__name`,
		flight: `.add__flight`,
		contact: `.add__contact`,
		status: `.status__type`,
		reason: `.iso__quara__reason`,
		directedBy: `.directed__by`,
		caseList: `.case__list`,
	};

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

		// addListItem adds the item to the list and displays it
		addListItem: function (obj) {
			// Declare vars
			var html, newHtml, element;

			// Set up variables
			element = DOMStrings.caseList;
			html = `<div class="member" id=case__%uid%><div class="member__name">Name: %name%</div><div class="member__flight">Flight: %flight%</div><div class="member__contact">Contact: %contact%</div><div class="member__status">Status: %status%</div><div class="member__reason">Reason: %reason%</div><div class="member__directedby">Directed by: %directedBy%</div><div class="separator">--------------------</div></div>`;

			// Replace placeholders in the string with actual data
			// newHtml = html.replace(`%name%`, obj.inputName);
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
			document
				.querySelector(element)
				.insertAdjacentHTML(`beforeend`, newHtml);
		},

		// exporter function for the domStrings object
		getDOMStrings: function () {
			return DOMStrings;
		},
	};
})();

// GLOBAL CONTROLLER
var controller = (function (dataCtrl, frontCtrl) {
	// Calling stuff from the others
	var input, newItem;

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
	};

	return {
		init: function () {
			setupEventListeners();
			console.log(`The application has initialized successfuly`);
		},
	};
})(dataController, frontController);

controller.init();
