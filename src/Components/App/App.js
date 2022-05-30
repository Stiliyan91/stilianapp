import React from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import  Playlist  from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
class App extends React.Component {
  constructor(props){
    super(props);
this.state= {
  SearchResults: [],
  playlistName: '',
  playlistTrack:[],
}
this.addTrack=this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlaylistName = this.updatePlaylistName.bind(this);
this.savePlaylist = this.savePlaylist.bind(this);
this.search = this.search.bind(this);
  }

  addTrack(track){
let tracks = this.state.playlistTrack;
if (tracks.find(savedTrack  => savedTrack.id === track.id)) {
  return;
}
    track.push(track);
this.setState({playlistTrack: tracks});

  }

removeTrack(track){
  let tracks = this.state.playlistTrack;
  tracks= tracks.filter(currentTrack => currentTrack.id !== track.id);
this.setState({playlistTracks: tracks});
}

updatePlaylistName(name){
this.setState({playlistName: name});

}
savePlaylist(){
  const trackUris = this.state.playlistTrack.map(track => track.uri);
  Spotify.savePlaylist(this.state.playlistName, trackUris);
  this.setState({
    playlistName: 'New Playlist',
    playlistTracks: [],
  });
  document.querySelectorAll('input')[1].value = 'New Playlist';


}

search(term){
Spotify.search(term).then(SearchResults =>{
this.setState({SearchResults: SearchResults});

});



}
  render(){
    return(
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      < SearchResults SearchResults={this.state.SearchResults}
      onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName}
      playlistTrack={this.state.playlistTrack}
      onRemove={this.removeTrack}
      onNameChange={this.updatePlaylistName}
      onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
    )
  }
}

export default App;
