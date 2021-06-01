import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class _LabelTask extends Component {
    state = {
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        const label = this.props.label;
        console.log(label);
        return (
            <div className="label-input flex">
                <input type="text"  value={label.color} onChange={ ()=> {console.log('aa');}} />
            </div>
        )
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


export const LabelTask = connect(mapStateToProps, mapDispatchToProps)(_LabelTask)