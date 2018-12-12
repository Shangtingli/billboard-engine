import React, { Component } from 'react';
import TopBar from './TopBar';
import ArtistsPlatForm from './PlatForms/ArtistsPlatForm';
import '../styles/App.css';
import SongPlatForm from './PlatForms/SongPlatForm';
import WeekPlatForm from './PlatForms/WeekPlatForm';
import logo from '../assets/logo.svg';
//TODO: Write PropTypes For all the Components

class App extends Component {
    constructor(props){
        super(props);
        this.state = {platform :'NAME'}
        this.changeContext = this.changeContext.bind(this)
    }

    changeContext(platform){
        this.setState({platform: platform})
    }

    getPlatForm(){
        if (this.state.platform === 'NAME'){
            return <ArtistsPlatForm/>
        }
        else if (this.state.platform === 'SONG'){
            return <SongPlatForm/>
        }
        else if (this.state.platform === 'WEEK'){
            return <WeekPlatForm/>
        }
        else{
            return (
                <div>
                    Something is wrong with getPlatForm function
                </div>
            )
        }
    }
  render() {
    return (
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <p className="App-title">BILLBOARD SEARCH ENGINE</p>
          </header>
         <TopBar changeContext = {this.changeContext}/>
          {this.getPlatForm()}
      </div>
    );
  }
}

export default App;
