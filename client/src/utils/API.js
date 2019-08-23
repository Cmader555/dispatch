import axios from "axios";
//import { LoginContext } from "../components/Context/loginContext.js";


export default {

    userSignUp: (data) => {
        return axios.post("/api/user/register", data);
    },
    userLogin: (data) => {
        return axios.post("/api/user/login", data);
    },

};