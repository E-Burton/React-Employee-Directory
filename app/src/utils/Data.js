import API from "./API.js";

export default function makeData() {
        API.getData()
            .then((result) => {
                console.log("API Data: ", result.data.results);
                return (result.data.results)
            })
            .catch(error => console.log(error));
}

