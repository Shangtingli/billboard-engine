import React, { Component } from 'react';
import TopBar from './TopBar';
import ArtistsPlatForm from './PlatForms/ArtistsPlatForm';
import '../styles/App.css';
import SongPlatForm from './PlatForms/SongPlatForm';
import WeekPlatForm from './PlatForms/WeekPlatForm';
import logo from '../assets/logo.svg';
import github_logo from '../assets/github.png';
import facebook_logo from '../assets/facebook.png';
import linkedin_logo from '../assets/linkedin.png';

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
          <div className = "Content">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <p className="App-title">BILLBOARD SEARCH ENGINE</p>
          </header>
         <TopBar changeContext = {this.changeContext}/>
          {this.getPlatForm()}
          </div>
          <footer>
              <div className="author-info-container">
                  <p className = "author-info">
                  Author: Shangting Li
                  </p>
              </div>
              <div className = 'social-logos-container'>
                  <a href = "https://github.com/Shangtingli">
                      <img src = {github_logo} className = "social-logo" id = "github-logo" alt = "Github logo" />
                  </a>
                  <a href = "https://www.facebook.com/shangting.li.94">
                      <img src = {facebook_logo} className = "social-logo" id = "facebook-logo" alt = "Facebook logo"/>
                  </a>
                  <a href = "https://www.linkedin.com/in/shangting-li-947530a4/">
                      <img src = {linkedin_logo} className = "social-logo" id = "linkedin-logo" alt = "Linkedin logo"/>
                  </a>

              </div>
          </footer>
      </div>
    );
  }
}

export default App;
