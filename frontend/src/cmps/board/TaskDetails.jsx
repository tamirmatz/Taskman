import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Board } from '../../pages/Board.jsx';
import { boardService } from '../../services/boardService.js'
import { remove, add, loadBoard, update } from '../../store/actions/boardsAction.js';


class _TaskDetails extends Component {
    state = {
        group: null,
        task: null,
        onFocus: false,
    }

    async componentDidMount() {
        const { boardId, taskId, groupId } = this.props.match.params;
        console.log(boardId)
        await this.props.loadBoard(boardId);
        const copyBoard = { ...this.props.board };
        const group = boardService.getGroupById(copyBoard, groupId);
        const task = boardService.getTaskById(group, taskId);
        this.setState({ ...this.state, group, task })
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

    updateTask = () => {
        const copyBoard = { ...this.props.board };
        const groupIdx = boardService.getGroupIdxById(copyBoard, this.state.group.id)
        const taskIdx = boardService.getTaskIdxById(this.state.group, this.state.task.id)
        copyBoard.groups[groupIdx].tasks[taskIdx] = this.state.task
        console.log('updatedTask')
        this.props.update(copyBoard)
    }


    render() {
        const { task } = this.state;
        console.log(task)
        if (!task) return <h1>Loading...</h1>
        return (
            <section className="task-details w-70 h-70 flex column bg-modal c-stand">
                <form className="form-details" onSubmit={(ev) => {
                    ev.preventDefault()
                    this.updateTask()
                }}>
                    <div className="input-details">
                        <label htmlFor="title"><i class="fas fa-tasks-alt font-2 c-info"></i></label>
                        <input onBlur={this.updateTask} type="text" value={task.title} name="title" className="w-50 input-details fas fa-tasks-alt" onChange={this.handleChange} />
                    </div>
                </form>
                <form onSubmit={(ev) => {
                    ev.preventDefault()
                    this.updateTask()
                }}>
                    <label htmlFor="description">Description</label>
                    <input onBlur={this.updateTask} type="text" value={task.description} name="description" className="w-50 input-details fas fa-tasks-alt" onChange={this.handleChange} />
                </form>
                {task.comments && <ul className="comments clean-list">
                    {task.comments.map(comment => {
                        return <li className="flex column">
                            <div className="commenter flex">
                                <img className="avatar" src={comment.byMember.imgUrl} />
                                <h1 className="commenter-name">{comment.byMember.fullname}</h1>
                            </div>
                            {comment.txt}
                            <small>{comment.createdAt}</small>
                        </li>
                    })}
                </ul>}


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
export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)