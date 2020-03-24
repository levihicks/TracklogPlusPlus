import React from 'react';
import { Row , Col} from 'react-bootstrap';

import classes from './AppNavbar.module.css';

import AccountButton from './AccountButton/AccountButton';
import logo from '../../assets/images/logo.svg';

const appNavbar = props => {
    return (
        <Row className={classes.AppNavbar}> 
            <Col className="my-auto" xs={{offset: 1, span: 3}}>
                <img
                    alt=""
                    src={logo}
                    height="40"
                />
            </Col>
            <Col className="my-auto" xs={{offset:5, span: 2}}>
                <AccountButton clicked={props.modalHandler}/>
            </Col>
        </Row>
    );
};

export default appNavbar;