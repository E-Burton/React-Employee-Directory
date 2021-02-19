import axios from "axios";
let data;

axios({
    method: "get",
    url: "https://randomuser.me/api/?nat=us,gb,ca&exc=login,registered,cell&results=5",
    responseType: "json"
})
    .then(response => {
        data = response.data.results;
        console.log(response.data.results);
    })
    .catch(error => {
        console.log(error);
    })

export default data;