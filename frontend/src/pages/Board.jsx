import { connect } from 'react-redux'
import { remove, add, loadBoard, update } from '../store/actions/boardsAction.js';
import React, { Component } from 'react'
import { TaskList } from '../cmps/board/TaskList'
import { Route, Switch } from 'react-router';
import { TaskDetails } from '../cmps/board/TaskDetails.jsx';


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
            <section className="board">
                <section className="groups flex">
                    <Switch>
                        <Route path={'/board/:boardId/:groupId/:taskId'} component={TaskDetails}></Route>
                    </Switch>
                    {board && board.groups.map(group => <TaskList key={group.id} board={board} group={group} updateBoard={this.onUpdate} />)}
                </section>
            </section>
        )
    }
}

// {
//     path: '/board/:boardId/:taskId',
//     component: TaskDetails,
// }

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