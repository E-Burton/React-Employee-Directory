import axios from "axios";

export default {
    getData: () => {
        return axios({
            method: "get",
            url: "https://randomuser.me/api/?nat=us,gb,ca&exc=gender,login,registered,cell&results=5",
            responseType: "json"
        })
    }
};
