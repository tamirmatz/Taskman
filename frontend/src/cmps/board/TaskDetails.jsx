import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { boardService } from '../../services/boardService.js'
import { remove, add, loadBoard, update } from '../../store/actions/boardsAction.js';
import onClickOutside from "react-onclickoutside";
import { BsCardChecklist, BsImage, BsArrowRight } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'
import { MdLabelOutline } from 'react-icons/md'
import { AiOutlineClockCircle, AiOutlineCheckSquare, AiOutlineDelete } from 'react-icons/ai'
import { BiCopy } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { utilService } from '../../services/generalService/utilService.js';
import {CheckList} from './CheckList'


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


    render() {
        const { task } = this.state;
        if (!task) return <h1>Loading...</h1>
        return (
            <section className="task-details w-50 h-100 flex bg-modal pos-fixed c-stand fam-1 pad-1">
                <div className="info-task flex column w-70 h-100 content-start">
                    {/* Title */}
                    <form className="task-title flex column w-100 content-start pb-2" onSubmit={(ev) => {
                        ev.preventDefault()
                        this.updateTask()
                    }}>
                        <div className="task-title flex row w-100">
                            <label htmlFor="title" className="font-6"><BsCardChecklist /></label>
                            <input onBlur={this.updateTask} type="text" value={task.title} name="title" className="input-details" onChange={this.handleChange} />
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
                            return <CheckList idx={idx} checklists={task.checklists} handleChange={this.handleChange} updateTask={this.updateTask} checklist={checklist} />
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
                <div className="menu-task flex column w-40 content-start right">
                    <div className="close-details fam-2 font-1 bold pad-1">X</div>
                    <div className="details-action flex column center pad-1 w-80">
                        <label htmlFor="actions" className="font-m">ACTIONS</label>
                        <ul className="action-menu flex column w-100 clean-list font-m pad-0">
                            <li className="btn-action "><MdLabelOutline />Labels</li>
                            <li className="btn-action"><FiUsers />Members</li>
                            <li className="btn-action"><AiOutlineClockCircle />Due Date</li>
                            <li className="btn-action"><AiOutlineCheckSquare />Checklist</li>
                            <li className="btn-action"><BsImage />Image</li>
                            <li className="btn-action"><BsArrowRight />Move</li>
                            <li className="btn-action"><BiCopy />Copy</li>
                            <li className="btn-action"><AiOutlineDelete />Delete</li>
                        </ul>
                    </div>
                </div>

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