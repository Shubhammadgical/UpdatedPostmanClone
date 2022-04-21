import axios from "axios";

const baseURL = "https://ancient-plateau-49936.herokuapp.com";
//const baseURL = "http://localhost:2410";

function post(url, obj) {
  return axios.post(baseURL + url, obj);
}

export default {
  post,
};
