import { alreadyLogedinCheck, confirmEmailUsername, editUser, emailUsernameAlreadyRegistered, findUserById, findUserWithKey, loginUser, logoutUser, passwordUpdate, registerUser } from "../Models/TeacherAuthModel.js";
import { inputValidation1, inputValidation2 } from "../Utils/Validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Teacher Signup
const teacherSignupController = async (req, res) => {
    console.log("Teacher Register",req.body);
    let { name, email, username, password, confirm, role, gender, subject, institution, doj} = req.body;

    try {
        await inputValidation1({ name, email, username, password });
    } catch (error) {
        return res.send({
            status: error.code,
            message: error.message,
        });
    }

    try {
        let user = await emailUsernameAlreadyRegistered({ email, username });
    } catch (error) {
        return res.send({
            status: error.code,
            message: error.message,
        });
    }

    try {
        let data = await registerUser({ name, email, username, password, role, gender, subject, institution, doj });

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

//Teacher Details Edit
const teacherEditProfileController = async (req, res) => {
  let { id, name, email, role, gender, subject, institution, doj } = req.body;

    try {
        if(!id) {
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
        let data = await editUser({ id, name, email, role, gender, subject, institution, doj });

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

//Teacher email , username confirm and generate jwttoken for password change
const teacherConfirmAccessController = async (req, res) => {
    let { userId } = req.body;

    try {
        let data = await findUserWithKey({userId});

        if (!data) {
            return res.send({
                status: 404,
                message: "User not found",
            });
        }

        let jwtToken = jwt.sign({data}, process.env.SECRET_KEY);      // { expiresIn: "5m"}

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

//Teacher Password update
const teacherUpdatePasswordController = async (req, res) => {
    let { userId, token, password } = req.body;
    let decode = jwt.verify(token,process.env.SECRET_KEY);

    console.log(decode,userId !== decode.data.username, userId !== decode.data.email, userId !== decode.data.username || userId !== decode.data.email )

    if( userId !== decode.data.username && userId !== decode.data.email ) {
        return res.send({
            status: 404,
            message: "User not found",
        });
    }

    let id = decode.data._id;

    try {
        let data = await passwordUpdate({ id, password });

        return res.send({
            status: 200,
            message: "Password reset successfully ",
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: error || "Internal server error",
        });
  }
};

//Teacher Login
const teacherLoginController = async (req, res) => {
    let { userId, password } = req.body;
  
    if (!userId || !password) { 
        return res.send({
            status: 400,
            message: "UserId and password are required",
        });
    }

    try {
        let data = await findUserWithKey({userId});

        if (!data) {
            return res.send({
                status: 404,
                message: "User not found",
            });
        }

    let passwordCompare = await bcrypt.compare(password,data.password);
    console.log("passwordcompare",passwordCompare)

    if(!passwordCompare) {
        return res.send({
            status: 401,
            message: "Incorrect password"
        });
    }

    await alreadyLogedinCheck({loginId: data._id});

    let token = jwt.sign({data},process.env.SECRET_KEY);       // ,{ expiresIn: "1d" });

    await loginUser({loginId: data._id, token});

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
        });
    }
};

//Teacher Logout
const teacherLogoutController = async (req, res) => {
    let { id } = req.body;
    try {
        await logoutUser({ id });

        return res.send({
            status: 200,
            message: "Logout successful",
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
};

export {
  teacherSignupController,
  teacherEditProfileController,
  teacherConfirmAccessController,
  teacherUpdatePasswordController,
  teacherLoginController,
  teacherLogoutController,
};
