**The below is the full object prototype for the application**
```
var member = function 
    (uid, 
    name, 
    flight, 
    contact, 
    quarantine, 
    isolation, 
    reason, 
    directedBy, 
    dateIdentified, 
    observationPeriod, 
    RTD, 
    COVIDHotline,
    dateTested,
    result,
    status,
    dutyStatus,
    address) 
    {
        this.uid = uid;
        this.name = name;
        this.flight = flight;
        this.contact = contact;
        this.quarantine = quarantine;
        this.isolation = isolation;
        this.reason = reason;
        this.directedBy = directedBy;
        this.dateIdentified = dateIdentified;
        this.observationPeriod = observationPeriod;
        this.RTD = RTD;
        this.COVIDHotline = COVIDHotline;
        this.dateTested = dateTested;
        this.result = result;
        this.status = status;
        this.dutyStatus = dutyStatus;
        this.address = address;
    };
```

- UID - Number, increments as array is stepped thru. Always UID of last entry in data structure + 1
- Name - String
- Flight - String, max char limit 4
- Contact - String
- Quarantine - Bool
- Isolation - Bool
- Reason - String
- Directed By - String
- Date Identified - Num? String?
- Observation Period - Num? String?
- RTD - *??? Maybe a date??*
- COVID Hotline - Probably a bool to see if a person called?
- Date Tested - Num? String?
- Result - Bool - True = Pos
- Status - String w/ choices
- Duty Status - String w/ choices
- Address - I dont even know