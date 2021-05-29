import { connect } from 'react-redux'
import { remove, add, loadBoard, update } from '../store/actions/boardsAction.js';
import React, { Component } from 'react'
import { TaskList } from '../cmps/board/TaskList'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Route, Switch } from 'react-router';
import { TaskDetails } from '../cmps/board/TaskDetails.jsx';
import { boardService } from '.././services/boardService.js'
import { utilService } from '../services/generalService/utilService.js'
import { ModalWrapper } from '../cmps/shared/ModalWrapper.jsx';

const EMPTY_GROUP = {title: ''}

class _Board extends Component {
    state = {
        group: EMPTY_GROUP
    }


    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId);
    }

    onUpdate = (updateBoard) => {
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
        this.props.update(copyBoard)
    }

    onCloseDetails=()=>{
        this.props.history.push(`/board/${this.props.board._id}`)

    }
    render() {
        const { board } = this.props;
        console.log('from Board, before render:',board)
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
                    <div className="task-list">
                        <form onSubmit={(ev) => {
                            ev.preventDefault()
                            this.onAddGroup()
                        }}>
                            <input type="text" placeholder="+ Add a group" name="title" onChange={this.handleChange} />
                        </form>
                    </div>
                </section>
                <Switch>
                    <Route path={'/board/:boardId/:groupId/:taskId'} render={(props)=><ModalWrapper onClick={this.onCloseDetails}><TaskDetails {...props}/></ModalWrapper>}></Route>
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