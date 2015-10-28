import App from './app';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { showPage } from '../actions/navigationActions';

const mapStateToProps = state => {
    return {
        displayName: state.user.name,
        page: state.navigation.page
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onTabSelected: showPage
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);