import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'




class _DueDateModal extends Component {
    state = {
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return <div className="action-modal duedate-wrap-modal d-none p-abs flex">
            <ModalAction>
                <div className="duedate-modal p-abs flex column pad-1">
                    <div className="header-modal font-1 fam-1 fw-2 flex center content-end gap-5 w-70">
                        <h1 className="fam-1 font-1 ">DueDate</h1>
                        <span className="cur-pointer fam-1 font-s bold" onClick={() => { this.props.toggleModal('duedate-wrap-modal') }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content">
                        <ul>
                            <input onChange={(ev) => { this.props.onSaveDueDate(ev.target.value) }} type="date" />
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

}


export const DueDateModal = connect(mapStateToProps, mapDispatchToProps)(_DueDateModal)