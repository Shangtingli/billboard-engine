import React from 'react';
import ArtistsTable from "../Tables/ArtistsTable"


class ArtistsPlatForm extends React.Component{
    render(){
        return(
        <div className="platform">
            <p className = "platform-prompt">
                Enter a favorite artist:
            </p>
            <ArtistsTable trie={this.props.trie}/>
        </div>

        );
    }
}

export default ArtistsPlatForm;