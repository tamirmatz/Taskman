import { connect } from 'react-redux'
import { remove, add, loadBoard, update } from '../store/actions/boardsAction.js';
import React, { Component } from 'react'
import { TaskList } from '../cmps/board/TaskList'


class _Board extends Component {
    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId);
    }

    onUpdate = (updateBoard) => {
        this.props.update(updateBoard)
    }

    render() {
        const board = this.props.board;
        if (!board) {
            return <h1>loading...</h1>
        }
        return (
            <section className="w-100 flex space-between ps-3 ">
                {board && board.groups.map(group => <TaskList key={group.id} board={board} group={group} updateBoard={this.onUpdate} />)}
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
    loadBoard,
    update
}
export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)