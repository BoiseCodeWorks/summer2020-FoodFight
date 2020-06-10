import Axios from "axios";

let baseUrl = location.host.includes("localhost")
    ? "http://localhost:3000/"
    : "/";

let api = Axios.create({
    baseURL: baseUrl + "api",
    timeout: 3000,
    withCredentials: true
});



export default api