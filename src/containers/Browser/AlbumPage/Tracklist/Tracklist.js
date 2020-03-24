import React from 'react';
import classes from './Tracklist.module.css';


const formatDuration = (duration) => {
    var seconds = ((duration%60)<10)?'0'+(duration%60):(duration%60);
    var formattedDuration = Math.floor(duration/60)+':'+seconds;
    return formattedDuration;
}

const tracklist = props => (
    <div className={classes.Tracklist}>
        {props.tracks.map(track => (
                <div key={Math.random().toString()} className={classes.Track}>
                    <div className={classes.TrackTitle}>{track.name}</div>
                    <div className={classes.TrackDuration}>{formatDuration(track.duration)}</div>
                </div>
            )
        )}
    </div>
);

export default tracklist;