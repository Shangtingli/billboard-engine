import React,{Component} from 'react';
class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            song: "",
            suggestions:[]
        };
        this.resetForm = this.resetForm.bind(this);
        this.onClickSuggestions = this.onClickSuggestions.bind(this);
    }
    //======DropDown Menu Functions========
    defineDropDownStyle(){
        if (this.state.suggestions.length === 0 || this.state.song.length ===0){
            return({
                display: 'none'
            })
        }
        else{
            return ({
                display: 'block'
            })
        }
    }

    buildSuggestions(){
        const res = []
        for(let i in this.state.suggestions){
            res.push(<li className = "suggest-items" key = {''+i} onClick = {this.onClickSuggestions}> <span>{this.state.suggestions[i]}</span> </li>)
        }
        return res;
    }

    buildSuggestionBlock(){
        return(
            <ul className = "suggest-list">
                {this.buildSuggestions()}
            </ul>
        )
    }

    getSuggestions(event){
        if (event === undefined){
            return;
        }
        const token = event.target.value;
        const endpoint = `/api/getSongSuggestion?token=${token}`;
        fetch(endpoint, {
            method: 'GET'
        }).then((response) => {
            return response.text();
        })
            .then((response) => {
                console.log(response);
                debugger;
                this.setState({
                    song: token,
                    suggestions: JSON.parse(response)['result'].map((result) => {return result['song'];})

                })})
            .catch((e) => {
                throw e
            });
    }

    onClickSuggestions(event){
        const song = event.target.textContent;
        this.setState({song:song, suggestions:[]})
    }
    //=======================================================
    resetForm(){
        this.setState({song:""});
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
                    value={this.state.song}
                    onChange={(event) => this.getSuggestions(event)}
                    className="text-input"
                    placeholder = "Thank U, Next"
                />
                <div className="dropdown-content" style = {this.defineDropDownStyle()}>
                    {(this.buildSuggestionBlock())}
                </div>
                <div className="button-container">
                    <button type="submit"  className = "submit-button" >Submit</button>
                    <button className = "cancel-button" onClick = {this.props.resetTable} type = "button"> Reset </button>
                </div>
            </form>
        );
    }
}

export default Form;