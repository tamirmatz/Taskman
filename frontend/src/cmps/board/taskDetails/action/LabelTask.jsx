import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { FiEdit2 } from 'react-icons/fi'



class _LabelTask extends Component {
    state = {
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        const label = this.props.label;
        // console.log(this.props.board);
        return (
            <div className="label-input flex gap-2">
                <input type="text" style={{ background: `${label.color}` }} className="label-input" onChange={() => { console.log('aa'); }} onClick={() => this.toggleLabel()} />
                <FiEdit2 />
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