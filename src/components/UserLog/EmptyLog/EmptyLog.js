import React from 'react';
import classes from './EmptyLog.module.css';
import { Row } from 'react-bootstrap';

const albumPlaceholder = (k) => (<div key={k} className={classes.AlbumPlaceholder}></div>);
const albumPlaceholders = [...Array(3)].map(()=>(albumPlaceholder(Math.random().toString())));
const Fade = ()=>(<div className={classes.Fade}></div>);

const EmptyLogMsg = () => (
    <div className={classes.EmptyLogMsg}>No albums yet!<br />Add the ones you want to check out here.</div>
);

const emptyLog = () => {
    
    return (
        <React.Fragment>
            {
                albumPlaceholders.map((album)=>(
                     <Row key={Math.random().toString()} className="d-flex justify-content-center">{Array(albumPlaceholders)}</Row>
                ))
            }
            <Fade/>
            <EmptyLogMsg />
        </React.Fragment>
    );
};

export default emptyLog;