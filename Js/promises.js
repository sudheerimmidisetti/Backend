function getUserdetails(id) {
    return new Promise((resolve, reject) => {
        resolve({ userRoll: "678" });
        console.log("getting user details from database", id);
    })
}

function getUserSubjects(userRoll) {
    return new Promise((resolve, reject) => {
        resolve({ subjectID: "Maths" });
        console.log("getting user subjects from database", userRoll);
    })
}

function getUsermarks(subjectID) {
    return new Promise((resolve, reject) => {
        resolve("getting user marks for the required subject ", subjectID);
        console.log("getting user marks for the required subject ", subjectID);
    })
}

getUserdetails("123").then((result) => {
    return getUserSubjects(result.userRoll)
}).then((result) => {
    return getUsermarks(result.subjectID)
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

// const promise = new Promise(function(resolve, reject) {
//     if(true) {
//         resolve("Promise resolved successfully");
//     } else {
//         reject("Promise rejected");
//     }
// });
// promise.then(function(successMessage) {
//     console.log(successMessage);
// }).catch(function(errorMessage) {
//     console.log(errorMessage);
// });
/*

Promises:
A promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
A promise has mainly two states:
1. Resolve: whenever the api response is successfull
2. Reject: whenever the api response is failed or resulted in an error
Syntax:
const promise = new Promise((resolve, reject) => {
    if (true) {
        resolve("success call and api call was successful")
    } else {
        reject("error call and api call failed")
    }
})
*/