import React from 'react';

class TopBar extends React.Component{
    onChangeArtists = ()=>{
        this.props.changeContext("NAME")
    }

    onChangeSong = ()=>{
        this.props.changeContext("SONG")
    }

    render(){
        return(
            <div className = "topBar-container">
                <strong className = "topBar-instruction"> Search the Records By: </strong>
          <div className = "topBar-button-container">
              <button onClick = {this.onChangeArtists}>
                Artists
            </button>
              <button onClick = {this.onChangeSong}>
                Song
            </button>

          </div>
            </div>
        )
    }
}


export default TopBar;