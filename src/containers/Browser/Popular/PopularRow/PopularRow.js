import React, {Component} from 'react';
import { connect } from 'react-redux';
import classes from './PopularRow.module.css';
import axios from 'axios';
import Album from '../../../../components/Album/Album';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as actions from '../../../../store/actions';

class PopularRow extends Component {

    componentDidMount () {
        if(this.props.categories.filter(cat => cat.name===this.props.category).length===0) {
            axios.get("?method=tag.gettopalbums&tag="+this.props.category+"&limit=5")
            .then(response => {
                const albums = response.data.albums.album;
                const category = {name: this.props.category, albums: []};
                category.albums = albums.map(album => (
                    {name: album.name, artist: album.artist.name, img: album.image[3]["#text"]}
                ));
                this.props.categoryAdd(category);
                
            })
            .catch(error => {console.log(error)});
        }
    }

    render () {
        let showcase = <Spinner />;
        let category = this.props.categories.filter(cat=>cat.name===this.props.category)[0];
        if(category){
            showcase =  category.albums.map(album => (
                <Album
                title={album.name} 
                artist={album.artist}
                key={Math.random().toString()}
                img={album.img}/>
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

const mapStateToProps = state => {
    return {
        categories: state.browser.categories
    }
};

const mapDispatchToProps = dispatch => {
    return {
        categoryAdd: (category) => dispatch({type: actions.ADD_POPULAR_CATEGORY, category: category})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularRow);