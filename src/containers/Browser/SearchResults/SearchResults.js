import React, { Component } from 'react';
import lastFmAxios from '../../../axios/lastFm';
import classes from './SearchResults.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Album from '../../../components/Album/Album';

class SearchResults extends Component {

    state = {
        query: null,
        result: null
    }

    getAlbums = () => {
        if (typeof(this.props.query)==="string") {
            lastFmAxios.get("?method=album.search&album="+this.props.query)
            .then( response => {
                let albums = response.data.results.albummatches.album;
                let result = albums.map(album => (
                    <Album title={album.name} 
                    artist={album.artist}
                    key={Math.random().toString()}
                    img={album.image[3]["#text"]}/>
                ));
                this.setState((prevState, prevProps)=>{
                    if (prevProps.query !== prevState.query)
                        return {query: this.props.query, result: result};
                });
            })
            .catch( error => {
                console.log(error);
            });
        }
        else
            this.setState((prevState, prevProps)=>{
                if(prevState.query)
                    return{query: null};
            });
    }

    componentDidUpdate() {
        this.getAlbums();
    }

    componentDidMount() {
        this.getAlbums();
    }

    render () {
        return (
            <div className={classes.SearchResults}>
                { this.state.query ? this.state.result : <Spinner />}
            </div>
        );
    }
} 

export default SearchResults;