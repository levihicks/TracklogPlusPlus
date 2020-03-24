import React from 'react';
import EmptyLog from './EmptyLog/EmptyLog';

import classes from './UserLog.module.css';
import { Row, Col } from 'react-bootstrap';


const userLog = (props) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className={classes.LogHeader}>Your Log</div>
                </Col>
            </Row>
            <Row>
                <Col className="" xs={12} >
                    <EmptyLog className=""/>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default userLog;