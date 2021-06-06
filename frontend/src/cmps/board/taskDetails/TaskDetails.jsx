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
    elModalRef = React.createRef()
    _isMounted = React.createRef(false)

    componentDidMount() {
        const { boardId, taskId, groupId } = this.props.match.params;
        const board = { ...this.props.board };
        const group = boardService.getGroupById(board, groupId);
        const task = boardService.getTaskById(group, taskId);
        this.addClassName();
        document.body.classList.add('noscroll')
        this.setState({ ...this.state, group, task })
    }

    componentWillUnmount() {
        document.body.classList.remove('noscroll')
    }

    componentDidUpdate() {
        // modalPos.top = `calc(55% + ${(this.elModalRef.current.clientHeight
        //     - this.props.overlayHeight)/2}px)`
        // console.log('modalPos: ', modalPos)
        // if (this._isMounted.current) {

        // } else {
        //     console.log('is mounted false')
        //     this._isMounted.current = true
        // }
    }

    //Destroyed the check list! don't use it! -tamir&naav- <3

    // componentDidUpdate(prevProps) {
    //     if (this.props !== prevProps) {
    //         console.log('props change');
    //     }
    // }

    addClassName() {
        document.querySelector('.board').classList.add('max-screen');
    };

    createActivity = (txt = '') => {
        const { loggedInUser } = this.props
        const task = { ...this.state.task }
        const activityTxt = `${loggedInUser.fullname} ${txt}`

        return {
            id: utilService.makeId(),
            createdAt: Date.now(),
            byMember: loggedInUser,
            txt: activityTxt,
            task
        };
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

    updateTask = (txt) => {
        console.log('here', txt)
        if (!this.state.task.title) return;
        let copyBoard = { ...this.props.board };
        const groupIdx = boardService.getGroupIdxById(copyBoard, this.state.group.id)
        const taskIdx = boardService.getTaskIdxById(this.state.group, this.state.task.id)
        copyBoard.groups[groupIdx].tasks[taskIdx] = this.state.task
        this.props.update(copyBoard, this.createActivity(txt))
    }

    updateTaskLabel = (updateTask) => {
        console.log('prevLabel: ', this.state.task.labelIds, 'updateLabel: ', updateTask.labelIds);
        const task = this.state.task;
        task.labelIds = updateTask.labelIds;
        this.updateTask('updated label')
        console.log('Label: ', this.state.task.labelIds, 'updateLabel: ', updateTask.labelIds);
    }

    onSaveDueDate = (date) => {
        const { task } = this.state;
        task.dueDate = date
        this.updateTask('saved duedate')
    }

    updateTaskState = (task) => {
        this.setState({ task })
    }

    onAddCheckList = (task) => {

        if (!task.checklists) {
            task.checklists = [];
        }
        task.checklists.push({ id: utilService.makeId(), title: 'Checklist', todos: [] })
        this.setState({ task }, () => {
            this.updateTask('added checklist')
        })
    }

    onRemoveCheckList = (checklistIdx) => {
        const { task } = { ...this.state }
        // const task = JSON.parse(JSON.stringify(this.state.task))
        task.checklists.splice(checklistIdx, 1)
        this.setState({ task }, () => { this.updateTask('removed a checklist') })
    }

    onUpdateChecklist = (checklist) => {
        this.state.task.checklists = this.state.task.checklists.map(cl => cl.id === checklist.id ? checklist : cl)
        this.setState({ task: { ...this.state.task } }, () => { this.updateTask('updated checklist') })
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
        let str = ''
        const memberIdx = task.members.findIndex(member => member._id === addedMember._id)
        if (memberIdx !== -1) {
            task.members.splice(memberIdx, 1)
            str = `removed ${addedMember.fullname} from task`
        }
        else {
            task.members.push(addedMember)
            str = `added ${addedMember.fullname} to task`
        }
        console.log('str', str)
        this.updateTask(str)
    }


    onSaveDueDate = (date) => {
        const { task } = this.state;
        task.dueDate = date

        this.updateTask('added a due date')
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
        let str = val ? 'marked task as done' : 'marked task as not completed'
        this.updateTask(str)
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
    openOverlay = () => {
        this.setState({ ...this.state, overlay: 'details-overlay' });
    }

    addImgToTask = (imgUrl) => {
        const { task } = this.state;
        task.imgUrl = imgUrl
        this.updateTask('added image to task')
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
        this.updateTask(`commented on "${task.title}"`)
    }

    onRemoveComment = (commentIdx) => {
        const { task } = this.state;
        task.comments.splice(commentIdx, 1)
        this.updateTask(`removed a comment from "${task.title}"`)
    }

    moveTask = (moveTo) => {
        if (moveTo !== this.state.group.id) {
            const copyBoard = { ...this.props.board }
            copyBoard.groups[boardService.getGroupIdxById(copyBoard, this.state.group.id)].tasks.splice(
                boardService.getTaskIdxById(this.state.group, this.state.task.id), 1)
            copyBoard.groups[moveTo].tasks.push(this.state.task)
            this.setState({ group: copyBoard.groups[moveTo] })
            this.props.update(copyBoard)
        }
        // this.props.history.push(`/board/${copyBoard._id}`)
    }



    render() {
        var counter = 0;
        const { task } = this.state;
        const { board, loggedInUser } = this.props
        if (!task) return <h1>Loading...</h1>
        return (
                <section
                    ref={this.elModalRef}
                    className={`task-details modal w-50 flex bg-modal c-stand fam-1 pad-1 ${this.state.overlay}`}
                    onClick={(ev) => {
                        ev.stopPropagation()
                        this.closeOverlay(ev)
                    }}
                >
                    <div className="info-task flex column w-79 h-100 content-start">
                        {/* Title */}
                        <form className="task-title flex column content-start pb-2 w-100" onSubmit={(ev) => {
                            ev.preventDefault()
                            this.updateTask('updated task name')
                        }}>
                            <div className="task-title flex center h-33">
                                <label
                                    htmlFor="title"
                                    className="font-3 flex center w-100">
                                    <BsCardChecklist />
                                    <input
                                        onBlur={() => this.updateTask('updated checklist name')}
                                        type="text"
                                        autoComplete="off"
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
                                    {task.labelIds && task.labelIds.length > 0 && <span onClick={() => { this.toggleModal('label-wrap-modal'); this.openOverlay(); }} className="details-label bold flex center pad-xs mb-03 bg-btn btn-act cur-pointer">+</span>}
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
                                this.updateTask('changed task description')
                            }}>
    
                                <textarea placeholder="Add a description for this task..." onBlur={() => this.updateTask('changed task description')} type="textArea" value={task.description} name="description" className="input-details w-90 margin-content fam-1" onChange={this.handleChange} />
                            </form>
                        </section>
                        {task.imgUrl && <img className="details-img" src={task.imgUrl} />}
                        {utilService.isFalse(task.checklists) && <ul className="todos clean-list mb-3 ">
                            {task.checklists.map((checklist, idx) => {
                                return <CheckList
                                    key={checklist.id}
                                    onRemoveCheckList={this.onRemoveCheckList}
                                    updateChecklist={this.onUpdateChecklist}
                                    idx={idx}
                                    checklists={task.checklists}
                                    handleChange={this.handleChange}
                                    updateTask={this.updateTask}
                                    checklist={checklist}
                                    updateTaskState={this.updateTaskState}
                                    task={task}
                                />
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
                                    <input autoComplete="off" type="text" className="comment-input" placeholder="Write a comment..." name="txt" />
                                    <button className="btn-send-comment">Send</button>
                                </form>
                            </div>
    
                            {task.comments && <ul className="comments clean-list">
                                {task.comments.map((comment, idx) => {
                                    return <li key={comment.id} className="full-comment flex column">
                                        <div className="flex space-between center">
                                            <div className="content-gap flex center">
                                                <UserPreview user={comment.byMember} />
                                                <div className="commenter-name">{comment.byMember.fullname}</div>
                                                <small>{utilService.timeAgo(comment.createdAt)}</small>
                                            </div>
                                            <div className='btn-del-comment' onClick={() => { this.onRemoveComment(idx) }}><RiDeleteBin6Line /></div>
                                        </div>
                                        <div className="comment-gap">
                                            <p className="comment-txt ">{comment.txt}</p>
                                        </div>
                                    </li>
                                })}
                                {
                                    board.activities.map(activity => {
                                        if(!activity) return
                                        if (task.id === activity.task.id && counter < 10) {
                                            counter++
                                            return <li key={activity.id} className="full-comment flex column">
                                                <div className="flex space-between">
                                                    <div className="content-gap flex center">
                                                        <UserPreview user={activity.byMember} />
                                                        <div className="commenter-name">{activity.byMember.fullname}</div>
                                                        <small>{utilService.timeAgo(activity.createdAt)}</small>
                                                    </div>
                                                </div>
                                                <div className="comment-gap">
                                                    <p className="comment-txt ">{activity.txt}</p>
                                                </div>
                                            </li>
                                        }
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
                        moveTask={this.moveTask}
                        updateState={() => { this.updateState() }}
                        updateTask={this.updateTask}
                        addImgToTask={this.addImgToTask}
                        updateTaskLabel={this.updateTaskLabel}
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