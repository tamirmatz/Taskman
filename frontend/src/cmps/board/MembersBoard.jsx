import React, { Component } from 'react'
import { connect } from 'react-redux'
import {UserPreview} from './UserPreview';


class _MembersBoard extends Component {
    render() {
        const members = this.props.board.members;
        return (
            <section className="members-board flex space-between">
                {members.map( member => <UserPreview user={member}/>)}
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {

}
export const MembersBoard = connect(mapStateToProps, mapDispatchToProps)(_MembersBoard)