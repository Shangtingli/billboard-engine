import React from 'react';

class WeekForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            year: "",
            month: "",
            day: ""
        };
        this.resetForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm(){
        this.setState({
            year: "",
            month: "",
            day: ""
        });
    }

    handleSubmit = (event)=>{
        this.props.handleGet(event);
        this.resetForm();
    }



    //##########################################
    // Render Functions
    //##########################################
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className = "week-text-input-fields">
                <input
                    type="text"
                    value={this.state.year}
                    onChange={event => this.setState({ year: event.target.value })}
                    className = "week-text-input"
                    placeholder = "2018"
                />

                    <input
                        type="text"
                        value={this.state.month}
                        onChange={event => this.setState({ month: event.target.value })}
                        className = "week-text-input"
                        placeholder = "12"
                    />

                    <input
                        type="text"
                        value={this.state.day}
                        onChange={event => this.setState({ day: event.target.value })}
                        className = "week-text-input"
                        placeholder = "08"
                    />
                </div>
                <div className="button-container">
                    <button type="submit"  className = "submit-button" >Submit</button>
                    <button className = "cancel-button" onClick = {this.props.resetTable} type = "button"> Reset </button>
                </div>
            </form>
        );
    }
}

export default WeekForm;