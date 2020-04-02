import React, {Component} from 'react';
import EmptyLog from './EmptyLog/EmptyLog';

import classes from './UserLog.module.css';
import { Row, Col } from 'react-bootstrap';
import Album from '../Album/Album';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';


class UserLog extends Component {

    componentDidUpdate () {
        this.props.onFetchLog(this.props.uid, this.props.token);
    }

    shouldComponentUpdate (nextProps) {
        return (nextProps.albums.length !== this.props.albums.length
            || this.props.uid !== nextProps.uid);
    }

    render() {
        let content = <Spinner />
        if (this.props.error)
            content = <p>{this.props.error.message}</p>
        else if (!this.props.loading){
            if (this.props.albums && this.props.albums.length>0){
                content = (
                    <div className={classes.LogContent}>
                        {
                            this.props.albums.map(album => (
                            <Album title={album.name} 
                                artist={album.artist}
                                key={Math.random().toString()}
                                img={album.img} />
                            ))
                        }
                    </div>
               );
            }
            else
                content = <EmptyLog />
        }
        return (
            <React.Fragment>
                <Row>
                    <Col xs={12}>
                        <div onClick={()=>this.props.onFetchLog(this.props.uid, this.props.token)} className={classes.LogHeader}>Your Log</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                        {content}
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        albums: state.log.albums,
        error: state.log.error,
        loading: state.log.loading,
        uid: state.auth.userId,
        token: state.auth.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchLog: (uid, token) => dispatch(actionCreators.fetchLog(uid, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLog);