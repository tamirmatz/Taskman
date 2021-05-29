import { TaskPreview } from '../board/TaskPreview'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Component } from 'react';
import { boardService } from '../../services/boardService.js'
import { utilService } from '../../services/generalService/utilService.js'

const EMPTY_TASK = {title: ''}
export class TaskList extends Component {
    state = {
        task: EMPTY_TASK
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

    onAddTask = () => {
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
            <Draggable index={index} isDragDisabled={false} draggableId={group.id}>
                {(provided, snapshot) => {
                    return <li className="task-list"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{
                            backgroundColor: snapshot.isDraggingOver ? 'lightblue' : '#EBECF0'
                        }}
                    >
                        <h1>{group.title}</h1>
                        <Droppable key={index} droppableId={group.id} type='task'>
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
                        }}>
                            <input className="preview-add-task" type="text" placeholder="+ Add a task" name="title" onChange={this.handleChange} />
                        </form>
                    </li>
                }}
            </Draggable>)
        /*    </div> */
    }
}