import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "recompose";

import classes from "./UserLog.module.css";

import EmptyLog from "./EmptyLog/EmptyLog";
import Album from "../Album/Album";
import * as actionCreators from "../../store/actions";
import Spinner from "../UI/Spinner/Spinner";
import { withAuthConsumer } from "../../session";

class UserLog extends Component {
  componentDidUpdate() {
    this.props.onFetchLog(this.props.authState && this.props.authState.uid);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.albums.length !== this.props.albums.length ||
      nextProps.authState !== this.props.authState
    );
  }

  render() {
    let content = <Spinner />;
    if (this.props.error) content = <p>{this.props.error.message}</p>;
    else if (!this.props.loading) {
      if (this.props.albums && this.props.albums.length > 0) {
        content = (
          <div className={classes.LogContent}>
            {this.props.albums.map((album) => (
              <Album
                title={album.name}
                artist={album.artist}
                key={Math.random().toString()}
                img={album.img}
              />
            ))}
          </div>
        );
      } else content = <EmptyLog />;
    }
    return (
      <React.Fragment>
        <Row>
          <Col xs={12}>
            <div className={classes.LogHeader}>Your Log</div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>{content}</Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    albums: state.log.albums,
    error: state.log.error,
    loading: state.log.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchLog: (uid) => dispatch(actionCreators.fetchLog(uid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(compose(withAuthConsumer)(UserLog));
