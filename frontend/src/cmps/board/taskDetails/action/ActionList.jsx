import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { MdLabelOutline } from 'react-icons/md'
import { AiOutlineClockCircle, AiOutlineCheckSquare, AiOutlineDelete } from 'react-icons/ai'
import { BiCopy } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { BsImage, BsArrowRight } from 'react-icons/bs'
import { LabelModal } from './actionModal/LabelModal';
import { MembersModal } from './actionModal/MembersModal'
import { DueDateModal } from './actionModal/DueDateModal'
import { MoveMdodal } from './actionModal/MoveModal'
import { CopyModal } from './actionModal/CopyModal'


class _ActionList extends Component {
    state = {
        task: null
    }

    componentDidMount() {

        this.setState({
            task: this.props.task
        })
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        const { task } = this.state
        if (!task) return <h1>Loading...</h1>
        return (
            <div className="menu-task flex column w-40 content-start right">
                <div className="close-details fam-2 font-1 bold pad-1">X</div>
                <div className="details-action flex column center pad-1 w-80">
                    <label htmlFor="actions" className="font-m pb-3">ACTIONS</label>
                    <ul className="action-menu flex column w-100 clean-list font-m pad-0 fw-2">

                        <li className="label-wrap">
                            <div className="btn-action w-100 " onClick={() => { this.props.toggleModal('label-wrap-modal') }}><MdLabelOutline />Labels</div>
                            <LabelModal toggleModal={() => { this.props.toggleModal() }} />
                        </li>

                        <ul className="members-wrap">
                            <li className="btn-action w-100 " onClick={() => {this.props.toggleModal('members-wrap-modal')}}><FiUsers />Members</li>
                            <MembersModal isMemberChecked={this.props.isMemberChecked} onAddMemberToTask={this.props.onAddMemberToTask} toggleModal={() => { this.props.toggleModal() }} />
                        </ul>

                        <li className="duedate-wrap">
                            <div className="btn-action w-100 " onClick={() => { this.props.toggleModal('duedate-wrap-modal') }}><AiOutlineClockCircle />DueDate</div>
                            <DueDateModal onSaveDueDate={this.props.onSaveDueDate} toggleModal={() => { this.props.toggleModal() }} />
                        </li>

                        <li onClick={() => { this.props.onAddCheckList(task) }} className="btn-action"><AiOutlineCheckSquare />Checklist</li>
                        <li className="btn-action"><BsImage />Image</li>
                        <li className="move-wrap">
                            <div className="btn-action w-100 " onClick={() => { this.props.toggleModal('move-wrap-modal') }}><BsArrowRight />Move</div>
                            <MoveMdodal group={this.props.group} task={task} toggleModal={() => { this.props.toggleModal() }} />
                        </li>
                        <li className="copy-wrap">
                            <div className="btn-action w-100 " onClick={() => { this.props.toggleModal('copy-wrap-modal') }}><BiCopy />Copy</div>
                            <CopyModal group={this.props.group} task={task} toggleModal={() => { this.props.toggleModal() }} />
                        </li>
                        <li onClick={() => { this.props.onDeleteTask() }} className="btn-action"><AiOutlineDelete />Delete</li>
                    </ul>
                </div>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
    }
}
const mapDispatchToProps = {

}


export const ActionList = connect(mapStateToProps, mapDispatchToProps)(_ActionList)
