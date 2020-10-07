# Resolute Lion

## A dynamic and scalable web database to track illness cases.

## Current version: 0.1.1 (Alpha)
Basic functionality available: users can enter basic data and commit it to the webpage. The data is saved in a volatile database and displayed on screen. All data is lost on page reload (by design, for now).

### To do:
1. Frontend
    - **ADD CASE FUNCTION**
    - Clear input fields after the "Add case" button is clicked
    - Add input fields to include entire desired goal Case object
    - **EDIT CASE FUNCTIONALITY**
    - Create a modal template for adding and editing cases
    - Allow sorting and counting of cases by criteria (probably a `foreach` loop to search the JSON file)
2. Backend
    - **PERMANENT DATA STRUCT**
    - Write data to JSON file
    - Load data from JSON file (on load, so it will have to be in `init()`)
    - **QOL: IMPORTING EXISTING DATA**
    - Write importer function for sharepoint list (either via DOM Manipulation or quickly dumping all data with JQuery-SPServices).
        - Possibly loading from CSV?
3. Main
    - Figure out correct date notation for the prototype
    - Generate report for pushing up
        - Does format matter?
        - Can we get weird with it?
        - **REQUIRED STATS**
            1. Positive cases
            2. Pending cases
            3. Isolation cases
            4. Negative cases
            5. Members on quarters
        - Should the above stats be only in the report or does the customer want the stats to be presented somewhere? Possibly updated live?
4. CSS
    - Build out basic design
    - Find/design graphical assets for buttons, background, etc.
5. HTML
    - Learn it Q_Q
    - Re-enable edit case button
    - Re-enable the generate report button
6. General
    - Use Git for the project

### Issues:
- **RESOLVED:** In the Data Controller, UID assignment is broken.
    - It correctly steps thru the `if else` statement but fails to do the math to determine the UID correctly.
    - The intent is to design a UID assigner that avoids duplicates from the start, see below for code line.
    - `UID = cases[cases.length - 1].id + 1` `(app.js:88)`
    - The expected behavior is to look at the last object in the `cases` array, read its UID and assign a value of UID + 1.
    - This avoids a potential future bug where if a case is deleted from somewhere in the table that is not the last case we will have duplicate UIDs
    - `Check the line of code for correct syntax, I might be trying to read an unavailable property that cant be coerced to a num`
- **RESOLVED:** Inputs not pushing to the DOM
    - Right now the input is getting successfully captured, the newItem is being created on the backend and is visible in the array (UID fault notwithstanding), but it fails to read anything other than the directedBy field when updating the DOM. 
    - **Solution**: `I was manipulating the wrong string when updating the template HTML in the Frontend Controller`
