import { TaskPreview } from '../board/TaskPreview'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Component } from 'react';
import { boardService } from '../../services/boardService.js'
import { utilService } from '../../services/generalService/utilService.js'

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
        const groupIdx = boardService.getGroupIdxById(copyBoard, this.state.group.id)
        copyBoard.groups[groupIdx] = this.state.group
        this.props.updateBoard(copyBoard)
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

        return/*  <div className="group-container"> */(
            <Draggable key={group.id} index={index} isDragDisabled={false} draggableId={group.id}>
                {(provided, snapshot) => {
                    return <li className="group pad-4"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{
                            // backgroundColor: snapshot.isDraggingOver ? 'lightblue' : '#EBECF0'
                        }}
                    >
                        <form className="mb-06" onSubmit={(ev) => {
                            ev.preventDefault()
                            this.updateGroup()

                        }}>   <input className="group-title add-task" onBlur={this.updateGroup} type="text" value={this.state.group.title} name="title" onChange={this.handleChangeGroup} /></form>
                        <div className="task-list">
                            <Droppable key={index} key={group.id} droppableId={group.id} type='task'>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {group.tasks.map((task, idx) => (
                                                <TaskPreview key={task.id}
                                                    board={board}
                                                    index={idx}
                                                    groupId={group.id}
                                                    updateBoard={updateBoard}
                                                    task={task}
                                                />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <form onSubmit={(ev) => {
                                ev.preventDefault()
                                this.onAddTask()
                                console.log(ev)
                            }}>
                                <input className="add-task" value={this.state.task.title} type="text" placeholder="+ Add a task" name="title" onChange={this.handleChange} />
                            </form>
                        </div>
                    </li>
                }}
            </Draggable>)
        /*    </div> */
    }
}