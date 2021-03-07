// Dependencies
import MaterialTable from "material-table";
import React, {Component} from "react";
import API from "../utils/API.js";

const columns = [
    {
        title: "First Name",
        field: "name.first"
    },
    {
        title: "Last Name",
        field: "name.last"
    },
    {
        title: "Location",
        field: "location.country"
    },
    {
        title: "Phone",
        field: "phone"
    },
    {
        title: "Email",
        field: "email"
    }, 
    {
        title: "DOB",
        field: "dob.date"
    }
]

export default class TableData extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        API.getData()
            .then(result => {
                console.log("API Data: ", result.data.results);
                this.setState({
                    data: result.data.results
                })
            })
    };
    
    render() {

        const {data} = this.state;

        return (
            <div>
                <MaterialTable 
                    title="Employee Directory" 
                    data={data} 
                    columns={columns}
                    options={{search: true, paging: false, filtering: true, exportButton: true}}
                />
            </div>
        )
    }
};

