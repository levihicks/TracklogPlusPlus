import React from 'react';
import { Row , Col} from 'react-bootstrap';

import classes from './AppNavbar.module.css';

import AccountButton from './AccountButton/AccountButton';

const appNavbar = props => {
    return (
        <React.Fragment>
            <Row className={classes.AppNavbar}> 
                <Col className="my-auto" xs={{offset: 1, span: 3}}>
                    LOGO
                </Col>
                <Col className="my-auto" xs={{offset:5, span: 2}}>
                    <AccountButton />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default appNavbar;