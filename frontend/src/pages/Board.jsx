import { connect } from 'react-redux'
import { remove, add, loadBoard, update } from '../store/actions/boardsAction.js';
import { loading } from '../store/actions/systemActions';

import React, { Component } from 'react'
import { TaskList } from '../cmps/board/TaskList'
import { BoardNavbar } from '../cmps/board/boardNavbar/BoardNavbar'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Route, Switch } from 'react-router';
import { TaskDetails } from '../cmps/board/taskDetails/TaskDetails';
import { boardService } from '.././services/boardService.js'
import { utilService } from '../services/generalService/utilService.js'
import { socketService } from '../services/generalService/socketService.js'
import { ModalWrapper } from '../cmps/shared/ModalWrapper.jsx';

const EMPTY_GROUP = { title: '' }

class _Board extends Component {
    state = {
        group: EMPTY_GROUP
    }


    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId);
        socketService.setup()
        socketService.on('board updated', () => {
            console.log('recieved update')
            this.props.loadBoard()
        })
        socketService.emit('add member', boardId)
    }

    componentWillUnmount() {
        socketService.off('board updated', this.props.loadBoard)
        socketService.terminate()
    }


    onUpdate = (updateBoard) => {
        console.log(updateBoard)
        this.props.update(updateBoard)
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({
            group: {
                ...prevState.group,
                [field]: value,
            }
        }))
    }


    onAddGroup = () => {
        const copyBoard = { ...this.props.board };
        this.setState({ group: { ...this.state.group, id: utilService.makeId() } })
        copyBoard.groups.push(utilService.formatNewGroup(this.state.group))
        this.props.update(copyBoard)
        this.setState({ group: EMPTY_GROUP })
    }

    onDragEnd = res => {
        console.log()
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
            console.log('before', copyBoard)
            const list = copyBoard.groups.splice(source.index, 1)
            copyBoard.groups.splice(destination.index, 0, list[0])
            activity.txt = `has moved list ${list[0].title}`
            console.log('after', copyBoard)
        }
        this.props.update(copyBoard)
    }

    onCloseDetails = () => {
        this.props.history.push(`/board/${this.props.board._id}`)

    }
    render() {
        const { board } = this.props;
        if (!board) {
            return <div className="loader w-100 h-100 flex center content-center">Loading...</div>
        }
        // loading ui
        this.props.loading();
        // if(this.props.isLoading) return <h1 className="w-100 h-100 flex center content-center">Loading...</h1>
        if (this.props.isLoading) return <div className="loader w-100 h-100 flex center content-center">Loading...</div>


        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <section className="board flex column w-100 animate__animated animate__fadeInRight ">
                    <BoardNavbar board={board} updateBoard={this.onUpdate} />
                    <Droppable droppableId="all-groups"
                        direction="horizontal"
                        type="TaskList"
                    >
                        {provided => (
                            <div className="board-list flex w-100 "
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <ul
                                    className="groups clean-list flex "

                                >
                                    {board && board.groups.map((group, idx) => <TaskList index={idx}
                                        key={group.id}
                                        board={board}
                                        group={group}
                                        updateBoard={this.onUpdate} />)}
                                </ul>

                                <div className="group add-group flex">
                                    <form onSubmit={(ev) => {
                                        ev.preventDefault()
                                        this.onAddGroup()
                                    }}>
                                        <input className="add-group" value={this.state.group.title} type="text" placeholder="+ Add another list" name="title" onChange={this.handleChange} />
                                    </form>
                                </div>
                                        {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Switch>
                        <Route path={'/board/:boardId/:groupId/:taskId'} render={(props) => <ModalWrapper onClick={this.onCloseDetails}><TaskDetails {...props} /></ModalWrapper>}></Route>
                    </Switch>
                </section>
            </DragDropContext>
        )
    }
}

// {
//     path: '/board/:boardId/:taskId',
//     component: TaskDetails,
// }

const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        isLoading: state.systemModule.isLoading
    }
}
const mapDispatchToProps = {
    remove,
    add,
    loadBoard,
    update,
    loading
}
export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)