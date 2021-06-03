import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'
import { remove, add, loadBoard, update, setBoard } from '../../../../../store/actions/boardsAction.js';
import { boardService } from '../../../../../services/boardService.js'

class _GroupModal extends Component {
    state = {
        group: null
    }

    componentDidMount() {
        this.setState({ group: this.props.group })
    }

    componentDidUpdate(prevProps) {

    }

    addTask = () => {

    }

    removeList = (groupId) => {
        const copyBoard = { ...this.props.board }
        const groupIdx = boardService.getGroupIdxById(copyBoard, groupId)
        copyBoard.groups.splice(groupIdx,1)
        this.props.update(copyBoard)
    }
    render() {
        const group = this.state.group;
        if (!group) return <h1>Loading...</h1>
        const groupId = group.id;
        return <div className={`action-modal group-wrap-modal ${groupId} d-none p-abs flex`}>
            <ModalAction>
                <div className="group-modal p-abs flex column pad-07 c-stand z-1 br-3">
                    <div className="header-modal font-1 fam-1 fw-2 flex center space-between gap-5 w-100 mb-1">
                        <h1 className="fam-1 font-1 ">List: {group.title}</h1>
                        <span className="cur-pointer fam-1 font-m bold" onClick={() => { this.props.toggleModal(`${groupId}`) }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content">
                        <ul className="flex column space-between">
                            <ul >
                                <li onClick={() => { this.AddTask() }} className="font-2 fam-1 pad-1 li-btn flex center">Add Task...</li>
                                <li onClick={() => { this.removeList(groupId) }} className="font-2 fam-1 pad-1 flex center li-btn">Remove List...</li>
                                <h1>Label of color!!!</h1>
                            </ul>
                        </ul>
                    </div>
                </div>
            </ModalAction>
        </div>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    update
}


export const GroupModal = connect(mapStateToProps, mapDispatchToProps)(_GroupModal)