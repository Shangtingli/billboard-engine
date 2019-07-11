import React,{Component} from 'react';
class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            song: ""
        };
        this.resetForm = this.resetForm.bind(this);
        // this.onClickSuggestions = this.onClickSuggestions.bind(this)
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    //
    // onClickSuggestions(event){
    //     const song = event.target.textContent;
    //     this.setState({song:song})
    // }
    //=======================================================
    resetForm(){
        this.setState({song:""});
    }

    handleSubmit = (event)=>{
        this.props.handleGet(event);
        this.resetForm();
    }

    onChangeInput = (event) =>{
        event.preventDefault();
        this.setState({song:event.target.value});
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.song}
                    onChange={this.onChangeInput}
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