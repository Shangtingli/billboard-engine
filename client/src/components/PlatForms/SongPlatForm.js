import React from 'react';
import SongTable from "../Tables/SongTable"
class SongPlatForm extends React.Component{
    render(){
        return(
            <div className="platform">
                <p className = "platform-prompt">
                    Enter a favorite song:
                </p>
                <SongTable trie={this.props.trie}/>
            </div>

        );
    }
}

export default SongPlatForm;