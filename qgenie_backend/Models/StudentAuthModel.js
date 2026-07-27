import bcrypt from "bcryptjs";
import StudentModel from "../Schemas/StudentAuthSchema.js";
import StudentLoginModel from "../Schemas/StudentLoginSchema.js";



const registerUserStd = ({ name, email, username, password, role, gender, gradelevel, institution, dob }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpassword = await bcrypt.hash(password, Number(process.env.SALT));
            console.log(hashpassword);

            const DBdata = await StudentModel.create({ name, email, username, password: hashpassword, role, gender, gradelevel, institution, dob });
            console.log("StudentAuthModel line - 14 DBdata =>", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    });
};

const emailUsernameAlreadyRegisteredStd = ({ email, username }) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(email, username);
            const DBdata = await StudentModel.findOne({
                $or: [{ email: email }, { username: username }],
            });
            console.log("StudentAuthModel line - 30 DBdata =>", DBdata);

            if (DBdata && DBdata.email === email) {
                console.log("Email");
                throw { code: 409, message: "Email already registered" };
            }
            if (DBdata && DBdata.username === username) {
                console.log("Username");
                throw { code: 409, message: "Username already registered" };
            }

            resolve();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const editUserStd = ({ id, name, email, role, gender, gradelevel, institution, dob }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const DBdata = await StudentModel.findByIdAndUpdate(id,
                {
                    name,
                    email,
                    role,
                    gender,
                    gradelevel,
                    institution,
                    dob,
                },
                { new: true },
            );
            console.log("StudentAuthModel line - 64 DBdata =>", DBdata);

            if (!DBdata) {
                throw { code: 404, message: "User not found" };
            }

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    });
};

const confirmEmailUsernameStd = ({ email, username }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const DBdata = await StudentModel.findOne({
                $and: [{ email: email }, { username: username }],
            });
            console.log("StudentAuthModel line - 83 DBdata =>", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    });
};

const findUserByIdStd = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const DBdata = await StudentModel.findById(id);
            console.log("StudentAuthModel line - 96 DBdata =>", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    });
};

const passwordUpdateStd = ({ id, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpassword = await bcrypt.hash(password, Number(process.env.SALT));

            let DBdata = await StudentModel.findByIdAndUpdate(id, { password: hashpassword });
            console.log("StudentAuthModel line 111-Update password", DBdata)
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const findUserWithKeyStd = ({ userId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(userId)
            const DBdata = await StudentModel.findOne({
                $or: [{ email: userId }, { username: userId }],
            });
            console.log("StudentAuthModel line - 126 DBdata =>", DBdata);

            resolve(DBdata);
        } catch (error) {
            reject(error);
        }
    });
};

const alreadyLogedinCheckStd = ({ loginId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBdata = await StudentLoginModel.findOne({ loginId });
            console.log("StudentAuthModel line - 139 DBdata =>", DBdata);

            if (DBdata) {
                throw { code: 409, message: "User already logedin" };
            }

            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

const loginUserStd = ({ loginId, token }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DBlogin = await StudentLoginModel.create({ loginId, token })

            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

const logoutUserStd = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        console.log(id);
        try {
            let DBdata = await StudentLoginModel.findOneAndDelete({ loginId: id });

            console.log("StudentLoginModel line-169",DBdata);

            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

export {
    registerUserStd,
    emailUsernameAlreadyRegisteredStd,
    editUserStd,
    confirmEmailUsernameStd,
    findUserByIdStd,
    passwordUpdateStd,
    findUserWithKeyStd,
    alreadyLogedinCheckStd,
    loginUserStd,
    logoutUserStd
};
