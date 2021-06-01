import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { boardService } from '../../../services/boardService.js'
import { remove, add, loadBoard, update } from '../../../store/actions/boardsAction.js';
import onClickOutside from "react-onclickoutside";
import { BsCardChecklist} from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'

import { utilService } from '../../../services/generalService/utilService.js';
import { CheckList } from './CheckList';
import {ActionList} from './action/ActionList';
// import {TaskTitle} from '../taskDetails/TaskTitle';



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

    handleClickOutside = evt => {
        // ..handling code goes here...
    };

    updateTask = () => {
        if (!this.state.task.title) return;
        const copyBoard = { ...this.props.board };
        const groupIdx = boardService.getGroupIdxById(copyBoard, this.state.group.id)
        const taskIdx = boardService.getTaskIdxById(this.state.group, this.state.task.id)
        copyBoard.groups[groupIdx].tasks[taskIdx] = this.state.task
        this.props.update(copyBoard)
    }

    updateTaskState = (task) => {
        this.setState({ task })
    }

    onAddCheckList = (task) => {
        if (!task.checklists) {
            task.checklists = [];
        }
        task.checklists.push({ id: utilService.makeId(), title: 'Checklist', todos: [] })
        this.setState({ task })
        this.updateTask()
    }
    onRemoveCheckList = (ChecklistIdx) =>{
        console.log('here',ChecklistIdx)
        const {task} = this.state
        const removed = task.checklists.splice(ChecklistIdx,1)
        console.log('removed',removed )
        this.setState({task}, this.updateTask)
    }

    onDeleteTask = () => {
        const {boardId} = this.props.match.params;
        const copyboard = this.props.board
        console.log('copyboard',copyboard)
        const {task,group} = this.state
        group.tasks.splice(boardService.getTaskIdxById(group,task.id),1)
        copyboard.groups[boardService.getGroupIdxById(copyboard, group.id)] = group
        this.props.update(copyboard)
        this.props.history.push(`/board/${boardId}`)
    }

    render() {
        const { task } = this.state;
        if (!task) return <h1>Loading...</h1>
        return (
            <section className="task-details w-50 h-100 flex bg-modal pos-fixed c-stand fam-1 pad-1">
                <div className="info-task flex column w-70 h-100 content-start">
                    {/* Title */}
                    <form className="task-title flex column content-start pb-2 w-100" onSubmit={(ev) => {
                        ev.preventDefault()
                        this.updateTask()
                    }}>
                        <div className="task-title flex center h-33">
                            <label htmlFor="title" className="font-6 flex center"><BsCardChecklist />
                                <input onBlur={this.updateTask} type="text" value={task.title} name="title" className="input-details " onChange={this.handleChange} />
                            </label>
                        </div>
                        <h3 className="fam-1 font-2 left-self h-20 center pb-4">in list {this.state.group.title}</h3>
                    </form>
                    {/* DESC */}
                    <section className="desc-section ">
                        <div className="desc-header flex row">
                            <GrTextAlignFull /><label>Description</label>
                        </div>
                        <form onSubmit={(ev) => {
                            ev.preventDefault()
                            this.updateTask()
                        }}>

                            <textarea placeholder="Add a description for this task..." onBlur={this.updateTask} type="textArea" value={task.description} name="description" className="w-90 input-details" onChange={this.handleChange} />
                        </form>
                    </section>
                    {utilService.isFalse(task.checklists)&& <ul className="todos clean-list">
                        {task.checklists.map((checklist,idx)=> {
                            console.log('checklists',task.checklists)
                            return <CheckList onRemoveCheckList={this.onRemoveCheckList} idx={idx} checklists={task.checklists} handleChange={this.handleChange} updateTask={this.updateTask} checklist={checklist} updateTaskState={this.updateTaskState} task={task} />
                        })}
                    </ul>}
                    {task.comments && <ul className="comments clean-list">
                        {task.comments.map(comment => {
                            return <li className="full-comment flex row">
                                <img className="avatar" src={comment.byMember.imgUrl} />
                                <div className="comment-text flex column">
                                    <h3 className="commenter-name">{comment.byMember.fullname}</h3>
                                    {comment.txt}
                                    <small>{utilService.timeAgo(comment.createdAt)}</small>
                                </div>
                            </li>
                        })}
                    </ul>}
                </div>
                 <ActionList task={task}/>           
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
export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(onClickOutside(_TaskDetails))