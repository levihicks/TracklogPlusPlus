import React, {Component} from 'react';
import classes from './PopularRow.module.css';
import axios from 'axios';
import Album from '../../../../components/Album/Album';

class PopularRow extends Component {

    state = {
        popularAlbums: null
    }

    componentDidMount () {
        axios.get("?method=tag.gettopalbums&tag="+this.props.category+"&limit=5")
            .then(response => {
                this.setState({popularAlbums: response.data.albums.album});
            })
            .catch(error => {console.log(error)});
    }

    render () {
        let showcase = <p>Loading...</p>;
        if(this.state.popularAlbums){
            showcase =  this.state.popularAlbums.map(album => (
                <Album
                title={album.name} 
                artist={album.artist.name}
                key={Math.random().toString()}
                img={album.image[3]["#text"]}/>
            ))
        }
        return (
            <div className={classes.PopularRow}>
                <div className={classes.HeaderBlock}></div>
                <div className={classes.Header}>{this.props.category}</div>
                <div className={classes.Showcase}>
                    {showcase}
                </div>
            </div>
        );
    }
} 


export default PopularRow;