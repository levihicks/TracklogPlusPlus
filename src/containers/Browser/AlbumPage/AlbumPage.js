import React, {Component} from 'react';
import BackButton from './BackButton/BackButton';
import Add from '../../../assets/icons/add.svg'
import Tracklist from './Tracklist/Tracklist';
import classes from './AlbumPage.module.css';
import axios from 'axios'; 
class AlbumPage extends Component {

    state = {
        albumInfo: null
    }

    componentDidMount () {
        const newParams = Object.fromEntries(new URLSearchParams(this.props.location.search));
        axios.get("?method=album.getinfo&artist="+newParams.artist+"&album="+newParams.title)
            .then(response => {
                this.setState({albumInfo: response.data.album});
            })
            .catch(error => {console.log(error)});
    }

    render () {
        let albumPage = <p>Loading...</p>;
        if (this.state.albumInfo){
            const album = this.state.albumInfo;
            albumPage = (
                <div className={classes.AlbumPage}>
                    <BackButton />
                    <div className={classes.AlbumInfo}>
                        <img
                        alt="Album" 
                        src={album.image[5]["#text"]}
                        />
                        <div style={{paddingLeft: "10px"}}>
                            <div className={classes.AlbumTitle}>{album.name}</div>
                            <div className={classes.AlbumArtist}>{album.artist}</div>
                            <div className={classes.AddRemoveButton}>
                                <img alt="" src={Add} className={classes.AddRemoveIcon} />
                            </div>
                        </div>
                    </div>
                    <Tracklist tracks={album.tracks.track}/>
                </div>
            );
        }

        return albumPage;
    }
}



export default AlbumPage;