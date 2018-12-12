import React, { Component } from 'react';
import WeekForm from '../Forms/WeekForm';

class WeekTable extends Component {
    constructor(props) {
        super(props);
        this.state = {data: "", isInputValid: "none"};
        this.build = this.build.bind(this);
        this.resetTable = this.resetTable.bind(this);
        this.child = React.createRef();
    }
    //##########################################
    // Utility Functions

    validateInput(year,month,day){
        if (year.length === 0 || month.length === 0 || day.length === 0){
            return "MISSING_ENTRIES";
        }
        const now = new Date();
        const date_now = now.getDate();
        const month_now = now.getMonth()+1;
        const year_now = now.getFullYear();
        if (isNaN(parseInt(year)) || isNaN(parseInt(month)) || isNaN(parseInt(day)) ){
            return "INVALID_DATE";
        }
        if (parseInt(year) > year_now || parseInt(month) > month_now || parseInt(day) > date_now ){
            debugger;
            return "OUT_OF_RANGE";
        }

        return "valid";
    }

    getLastSat(d) {
        if (d.getDay() === 6){
            return d;
        }
        const t = new Date(d);
        t.setDate(t.getDate() - t.getDay() - 1);
        return t;
    }

    constructDate(d){
        const int_year = d.getFullYear();
        const int_month = d.getMonth() + 1;
        const int_day = d.getDate();
        const string_month = (int_month < 10) ? ('0' + int_month):(''+int_month);
        const string_day = (int_day < 10) ? ('0' + int_day):(''+int_day);
        const string_year = (''+int_year);
        return `${string_year}-${string_month}-${string_day}`;
    }
    //##########################################
    build(row) {
        const name = row['name'];
        const week = row['week'];
        const rank = row['rank'];
        const song = row['song'];
        const id = row['id'];
        return (
            <tr key={id}>
                <td className="artists-name"> {name}</td>
                <td className="artists-rank"> {rank}</td>
                <td className="artists-song"> {song}</td>
                <td className="artists-awarded-week"> {week}</td>
            </tr>
        );
    }

    resetTable(){
        this.setState({data:"",isInputValid: "none"});
        this.child.current.resetForm();
    }

    _getData = (date) => {
        const endpoint = `/api/getWeek?week=${date}`;
        fetch(endpoint, {
            method: 'GET'
        }).then((response) => {
            return response.text();
        })
            .then((response) => {
                console.log(response);
                this.setState({data: JSON.parse(response)['result'], isInputValid: "valid"});
            })
            .catch((e) => {throw e});
    }

    handleGet = (event) => {
        const year = event.target[0].value;
        const month = event.target[1].value;
        const day = event.target[2].value;
        const inputState = this.validateInput(year,month,day);
        if (inputState !== "valid"){
            this.setState({data: "" ,isInputValid: inputState});
            return;
        }
        const int_year = parseInt(year);
        const int_month = parseInt(month);
        const int_day = parseInt(day);
        const last_Saturday = this.getLastSat(new Date(int_year,int_month - 1, int_day));
        const date_string = this.constructDate(last_Saturday);
        event.preventDefault();
        this._getData(date_string);
    }

    showDescription() {
        if (this.state.data === "" && this.state.isInputValid === "none") {
            return (<p className="welcome-instruction"> Welcome! Please enter a date you would like to know.<br/>
                We will show the record of that week.
            </p>);
        }
        else if (this.state.isInputValid !== "valid"){
            return (
                <p className="error-notice">
                    Error in Input of Date: {this.state.isInputValid};
            </p>
            );
        }
        else if (this.state.data.length === 0)
        {
            return (<p className = "not-found-notice"> We are sorry that your week does not show on range of billboard <br/>
                For the selected time period </p>);
        }
        else{
            return (
                <div>
                    Something is Wrong with Show Description!
                </div>
            );
        }
    }

    showElements(){
        if (this.state.data === "" || this.state.data.length === 0){
            this.showDescription();
        }
        else{
            return (<table className = "table">
                <tbody>
                <tr>
                    <th className = "artists-name">Name</th>
                    <th className = "artists-rank">Rank</th>
                    <th className = "artists-song">Awarded Song</th>
                    <th className = "artists-awarded-week">Awarded Week</th>
                </tr>
                {this.state.data.map(this.build)}
                </tbody>
            </table>);
        }
    }

    render(){
        return(
            <div>
                <WeekForm handleGet={this.handleGet} resetTable = {this.resetTable}  ref={this.child}/>
                {this.showElements()}
                {this.showDescription()}
            </div>
        );
    }

}

export default WeekTable;