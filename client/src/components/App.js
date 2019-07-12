import React, { Component } from 'react';
import TopBar from './TopBar';
import ArtistsPlatForm from './PlatForms/ArtistsPlatForm';
import '../styles/App.css';
import SongPlatForm from './PlatForms/SongPlatForm';
import Trie from './Util/Trie';
import logo from '../assets/logo.svg';
import github_logo from '../assets/github.png';
import facebook_logo from '../assets/facebook.png';
import linkedin_logo from '../assets/linkedin.png';


//TODO: Write PropTypes For all the Components
//TODO: Elastic Search Shows Intersting And Annoying Behavior when Searching
//    1. Search of Regular Expression does not meet what we expect
//    2. Search of Exact String Does not meet what we expect

class App extends Component {
    constructor(props){
        super(props);
        this.state = {platform :'NAME', artistsTrie: null, songsTrie: null};
        this.changeContext = this.changeContext.bind(this);
        this.showLoading = this.showLoading.bind(this);
    }

    componentDidMount() {
        const ArtistsEndpoint = `/api/getAllArtists`;
        const SongsEndpoint = `/api/getAllSongs`;
        Promise.all([
            fetch(ArtistsEndpoint),
            fetch(SongsEndpoint)
        ])
            .then(([res1, res2]) => Promise.all([res1.text(), res2.text()]))
            .then(([dataArtists,dataSongs])=>{
                this.setState({
                    artistsTrie: this.constructTrie(dataArtists),
                    songsTrie: this.constructTrie(dataSongs)
                });
            });
    }

    constructTrie(text){
        let trie = new Trie();
        const info = JSON.parse(text);
        for (let record of info){
            trie.insert(record['key']);
        }
        return trie;
    }
    changeContext(platform){
        this.setState({platform: platform})
    }

    showLoading(){
        return (
            <div>
                <p> Still Trying to Constuct Trie... </p>
            </div>
        )
    }
    getPlatForm(){
        if (this.state.platform === 'NAME'){
            return <ArtistsPlatForm trie={this.state.artistsTrie}/>
        }
        else if (this.state.platform === 'SONG'){
            return <SongPlatForm trie={this.state.songsTrie}/>
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
          {(this.state.artistsTrie === null && this.state.songsTrie === null) ? this.showLoading():this.getPlatForm()}
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
