import React, { Component } from 'react';
import {Route} from 'react-router-dom';
//import Searchbar from './Searchbar/Searchbar';
import Popular from './Popular/Popular';
import classes from './Browser.module.css';
import axios from 'axios';
import AlbumPage from './AlbumPage/AlbumPage';

class Browser extends Component {

    // backButtonHandler = props => {
    //     this.setState((prevState, prevProps) => ({
    //         currentView: prevState.prevView,
    //         prevView: null
    //     }));
    // }

    /*albumPageView = (
        <AlbumPage title={albumTitle} 
            artist={albumArtist} 
            img={albumImg}
            backButtonHandler={this.backButtonHandler}/>
    );*/

    popularView = (props) => (
        <React.Fragment>
            {/*<Searchbar />*/}
            <Popular {...props}/>
        </React.Fragment>
    );
    
    state = {
        searchQuery: "",
        currentView: this.view,
        prevView: null
    }

    render() {
        console.log(axios.interceptors);
        return (
            <div className={classes.Browser}>
                    <Route path="/" exact render={(props)=>this.popularView(props)} />
                    <Route path="/albumInfo" component={AlbumPage} />
                    {/*this.state.currentView*/}
            </div>
        );
    }
}

export default Browser;