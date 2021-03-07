// Dependencies
import React, {Component} from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {matchSorter} from 'match-sorter';
import API from "../utils/API.js";

export default class Table extends Component {
    
    state = {
        error: null,
        isLoaded: false,
        data: []
    };

    componentDidMount() {
        API.getData()
            .then(result => {
                console.log("API Data: ", result.data.results)
                this.setState({
                    isLoaded: true,
                    data: result.data.results
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true, 
                    error
                });
            })
    }

    render() {

        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
            
                <div>
                    <ReactTable 
                        data={data}
                        filterable
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]) === filter.value}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    >
                        {console.log(data)}
                        
                        columns={[
                            {
                            Header: "Name",
                            columns: [
                                {
                                Header: "First Name",
                                id: "firstName",
                                accessor: "name.first",
                                filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["firstName"]}),
                                filterAll: true
                                },
                                {
                                Header: "Last Name",
                                id: "lastName",
                                accessor: "name.last",
                                filterMethod: (filter, rows) =>
                                    matchSorter(rows, filter.value, { keys: ["lastName"] }),
                                filterAll: true
                                }
                            ]
                            },
                            {
                            Header: "Details",
                            columns: [
                                {
                                Header: "Location",
                                id: "country",
                                accessor: "location.country",
                                filterMethod: (filter, row) => {
                                    if (filter.value === "all") {
                                    return true;
                                    }
                                    if (filter.value === "Canada") {
                                        return row[filter.id] === 'Canada';
                                    }   else if (filter.value === "United Kingdom") {
                                        return row[filter.id] === "United Kingdom"
                                    }   else {
                                        return row[filter.id] === "United States"
                                    }
                                },
                                Filter: ({ filter, onChange }) =>
                                    <select
                                        onChange={event => onChange(event.target.value)}
                                        style={{ width: "100%" }}
                                        value={filter ? filter.value : "all"}
                                    >
                                        <option value="all">Show All</option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States">United States</option>
                                    </select>
                                }
                            ]
                            },
                            {
                                Header: "Phone",
                                accessor: "phone",
                            },
                            {
                                Header: "Email",
                                accessor: "email"
                            },
                            {
                                Header: "DOB",
                                id: "dob",
                                accessor: "dob.date"
                            },
                        ]}
                    </ReactTable>
                </div>
            );
        }
    };
}