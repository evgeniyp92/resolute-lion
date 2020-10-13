// The below is the full object prototype for the application

var member = function (
    uid,
    name,
    flight,
    contact,
    address,
    dutyStatus,
    status,
    reason,
    directedBy,
    COVIDHotline,
    dateIdentified,
    observationPeriod,
    returnToDuty,
    dateTested,
    result,
) {
    vitals: {
        this.uid = uid; // Num
        this.name = name; // String
        this.flight = flight; // String w/ input masking
        this.contact = contact; // String, data mask so only German style phone numbers or @us.af.mil emails are accepted
        this.address = address; // String w/ input masking
        this.dutyStatus = dutyStatus; // String w/ list of choices
    };
    observation: {
        this.status = status; // 'Quarantine' or 'Isolation'
        this.reason = reason; // String
        this.directedBy = directedBy; // String w/ list of choices
        this.COVIDHotline = COVIDHotline; // Bool
    };
    dates: {
        this.dateIdentified = dateIdentified; // Date
        this.observationPeriod = observationPeriod; // Date range
        this.returnToDuty = returnToDuty; // Date
        this.dateTested = dateTested; // Date
        this.result = result; // Pos, Neg or Null
    }
};

/**
 * Member Vitals:
 * UID
 * Name
 * Flight
 * Contact
 * Address
 * Status
 * Duty Status
 * 
 * Initial observation details:
 * Status => Quara/Iso
 * Reason
 * Directed By
 * COVID Hotline => Bool
 * Result => Bool
 * 
 * Date tracking related:
 * Date identified
 * Observation period
 * Return to duty
 * Date Tested
 */

// - UID - Number, increments as array is stepped thru. Always UID of last entry in data structure + 1 *
// - Flight - String, max char limit 4 *
// - Contact - String *
// - Quarantine - Bool *
// - Isolation - Bool *
// - Reason - String *
// - Directed By - String *
// - Date Identified - Num? String? *
// - Observation Period - Num? String? *
// - RTD - *??? Maybe a date??* Return to duty? *
// - COVID Hotline - Probably a bool to see if a person called? *
// - Date Tested - Num? String? *
// - Result - Bool - True = Pos *
// - Status - String w/ choices
// - Duty Status - String w/ choices
// - Address - I dont even know *
