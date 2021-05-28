import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class _AppHeader extends Component {
    render() {
        // const { loggedInUser } = this.props;
        return <header className="main-header flex space-between">
            <div className="logo fs28"><Link to={`/`}>Taskman</Link></div>
            <nav className="main-nav">
                <NavLink to="/">Home</NavLink>
                    <NavLink to="/board">Boards</NavLink> 
                    <NavLink to="/">Login</NavLink> 
                    <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    }

}
const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {}


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)