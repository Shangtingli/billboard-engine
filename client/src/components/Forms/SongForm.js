import React,{Component} from 'react';
class Form extends Component{
    constructor(props){
        super(props);
        this.state = {get_req: ""};
        this.resetForm.bind(this);

    }

    resetForm(){
        this.setState({get_req:""});
    }

    handleSubmit = (event)=>{
        this.props.handleGet(event);
        this.resetForm();
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.get_req}
                    onChange={event => this.setState({ get_req: event.target.value })}
                    className="text-input"
                    placeholder = "Thank U, Next"
                />

                <div className="button-container">
                    <button type="submit"  className = "submit-button" >Submit</button>
                    <button className = "cancel-button" onClick = {this.props.resetTable} type = "button"> Reset </button>
                </div>
            </form>
        );
    }
}

export default Form;