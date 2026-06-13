const validateEmail = (email) => {
    const isEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        email
      );
    return isEmail;
};

const inputValidation1 = ({name, email, username, password} ) => {
    return new Promise((resolve,reject) => {

        if(!name || !email || !username || !password) {
            reject({
                message: "Important cridentials are missing",
                code: 400
            });
        }

        if(typeof(name) !== "string" ) {
            reject({
                message: "Incorrect formate of name",
                code: 400
            });
        }
        if(typeof(username) !== "string" ) {
            reject({
                message: "Incorrect formate of username",
                code: 400
            });
        }
        if(typeof(email) !== "string" ) {
            reject({
                message: "Incorrect formate of email",
                code: 400
            });
        }
        if(typeof(password) !== "string" ) {
            reject({
                message: "Incorrect formate of password",
                code: 400
            });
        }

        if(username.length <5 || username.length >12) {
            reject({
                message: "username length should be 5-12 character",
                code: 400
            });
        }

        if(!validateEmail(email)) {
            reject({
                message: "Incorrect formate of email",
                code: 400
            });
        }

        resolve();
    })
}

const inputValidation2 = ({name, email} ) => {
    return new Promise((resolve,reject) => {

        if(name && typeof(name) !== "string" ) {
            reject({
                message: "Incorrect formate of name",
                code: 400
            });
        }
        if(email && typeof(email) !== "string" ) {
            reject({
                message: "Incorrect formate of email",
                code: 400
            });
        }

        if(email && !validateEmail(email)) {
            reject({
                message: "Incorrect formate of email",
                code: 400
            });
        }

        resolve();
    })
}

export {inputValidation1, inputValidation2};