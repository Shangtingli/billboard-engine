import React from 'react';
import WeekTable from "../Tables/WeekTable"
class WeekPlatForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="platform">
                <p className = "platform-prompt">
                    Enter a date you would like to know
                </p>
                <WeekTable/>
            </div>

        );
    }
}

export default WeekPlatForm;