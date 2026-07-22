import TeacherModel from "../Schemas/TeacherAuthSchema.js";
import bcrypt from "bcryptjs";
import TeacherLoginModel from "../Schemas/TeacherLoginSchema.js";



const registerUser = ({ name, email, username, password, role, gender, subject, institution, doj }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashpassword = await bcrypt.hash(password, Number(process.env.SALT));
      console.log(hashpassword);

      const DBdata = await TeacherModel.create({ name, email, username, password: hashpassword, role, gender, subject, institution, doj });
      console.log("AuthModel line - 14 DBdata =>", DBdata);

      resolve(DBdata);
    } catch (error) {
      reject(error);
    }
  });
};

const emailUsernameAlreadyRegistered = ({ email, username }) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(email, username);
      const DBdata = await TeacherModel.findOne({
        $or: [{ email: email }, { username: username }],
      });
      console.log("AuthModel line - 30 DBdata =>", DBdata);

      if (DBdata && DBdata.email === email) {
        console.log("Email");
        throw  {code: 409, message: "Email already registered" };
      }
      if (DBdata && DBdata.username === username) {
        console.log("Username");
        throw  {code: 409, message: "Username already registered" };
      }

      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const editUser = ({ id, name, email, role, gender, subject, institution, doj }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const DBdata = await TeacherModel.findByIdAndUpdate(id,
        {
          name,
          email,
          role,
          gender,
          subject,
          institution,
          doj,
        },
        { new: true },
      );
      console.log("AuthModel line - 64 DBdata =>", DBdata);

      if (!DBdata) {
        throw  {code: 404, message: "User not found" };
      }

      resolve(DBdata);
    } catch (error) {
      reject(error);
    }
  });
};

const confirmEmailUsername = ({ email, username }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const DBdata = await TeacherModel.findOne({
        $and: [{ email: email }, { username: username }],
      });
      console.log("AuthModel line - 83 DBdata =>", DBdata);

      resolve(DBdata);
    } catch (error) {
      reject(error);
    }
  });
};

const findUserById = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const DBdata = await TeacherModel.findById(id);
      console.log("AuthModel line - 96 DBdata =>", DBdata);

      resolve(DBdata);
    } catch (error) {
      reject(error);
    }
  });
};

const passwordUpdate = ({ id, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashpassword = await bcrypt.hash(password, Number(process.env.SALT));

      let DBdata = await TeacherModel.findByIdAndUpdate(id, { password: hashpassword });
      console.log("AuthModel line 111-Update password",DBdata)
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const findUserWithKey = ({ userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(userId)
      const DBdata = await TeacherModel.findOne({
        $or: [{ email: userId }, { username: userId }],
      });
      console.log("AuthModel line - 126 DBdata =>", DBdata);

      resolve(DBdata);
    } catch (error) {
      reject(error);
    }
  });
};

const alreadyLogedinCheck = ({loginId}) => {
  return new Promise(async (resolve,reject) => {
    try {
      let DBdata = await TeacherLoginModel.findOne({loginId});
      console.log("AuthModel line - 139 DBdata =>", DBdata);

      if(DBdata) {
        throw  {code: 409, message: "User already logedin"};
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

const loginUser = ({loginId, token}) => {
  return new Promise(async (resolve,reject) => {
    try {
      let DBlogin = await TeacherLoginModel.create({loginId, token})

      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

const logoutUser = ({id}) => {
  return new Promise(async (resolve,reject) => {
    try {
      let DBdata = await TeacherLoginModel.deleteOne({loginId: id});

      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

export {
  registerUser,
  emailUsernameAlreadyRegistered,
  editUser,
  confirmEmailUsername,
  findUserById,
  passwordUpdate,
  findUserWithKey,
  alreadyLogedinCheck,
  loginUser,
  logoutUser
};
