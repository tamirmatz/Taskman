import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {UserPreview} from '../cmps/board/UserPreview' 
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri'


class _AppHeader extends Component {
    state = {
        loggedInUser: null
    }

    componentDidMount() {
        this.setState({
            loggedInUser: this.props.loggedInUser
        })
        if(this.props.loggedInUser){
            document.querySelector('.app-header').classList.remove('home')
        }else{
            document.querySelector('.app-header').classList.add('home')
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.loggedInUser !== prevProps.loggedInUser) {
            this.setState({
                loggedInUser: this.props.loggedInUser
            });
            if(this.props.loggedInUser){
                document.querySelector('.app-header').classList.remove('home')
            }else{
                document.querySelector('.app-header').classList.add('home')
            }
        }
    }

    render() {
        // const { loggedInUser } = this.props;
        let className = "app-header flex space-between center fam-1 font-s c-white signin";
        const { loggedInUser } = this.state;

        return <header className={className}>
            {loggedInUser && (
                <nav className="main-nav w-20 flex center space-between c-danger h-100">
                    <NavLink to="/board" className="btn-board btn-boards flex center gap-xs w-40"><RiCheckboxMultipleBlankLine/>Boards</NavLink>
                    <NavLink to="/login" className="btn-board">Jump to...</NavLink>
                </nav>
            )}
            <div className="logo font-5 ps-2"><Link to={`/`}><span className="logo-span">T</span>askman</Link></div>
            { }
            <nav className="main-nav w-20 flex space-evenly c-danger">
                {loggedInUser && (
                    <nav className="main-nav w-20 flex center space-evenly c-danger gap-1">
                        <NavLink to="/board" className="btn-board">+</NavLink>
                        <NavLink to="/login" className="btn-board">Notfication</NavLink>
                    </nav>
                )}
                {loggedInUser && (<NavLink to="/login" className="btn-board"><UserPreview user={loggedInUser}/></NavLink>)}
                {!loggedInUser && (<NavLink to="/login" className="btn-board">Login</NavLink>)}
            </nav>
        </header>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {

}


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)