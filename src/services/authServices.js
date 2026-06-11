import  movieInstance from "../api/axiosInstance";

async function userRegister(user) {
    try {
        const res = await movieInstance.get(`/users?email=${user.email}`)
        if (res.data.length) {
            throw new Error("This email is already registered !");
        };
        const newUser = await movieInstance.post("/users", user);
        return newUser.data
    } catch (error) {
        console.error(error.message || "An error occured new user create operation !");
    }
};

async function userLogin(user) {
    try {
        const newUser = await movieInstance.get(`/users?email=${user.email}&password=${user.password}`)
        if (!newUser.data.length) {
            throw new Error("Email or password id invalid !");
        };
        return newUser.data[0]
    } catch (error) {
        throw new Error(error.message || " Email or password wrong ! ") 
    }
};

export {
    userRegister,
    userLogin
};