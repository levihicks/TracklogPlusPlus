import React from 'react';
import classes from './Album.module.css';
import {Link} from 'react-router-dom';

const album = (props) => (
    <div className={classes.Album}>
        <div className={classes.AlbumCover}><img src={props.img} alt="Album Cover" /></div>
        <Link className={classes.AlbumTitle}
            to={{
                pathname: '/albumInfo',
                search: '?artist='+props.artist+'&title='+props.title
            }}>
                {props.title}
            </Link>
        <div className={classes.AlbumArtist}>{props.artist}</div>
    </div>
);

export default album;