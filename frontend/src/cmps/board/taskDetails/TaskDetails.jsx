import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { boardService } from '../../../services/boardService.js'
import { remove, add, loadBoard, update } from '../../../store/actions/boardsAction.js';
import onClickOutside from "react-onclickoutside";
import { BsCardChecklist } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'
import { FaRegCommentDots } from 'react-icons/fa'
import { utilService } from '../../../services/generalService/utilService.js';
import { CheckList } from './CheckList';
import { ActionList } from './action/ActionList';
import { UserPreview } from '../UserPreview.jsx';
import { RiDeleteBin6Line } from 'react-icons/ri'

// import {TaskTitle} from '../taskDetails/TaskTitle';



class _TaskDetails extends Component {
    state = {
        group: null,
        task: null,
        onFocus: false,
        overlay: false
    }

    componentDidMount() {
        const { boardId, taskId, groupId } = this.props.match.params;
        const board = { ...this.props.board };
        const group = boardService.getGroupById(board, groupId);
        const task = boardService.getTaskById(group, taskId);
        this.addClassName();
        this.setState({ ...this.state, group, task })
    }



    //Destroyed the check list! don't use it! -tamir&naav- <3

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            const { boardId, taskId, groupId } = this.props.match.params;
            const board = { ...this.props.board };
            const group = boardService.getGroupById(board, groupId);
            const task = boardService.getTaskById(group, taskId);
            this.setState({ ...this.state, group:group, task: task })
        }
    }


    addClassName() {
        document.querySelector('.board').classList.add('max-screen');
    };

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

    updateState = (task) => {
        this.setState({ task })
    }

    updateTaskState = (task) => {
        this.setState({ task })
    }

    onAddCheckList = (task) => {
        if (!task.checklists) {
            task.checklists = [];
        }
        task.checklists.push({ id: utilService.makeId(), title: 'Checklist', todos: [] })
        this.setState({ task }, this.updateTask)

    }
    onRemoveCheckList = (checklistIdx) => {
        const { task } = this.state
        task.checklists.splice(checklistIdx, 1)
        this.setState({ task }, this.updateTask)
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

    onSaveDueDate = (date) => {
        const { task } = this.state;
        task.dueDate = date
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

    isDueDateDone = (val) => {
        const { task } = this.state;
        task.isDone = val
        this.updateTask()
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
    openOverlay = (className) => {
        this.setState({ ...this.state, overlay: 'details-overlay' });
    }


    closeOverlay = (ev) => {
        if (!ev.target.classList.contains('btn-action') && !ev.target.classList.contains('btn-act')) {
            if (ev.target.offsetParent !== undefined && ev.target.offsetParent.classList[0] !== undefined && ev.target.offsetParent.classList[0] === 'task-details') {
                const modals = document.querySelectorAll('.action-modal');
                if (modals) {
                    modals.forEach(
                        el => el.classList.add('d-none'));
                }
                this.setState({ ...this.state, overlay: '' });

            }
        }
        // this.setState({ ...this.state, overlay: '' });
        // if(ev.target.classList.contain('btn-action'))
    }

    onAddLabelTask = (labelId) => {
        const task = this.state;
        if (!task.labels) {
            task.labels = [];
        }
        task.labels.push(labelId);
    }

    onSendComment = (txt) => {
        const { loggedInUser } = this.props
        const { task } = this.state;
        task.comments.unshift({ id: utilService.makeId(), txt, createdAt: Date.now(), byMember: loggedInUser })
        this.updateTask()
    }

    onRemoveComment = (commentIdx) => {
        const { task } = this.state;
        task.comments.splice(commentIdx, 1)
        this.updateTask()
    }

    render() {
        const { task } = this.state;
        const { board, loggedInUser } = this.props
        if (!task) return <h1>Loading...</h1>
        return (
            <section className={`task-details w-50 flex bg-modal c-stand fam-1 pad-1 ${this.state.overlay}`}
                onClick={(ev) => { this.closeOverlay(ev) }}>
                <div className="info-task flex column w-70 h-100 content-start">
                    {/* Title */}
                    <form className="task-title flex column content-start pb-2 w-100" onSubmit={(ev) => {
                        ev.preventDefault()
                        this.updateTask()
                    }}>
                        <div className="task-title flex center h-33">
                            <label
                                htmlFor="title"
                                className="font-3 flex center w-100">
                                <BsCardChecklist />
                                <input
                                    onBlur={this.updateTask}
                                    type="text"
                                    value={task.title}
                                    name="title"
                                    className="input-details title-task-input"
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <h3 className="task-list-title fam-1 font-2 left-self h-20 center">in list{' '}
                            <span className="t-decor">{this.state.group.title}</span>
                        </h3>
                    </form>

                    <section className="info-task flex wrap gap-1 center mb-1">
                        <div className="task-members">
                            {task.members.length > 0 && <h3 className="font-s fw-1 fam-1 left-self c-lead">MEMBERS</h3>}
                            <ul className="flex center gap-xs">
                                {task.members.map(member => {
                                    return <UserPreview key={member._id} user={member} />
                                })}
                                {task.members.length > 0 &&
                                    <span onClick={() => { this.toggleModal('members-wrap-modal'); this.openOverlay() }} className="btn-act  user-preview flex center content-center font-m bg-btn cur-pointer ">+</span>}
                            </ul>
                        </div>
                        <div className="task-labels flex column center wrap">
                            {(task.labelIds && task.labelIds.length > 0) && <h3 className="font-s fw-1 fam-1 left-self c-lead">LABELS</h3>}
                            <ul className="flex center wrap">
                                {task.labelIds && task.labelIds.map(labelId => {
                                    const label = board.labels.find(label => {
                                        return label.id === labelId;
                                    })
                                    if (label) {
                                        return (
                                            <div
                                                key={label.id}
                                                className={`details-label bold flex center pad-xs mb-03`} onClick={() => { this.toggleModal('label-wrap-modal') }} style={{ backgroundColor: label.color }}
                                            >
                                                {label.title}
                                            </div>
                                        )
                                    }
                                })}
                                {task.labelIds && <span onClick={() => { this.toggleModal('label-wrap-modal'); this.openOverlay(); }} className="details-label bold flex center pad-xs mb-03 bg-btn btn-act cur-pointer">+</span>}
                            </ul>
                        </div>
                        {task.dueDate && <div className="task-duedate flex center column">
                            <h3 className="font-s fw-1 fam-1 left-self c-lead">DUE DATE</h3>
                            <div className="flex">
                                <input onChange={(ev) => { this.isDueDateDone(ev.target.checked) }} checked={task.isDone} type="checkbox" />
                                <p>{Intl.DateTimeFormat('IL-il').format(task.dueDate)}</p>
                                {task.isDone && <div className="complete-duedate">complete</div>}
                            </div>
                        </div>}
                    </section>

                    <section className="desc-section">
                        <div className="desc-header flex row mb-1">
                            <GrTextAlignFull /><label>Description</label>
                        </div>
                        <form onSubmit={(ev) => {
                            ev.preventDefault()
                            this.updateTask()
                        }}>

                            <textarea placeholder="Add a description for this task..." onBlur={this.updateTask} type="textArea" value={task.description} name="description" className="w-90 input-details margin-content" onChange={this.handleChange} />
                        </form>
                    </section>
                    {utilService.isFalse(task.checklists) && <ul className="todos clean-list mb-3 ">
                        {task.checklists.map((checklist, idx) => {
                            return <CheckList key={idx} onRemoveCheckList={this.onRemoveCheckList} idx={idx} checklists={task.checklists} handleChange={this.handleChange} updateTask={this.updateTask} checklist={checklist} updateTaskState={this.updateTaskState} task={task} />
                        })}
                    </ul>}

                    <section className="comment-section">
                        <div className="desc-header flex row mb-1">
                            <FaRegCommentDots /><label>Comments</label>
                        </div>
                        <div className="new-comment flex center content-gap">
                                <UserPreview user={loggedInUser} />
                                <form onSubmit={(ev) => {
                                    ev.preventDefault()
                                    this.onSendComment(ev.target[0].value)
                                }}>
                                    <input className="comment-input" placeholder="Write a comment..." name="txt">
                                    </input>
                                    <button className="btn-send-comment">Send</button>
                                </form>
                        </div>
                                
                        {task.comments && <ul className="comments clean-list">
                            {task.comments.map((comment, idx) => {
                                return <li className="full-comment flex column">
                                    <div className="flex space-between">
                                        <div className="content-gap flex center"> 
                                        <UserPreview user={comment.byMember} />
                                        <div className="commenter-name">{comment.byMember.fullname}</div>
                                        <small>{utilService.timeAgo(comment.createdAt)}</small>
                                        </div>
                                    <div className='btn-del-comment' onClick={() => { this.onRemoveComment(idx) }}><RiDeleteBin6Line/></div>
                                    </div>
                                    <div className="comment-gap">
                                        <p className="comment-txt ">{comment.txt}</p>
                                    </div>
                                </li>
                            })}
                        </ul>}
                    </section>
                </div>
                <ActionList
                    openOverlay={() => { this.openOverlay() }}
                    onSaveDueDate={this.onSaveDueDate}
                    onDeleteTask={this.onDeleteTask}
                    toggleModal={this.toggleModal}
                    isMemberChecked={this.isMemberChecked}
                    onAddMemberToTask={this.onAddMemberToTask}
                    task={task}
                    group={this.state.group}
                    onAddCheckList={this.onAddCheckList}
                    updateState= {() => {this.updateState()}}
                />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
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