import React, {Component} from 'react';
import BackButton from './BackButton/BackButton';
import Add from '../../../assets/icons/add.svg';
import Remove from '../../../assets/icons/remove.svg';
import Tracklist from './Tracklist/Tracklist';
import classes from './AlbumPage.module.css';
import lastFmAxios from '../../../axios/lastFm';
import Spinner from '../../../components/UI/Spinner/Spinner';
import DefaultImg from '../../../assets/images/default_album_cover.png';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
//import logsAxios from '../../../axios/logs';

class AlbumPage extends Component {

    state = {
        albumInfo: null,
        inLog: false,
        showPopover: false
    }

    fetchAlbumInfo = (newParams) => {
        lastFmAxios.get("?method=album.getinfo&artist="+newParams.artist+"&album="+newParams.title)
            .then(response => {
                this.setState({albumInfo: response.data.album});
            })
            .catch(error => {console.log(error)});
    }

    componentDidUpdate(){
        const newParams = Object.fromEntries(new URLSearchParams(this.props.location.search));
        if(this.state.albumInfo) {
            if (newParams.artist !== this.state.albumInfo.artist 
                || newParams.title !== this.state.albumInfo.name)
                this.fetchAlbumInfo(newParams);
        }
    }

    componentDidMount () {
        const newParams = Object.fromEntries(new URLSearchParams(this.props.location.search));
        let albumInLog = this.props.albums.filter(album => ( 
            newParams.artist === album.artist && 
                newParams.title === album.name
        )).length > 0;
        if (albumInLog) 
            this.setState({inLog: true});
        this.fetchAlbumInfo(newParams);
    }

    addRemoveHandler = () => {
        if(!this.props.loading) {
            if (!this.state.inLog) {
                const album = this.state.albumInfo;
                const albumData = {name: album.name, 
                    artist: album.artist, 
                    img: album.image[5]["#text"]};
                this.props.onAlbumAdd(albumData, this.props.uid, this.props.token);
                this.setState({inLog: true});
            }
            else {
                let album = this.state.albumInfo;
                let albumId = this.props.albums.filter(a => ( 
                    album.artist === a.artist && album.name === a.name
                ))[0].albumId;
                this.props.onAlbumRemove(this.props.uid, this.props.token, albumId);
                this.setState({inLog: false});
            }
        }
    }

    render () {
        let albumPage = <div className={classes.AlbumPageSpinner}><Spinner /></div>;
        
        if (this.state.albumInfo){
            const album = this.state.albumInfo;
            let albumImg = album.image[5]["#text"];
            if (!albumImg)
                albumImg = DefaultImg;
            albumPage = (
                <div className={classes.AlbumPage}>
                    <BackButton />
                    <div className={classes.AlbumInfo}>
                        <div className={classes.AlbumImage}>
                            <img
                            alt="Album" 
                            src={albumImg}
                            />
                        </div>
                        <div style={{paddingLeft: "10px"}}>
                            <div className={classes.AlbumTitle}>{album.name}</div>
                            <div className={classes.AlbumArtist}>{album.artist}</div>
                            <div className={classes.AddRemoveButton 
                                +" "+ (!this.props.token ? classes.Disabled : null)}
                                onClick={this.props.token ? this.addRemoveHandler : null}
                                onMouseEnter={()=>{this.setState({showPopover: true})}}
                                onMouseLeave={()=>{this.setState({showPopover: false})}}>
                                {!this.props.loading ? 
                                    <img alt="" 
                                        src={this.state.inLog?Remove:Add} 
                                        className={classes.AddRemoveIcon} />
                                    : <Spinner style={{height: "80%", width: "80%"}}/>
                                }
                                {this.state.showPopover && !this.props.token ?
                                    <div className={classes.Popover}>
                                        Create an account or sign in to add to your log!
                                    </div>
                                    : null
                                }
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

const mapStateToProps = state => {
    return {
        uid: state.auth.userId,
        token: state.auth.idToken,
        albums: state.log.albums,
        loading: state.log.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAlbumAdd: (album, uid, token) => dispatch(actionCreators.addAlbum(album,uid,token)),
        onAlbumRemove: (uid, token, albumId) => dispatch(actionCreators.removeAlbum(uid, token, albumId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);