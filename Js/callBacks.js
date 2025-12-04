/*
Today class was about the backend introduction:
Topics which are going to be covered : call back----Promises----async/await/
*/

// Callback function example
function getUserdetails(id, getUserSubjects) {
    console.log("getting user details from database", id);
    getUserSubjects({userRoll: "678"});
}

function getUserSubjects(userRoll, getUsermarks) {
    console.log("getting user subjects from database", userRoll);
    getUsermarks({subjectID: "Maths"});
}

function getUsermarks(subjectID) {
    console.log("getting user marks for the required subject ", subjectID);
}

getUserdetails("123", function(userRoll) {
    getUserSubjects(userRoll, function(subjectID) {
        getUsermarks(subjectID)
    });
});

// the callback functions are nested within each other
// which makes the code hard to read and maintain it is known as callback hell
// in order to avoid callback hell we use promises