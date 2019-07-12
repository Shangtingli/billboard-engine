import React, { Component } from 'react';
import ArtistsForm from '../Forms/ArtistsForm';

class ArtistsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ""};
        this.build = this.build.bind(this);
        this.resetTable = this.resetTable.bind(this);
        this.child = React.createRef();
    }

    build(row) {
        const info = row['_source'];
        const name = info['Artist'];
        const year = info['Year'];
        const rank = info['Rank'];
        const song = info['Song'];
        const id = row['_id'];
        return (
            <tr key={id}>
                <td className="artists-name"> {name}</td>
                <td className="artists-rank"> {rank}</td>
                <td className="artists-song"> {song}</td>
                <td className="artists-awarded-week"> {year}</td>
            </tr>
        );
    }

    resetTable(){
        this.setState({data:""});
        this.child.current.resetForm();
    }

    _getData = (name) => {
        const endpoint = `/api/getArtist?artist=${name}`;
        fetch(endpoint, {
            method: 'GET'
        }).then((response) => {
            return response.text();
        })
            .then((response) => {
                this.setState({data: JSON.parse(response)});
            })
            .catch((e) => {throw e});
    }

    handleGet = (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        this._getData(name);
    }

    showDescription() {
        if (this.state.data === "") {
            return (<p className="welcome-instruction"> Welcome! Please enter a favorite artist you like. <br/>
                We will show you his or her records on billboard.
            </p>);
        }
        else if (this.state.data.length === 0)
        {
            return (<p className = "not-found-notice"> We are sorry that your artist does not show on billboard <br/>
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
        debugger;
        if (this.state.data === "" || this.state.data.length === 0){
            this.showDescription();
        }
        else{
            return (<table className = "table">
                <tbody>
                <tr>
                    <th className = "name">Name</th>
                    <th className = "rank">Rank</th>
                    <th className = "song">Awarded Song</th>
                    <th className = "week">Awarded Year</th>
                </tr>
                {this.state.data.map(this.build)}
                </tbody>
            </table>);
        }
    }

    render(){
        return(
            <div>
                <ArtistsForm handleGet={this.handleGet} resetTable = {this.resetTable} ref={this.child} trie={this.props.trie}/>
                {this.showElements()}
                {this.showDescription()}
            </div>
        );
    }

}

export default ArtistsTable;