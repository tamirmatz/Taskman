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

    toggleModal = (className) => {
        const modals = document.querySelectorAll('.action-modal');
        const currModal = document.querySelector(`.${className}`);
        console.log(modals);
        console.log(currModal);
        if (modals) {
            modals.forEach(
                el => el.classList.add('d-none'));
        }
        if (currModal) {
            currModal.classList.remove('d-none');
        }

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
                            <li className="btn-action w-100 " onClick={() => { this.toggleModal('label-wrap-modal') }}><MdLabelOutline />Labels</li>
                            <LabelModal toggleModal={() => { this.toggleModal() }} />
                        </li>

                        <li className="members-wrap">
                            <li className="btn-action w-100 " onClick={() => {this.toggleModal('members-wrap-modal')}}><FiUsers />Members</li>
                            <MembersModal toggleModal={() => { this.toggleModal() }} />
                        </li>

                        <li className="btn-action"><AiOutlineClockCircle />Due Date</li>
                        <li onClick={() => { this.onAddCheckList(task) }} className="btn-action"><AiOutlineCheckSquare />Checklist</li>
                        <li className="btn-action"><BsImage />Image</li>
                        <li className="btn-action"><BsArrowRight />Move</li>
                        <li className="btn-action"><BiCopy />Copy</li>
                        <li onClick={() => { this.onDeleteTask() }} className="btn-action"><AiOutlineDelete />Delete</li>
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
