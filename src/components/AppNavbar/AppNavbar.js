import React, {Component} from 'react';
import { Row , Col} from 'react-bootstrap';

import classes from './AppNavbar.module.css';
import {connect} from 'react-redux';


import AccountButton from './AccountButton/AccountButton';
import HamburgerItem from './HamburgerItem/HamburgerItem';
import Logo from '../../assets/images/logo.svg';
import HamburgerIcon from '../../assets/icons/hamburger.svg';
import ProfileIcon from '../../assets/icons/profile.svg';

class AppNavbar extends Component {

    state = {
        menuDisplayed: false,
        showProfileInfo: false
    }

    toggleMenu = () => {
        this.setState((prevState, prevProps) => (
            {menuDisplayed: !prevState.menuDisplayed}
        ));
    }

    itemClicked = (newView) => {
        this.props.viewChange(newView);
        this.toggleMenu();
    }

    render() {
        return (
            <Row className={classes.AppNavbar}
            style={this.state.menuDisplayed?{height:"100vh"}:null}> 
                <Col className={[classes.NavbarMain,"my-xs-0 my-md-auto"].join(" ")} 
                    md={{offset: 1, span: 3}}
                    >
                    <img 
                        onClick={this.toggleMenu}
                        className={["d-md-none", classes.HamburgerIcon].join(" ")}
                        alt=""
                        src={HamburgerIcon}
                        height="40"
                    />
                    <img
                        alt=""
                        src={Logo}
                        className={classes.Logo}
                        height="40"
                    />
                </Col>
                <Col className={[classes.HamburgerMenu,
                    classes.DesktopNavItems,
                    "my-xs-0 my-md-auto"].join(" ")} 
                    md={{offset:5, span: 2}}>
                    <HamburgerItem content="My Log" 
                        style={!this.state.menuDisplayed?{display: "none"}:null}
                        clicked={()=>this.itemClicked("log")}/>
                    <HamburgerItem content="Browse" 
                        style={!this.state.menuDisplayed?{display: "none"}:null}
                        clicked={()=>this.itemClicked("browser")}/>
                    
                    
                    { this.props.token ?
                    <React.Fragment>
                        <HamburgerItem content="[Logout]"
                            style={!this.state.menuDisplayed?{display: "none"}:null}/>
                        <img src={ProfileIcon} 
                            alt="" 
                            className={classes.ProfileIcon} 
                            onClick={()=>this.setState((prevState) => 
                                ({showProfileInfo: !prevState.showProfileInfo}))}/>
                    </React.Fragment>
                    : <AccountButton clicked={this.props.modalHandler}/>
                    }
                    { this.state.showProfileInfo ?
                    <div className={classes.ProfileInfo}>
                        <div className={classes.LogoutButton}>[Logout]</div>
                    </div>
                    :null
                    }
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.idToken
    }
};

export default connect(mapStateToProps)(AppNavbar);