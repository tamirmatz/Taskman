import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class _Dashboard extends Component {
    state = {
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return <div className="dashboard w-100 h-100 flex center space-between">
            <h1>Fill chart!!</h1>
        </div>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {

}


export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)