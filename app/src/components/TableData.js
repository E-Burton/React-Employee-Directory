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
        field: "location.country",
        lookup: {"United States": "United States", "Canada": "Canada", "United Kingdom": "United Kingdom"},
        cellStyle: {minWidth: 200}
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
        field: "dob.date",
        render: rowData => {
            // console.log(rowData.dob.date);
            const event = new Date(rowData.dob.date);
            return event.toLocaleDateString('en-US');
        }
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
                    options={{search: true, paging: true, filtering: true, exportButton: true, headerStyle: {backgroundColor: "#248f8f", color: "#FFF"}, rowStyle: {backgroundColor: "#EEE"}}}
                />
            </div>
        )
    }
};

