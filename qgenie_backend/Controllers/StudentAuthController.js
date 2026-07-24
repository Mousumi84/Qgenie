import { inputValidation1, inputValidation2 } from "../Utils/Validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { alreadyLogedinCheckStd, editUserStd, emailUsernameAlreadyRegisteredStd, findUserWithKeyStd, loginUserStd, logoutUserStd, passwordUpdateStd, registerUserStd } from "../Models/StudentAuthModel.js";

//Student Signup
const studentSignupController = async (req, res) => {
    // console.log("Student Register",req.body);
    let { name, email, username, password, role, gender, gradelevel, institution, dob } = req.body;

    try {
        await inputValidation1({ name, email, username, password });
    } catch (error) {
        return res.send({
            status: error.code,
            message: error.message,
        });
    }

    try {
        let user = await emailUsernameAlreadyRegisteredStd({ email, username });
    } catch (error) {
        return res.send({
            status: error.code,
            message: error.message,
        });
    }

    try {
        let data = await registerUserStd({ name, email, username, password, role, gender, gradelevel, institution, dob });

        return res.send({
            status: 201,
            message: "User registered successfully",
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
};

//Student Details Edit
const studentEditProfileController = async (req, res) => {
    let { id, name, email, role, gender, gradelevel, institution, dob } = req.body;

    try {
        if (!id) {
            return res.send({
                status: 404,
                message: "User id is required",
            });
        }

        await inputValidation2({ name, email });
    } catch (error) {
        return res.send({
            status: error.code,
            message: error.message,
        });
    }

    try {
        let data = await editUserStd({ id, name, email, role, gender, gradelevel, institution, dob });

        return res.send({
            status: 200,
            message: "User details updated successfully ",
            data: data,
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
};

//Student email , username confirm and generate jwttoken for password change
const studentConfirmAccessController = async (req, res) => {
    let { userId } = req.body;

    try {
        let data = await findUserWithKeyStd({ userId });

        if (!data) {
            return res.send({
                status: 404,
                message: "User not found",
            });
        }

        let jwtToken = jwt.sign({ data }, process.env.SECRET_KEY);           //   ,{ expiresIn: "5m"}

        return res.send({
            status: 200,
            message: "User details confirm",
            jwtToken: jwtToken,
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
};

//Student Password update
const studentUpdatePasswordController = async (req, res) => {
    let { userId, token, password } = req.body;
    let decode = jwt.verify(token, process.env.SECRET_KEY);

    console.log(decode, userId !== decode.data.username, userId !== decode.data.email, userId !== decode.data.username || userId !== decode.data.email)

    if (userId !== decode.data.username && userId !== decode.data.email) {
        return res.send({
            status: 404,
            message: "User not found",
        });
    }

    let id = decode.data._id;

    try {
        let data = await passwordUpdateStd({ id, password });

        return res.send({
            status: 200,
            message: "Password reset successfully ",
        });
    } catch (error) {
        console.log("error =>", error)
        return res.send({
            status: 500,
            message: error || "Internal server error",
            error: error,
        });
    }
};

//Student Login
const studentLoginController = async (req, res) => {
    let { userId, password } = req.body;

    if (!userId || !password) {
        return res.send({
            status: 400,
            message: "UserId and password are required",
        });
    }

    try {
        let data = await findUserWithKeyStd({ userId });

        if (!data) {
            return res.send({
                status: 404,
                message: "User not found",
            });
        }

        let passwordCompare = await bcrypt.compare(password, data.password);
        console.log("passwordcompare", passwordCompare)

        if (!passwordCompare) {
            return res.send({
                status: 401,
                message: "Incorrect password"
            })
        }

        await alreadyLogedinCheckStd({ loginId: data._id });

        let token = jwt.sign({ data }, process.env.SECRET_KEY);       // ,{ expiresIn: "1d" });

        await loginUserStd({ loginId: data._id, token });

        // remove password
        const user = data.toObject();
        delete user.password;

        return res.send({
            status: 200,
            message: "Login successful",
            data: user,
            token: token,
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: error.message || "Internal server error",
            error: error,
        });
    }
};

//Student Logout
const studentLogoutController = async (req, res) => {
    let { id } = req.body;
    try {
        await logoutUserStd({ id });

        return res.send({
            status: 200,
            message: "Logout successful",
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        });
    }
};

export {
    studentSignupController,
    studentEditProfileController,
    studentConfirmAccessController,
    studentUpdatePasswordController,
    studentLoginController,
    studentLogoutController,
};
