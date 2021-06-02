import { TaskPreview } from '../board/TaskPreview'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Component } from 'react';
import { boardService } from '../../services/boardService.js'
import { utilService } from '../../services/generalService/utilService.js'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
const EMPTY_TASK = { title: '' }
const EMPTY_GROUP = { title: '' }

export class TaskList extends Component {
    state = {
        group: EMPTY_GROUP,
        task: EMPTY_TASK
    }
    componentDidMount() {
        this.setState({ group: this.props.group })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({
            task: {
                ...prevState.task,
                [field]: value,
            }
        }))
    }

    updateGroup = () => {
        if (!this.state.group.title) return;
        const copyBoard = { ...this.props.board };
        this.props.updateBoard(copyBoard)
        const groupIdx = boardService.getGroupIdxById(copyBoard, this.state.group.id)
        copyBoard.groups[groupIdx] = this.state.group
        console.log(copyBoard)
    }

    handleChangeGroup = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({
            group: {
                ...prevState.group,
                [field]: value,
            }
        }))
    }

    onAddTask = () => {
        if (!this.state.task.title) return;
        const { group } = this.props
        const copyBoard = { ...this.props.board };
        const groupIdx = boardService.getGroupIdxById(copyBoard, group.id)
        copyBoard.groups[groupIdx].tasks.push(utilService.formatNewTask(this.state.task))
        this.props.updateBoard(copyBoard)
        this.setState({ task: EMPTY_TASK })
    }

    render() {
        const { board, group, updateBoard, index } = this.props

        return (
            <Draggable index={index} isDragDisabled={false} draggableId={group.id} >
                {(provided, snapshot) => {
                    return <li className="group br-3"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <form className="" onSubmit={(ev) => {
                            ev.preventDefault()
                            this.updateGroup()

                        }}>
                            <div className="group-title w-100 flex center space-between pb-2">
                                <input className="app-input font-w2 font-m lh-20 " onBlur={this.updateGroup} type="text" value={this.state.group.title} name="title" onChange={this.handleChangeGroup} />
                                <div className="group-menu">...</div>
                            </div>
                        </form>
                        <div className="wrap-task-list">

                            <div className="task-list flex column center content-center">
                                <Droppable key={index} droppableId={group.id} type='task'>
                                    {(provided) => (
                                        <div className="task-list-droppable" ref={provided.innerRef} {...provided.droppableProps} {...provided.dragHandleProps}>
                                            {group.tasks.map((task, idx) => (
                                                <TaskPreview key={task.id}
                                                    board={board}
                                                    index={idx}
                                                    groupId={group.id}
                                                    updateBoard={updateBoard}
                                                    task={task}
                                                />
                                            ))}
                                            {!utilService.isFalse(group.tasks) && <h1 className="task-title fam-1 font-m">No tasks to show</h1>}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <form onSubmit={(ev) => {
                                ev.preventDefault()
                                this.onAddTask()
                                console.log(ev)
                            }}>
                                <input className="add-task" value={this.state.task.title} type="text" placeholder="+ Add another card" name="title" onChange={this.handleChange} />
                            </form>
                        </div>
                    </li>
                }}
            </Draggable>)
        /*    </div> */
    }
}