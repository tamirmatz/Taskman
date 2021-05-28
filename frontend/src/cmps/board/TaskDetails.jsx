import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Board } from '../../pages/Board.jsx';
import {boardService} from '../../services/boardService.js'
import { remove, add, query } from '../../store/actions/boardsAction.js';


class _TaskDetails extends Component {

    render() {
        console.log(this.props.match.params)
        const { taskId, groupId } = this.props.match.params;
        const board = this.props.board;
        const  group = boardService.getGroupById(board, groupId);
        const task = boardService.getTaskById(group, taskId);
        console.log(group, task)
        console.log(task)
        return (
            <section className="task-details">
                <h1>Task details</h1>
                <h4>{task.title}</h4>
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
    remove,
    add,
    query
}
export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)