import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { MdLabelOutline } from 'react-icons/md'
import { AiOutlineClockCircle, AiOutlineCheckSquare, AiOutlineDelete } from 'react-icons/ai'
import { BiCopy } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { BsImage, BsArrowRight } from 'react-icons/bs'
import { LabelModal} from './actionModal/LabelModal';
import { MembersModal} from './actionModal/MembersModal'


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

    openLabel = () => {
        document.querySelector('.label-wrap-modal').classList.toggle('d-none')
    }

    openMembers = () => {
        document.querySelector('.members-wrap-modal').classList.toggle('d-none')
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
                        <div className="label-wrap">
                            <li className="btn-action w-100 " onClick={this.openLabel}><MdLabelOutline />Labels</li>
                            <LabelModal/>
                        </div>
                        <div className="label-wrap">
                            <li className="btn-action w-100 " onClick={this.openMembers}><FiUsers />Members</li>
                            <MembersModal/>
                        </div>
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
