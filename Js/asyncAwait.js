function getUserdetails(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({userRoll: "678"});
            console.log("getting user details from database");
        }, 2000);
    })
}

const myFun = async() => {
    console.log("Before");
    const result = await getUserdetails("123");
    console.log(result);
    console.log("After");
}

myFun();