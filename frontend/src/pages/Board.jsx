import { connect } from 'react-redux'
import { remove, add, loadBoard, update } from '../store/actions/boardsAction.js';
import React, { Component } from 'react'
import { TaskList } from '../cmps/board/TaskList'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Route, Switch } from 'react-router';
import { TaskDetails } from '../cmps/board/TaskDetails.jsx';
import { boardService } from '.././services/boardService.js'

class _Board extends Component {
    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId);
    }

    onUpdate = (updateBoard) => {
        this.props.update(updateBoard)
    }

    onDragEnd = res => {
        console.log('ended', res)
        const { destination, source, type } = res
        if (!destination) return
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return
        const copyBoard = { ...this.props.board }
        const activity = {}
        if (type === 'task') {
            const sourceListIdx = boardService.getGroupIdxById(copyBoard, source.droppableId)
            const destinationListIdx = boardService.getGroupIdxById(copyBoard, destination.droppableId)
            const task = copyBoard.groups[sourceListIdx].tasks.splice(source.index, 1)
            copyBoard.groups[destinationListIdx].tasks.splice(destination.index, 0, task[0])
            const sourceListName = copyBoard.groups[sourceListIdx].title
            const destinationListName = copyBoard.groups[destinationListIdx].title
            activity.txt = `has moved ${task[0].title} from ${sourceListName} to ${destinationListName}`
        }
        else {

            const list = copyBoard.groups.splice(source.index, 1)
            copyBoard.groups.splice(destination.index, 0, list[0])
            activity.txt = `has moved list ${list[0].title}`
        }
        console.log('updated board:', copyBoard)
        this.props.update(copyBoard)
    }

    render() {
        const board = this.props.board;
        console.log(this.props)
        if (!board) {
            return <h1>loading...{board}</h1>
        }
        return (
            <section className="board">
                <section className="flex">
                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                    >
                        <Droppable droppableId={'all-columns'}
                            direction="horizontal"
                            type="list"
                        >
                            {provided => (
                                <ul
                                    className="groups clean-list flex"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {board && board.groups.map((group, idx) => <TaskList index={idx}
                                        key={group.id}
                                        board={board}
                                        group={group}
                                        updateBoard={this.onUpdate} />)}
                                    {provided.placeholder}
                                </ul>

                            )}

                        </Droppable>
                    </DragDropContext>
                </section>
                <Switch>
                    <Route path={'/board/:boardId/:groupId/:taskId'} component={TaskDetails}></Route>
                </Switch>
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