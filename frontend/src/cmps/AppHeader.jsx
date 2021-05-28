import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class _AppHeader extends Component {
    render() {
        // const { loggedInUser } = this.props;
        return <header className="app-header flex space-between center bg-info fam-1  font-2 c-white">
            <div className="logo font-6 fam-3 ps-3"><Link to={`/`}>Taskman</Link></div>
            <nav className="main-nav w-33 flex space-evenly c-danger">
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