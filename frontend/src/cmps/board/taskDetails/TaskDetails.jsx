import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { boardService } from '../../../services/boardService.js'
import { remove, add, loadBoard, update } from '../../../store/actions/boardsAction.js';
import onClickOutside from "react-onclickoutside";
import { BsCardChecklist } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'

import { utilService } from '../../../services/generalService/utilService.js';
import { CheckList } from './CheckList';
import { ActionList } from './action/ActionList';
// import {TaskTitle} from '../taskDetails/TaskTitle';



class _TaskDetails extends Component {
    state = {
        group: null,
        task: null,
        onFocus: false
    }

    componentDidMount() {
        const { boardId, taskId, groupId } = this.props.match.params;
        const board = { ...this.props.board };
        const group = boardService.getGroupById(board, groupId);
        const task = boardService.getTaskById(group, taskId);
        this.setState({ ...this.state, group, task })
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps){
            const { boardId, taskId, groupId } = this.props.match.params;
            const board = { ...this.props.board };
            const group = boardService.getGroupById(board, groupId);
            const task = boardService.getTaskById(group, taskId);
            this.setState({ ...this.state, group, task })
        }
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
    onRemoveCheckList = (ChecklistIdx) => {
        const { task } = this.state
        const removed = task.checklists.splice(ChecklistIdx, 1)
        this.setState({ task: { ...task } }, this.updateTask)
    }

    onDeleteTask = () => {
        const { boardId } = this.props.match.params;
        const copyboard = this.props.board
        const { task, group } = this.state
        group.tasks.splice(boardService.getTaskIdxById(group, task.id), 1)
        copyboard.groups[boardService.getGroupIdxById(copyboard, group.id)] = group
        this.props.update(copyboard)
        this.props.history.push(`/board/${boardId}`)
    }

    onAddMemberToTask = (addedMember) => {
        const { task } = this.state;
        const memberIdx = task.members.findIndex(member => member._id === addedMember._id)
        if (memberIdx !== -1) {
            task.members.splice(memberIdx, 1)
        }
        else task.members.push(addedMember)
        this.updateTask()
    }

    isMemberChecked = (memberCheck) => {
        const { task } = this.state;
        const memberIdx = task.members.findIndex(member => member._id === memberCheck._id)
        if (memberIdx !== -1) {
            return 'checked'
        }
        else return ''
    }

    toggleModal = (className) => {
        const modals = document.querySelectorAll('.action-modal');
        const currModal = document.querySelector(`.${className}`);
        if (modals) {
            modals.forEach(
                el => el.classList.add('d-none'));
        }
        if (currModal) {
            currModal.classList.remove('d-none');
        }
    }

    onAddLabelTask = (labelId) =>{
        const task = this.state;
        if(!task.labels){
            task.labels = [];
        }
        task.labels.push(labelId);
    }

    render() {
        const { task } = this.state;
        const { board } = this.props
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
                            <label htmlFor="title" className="font-6 flex center"><BsCardChecklist className="ico" />
                                <input onBlur={this.updateTask} type="text" value={task.title} name="title" className="input-details " onChange={this.handleChange} />
                            </label>
                        </div>
                        <h3 className="content-gap fam-1 font-2 left-self h-20 center pb-4">in list {this.state.group.title}</h3>
                    </form>
                    <section className="flex">
                        <div className="task-members">
                            <ul className="flex center">
                                {task.members.map(member => {
                                    return <img src={member.imgUrl} className="avatar" />
                                })}
                                {task.members.length > 0 && <span onClick={() => { this.toggleModal('members-wrap-modal') }} className="avatar">+</span>}
                            </ul>
                        </div>
                        <div className="task-labels">
                            <ul className="flex center">
                                {task.labelIds && task.labelIds.map(labelId => {
                                    const label = board.labels.find(label => {
                                        return label.id === labelId;
                                    })
                                    if (label)
                                        return <div key={label.id} className={`details-label ${this.state.isLabelOpen && "label-open"}`} onClick={() => { this.toggleModal('label-wrap-modal') }} style={{ backgroundColor: label.color }}>
                                            {label.title}
                                        </div>
                                })}
                                {task.labelIds && <span onClick={() => { this.toggleModal('label-wrap-modal') }} className="avatar">+</span>}
                            </ul>
                        </div>
                    </section>
                    <section className="desc-section">
                        <div className="desc-header flex row">
                            <GrTextAlignFull /><label>Description</label>
                        </div>
                        <form onSubmit={(ev) => {
                            ev.preventDefault()
                            this.updateTask()
                        }}>

                            <textarea placeholder="Add a description for this task..." onBlur={this.updateTask} type="textArea" value={task.description} name="description" className="w-90 input-details content-gap" onChange={this.handleChange} />
                        </form>
                    </section>
                    {utilService.isFalse(task.checklists) && <ul className="todos clean-list">
                        {task.checklists.map((checklist, idx) => {
                            return <CheckList onRemoveCheckList={this.onRemoveCheckList} key={idx} idx={idx} checklists={task.checklists} handleChange={this.handleChange} updateTask={this.updateTask} checklist={checklist} updateTaskState={this.updateTaskState} task={task} />
                        })}
                    </ul>}
                    <section className="comment-section">
                        {/* <div className="new-comment">
                            <div className="task-memeber-img">
                                <img src="" />
                                <form>
                                    <div class="comment-box">
                                        <textarea class="comment-textarea" placeholder="Write a comment..." name="txt">
                                        </textarea>
                                    </div>
                                </form>
                            </div>
                        </div> */}
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
                    </section>
                </div>
                <ActionList onDeleteTask={this.onDeleteTask} toggleModal={this.toggleModal} isMemberChecked={this.isMemberChecked} onAddMemberToTask={this.onAddMemberToTask} task={task} onAddCheckList={this.onAddCheckList} />
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