import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class _AppHeader extends Component {
    render() {
        const { loggedInUser } = this.props;
        return <header className="main-header">

        </header>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {}


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)