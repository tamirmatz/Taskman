import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'




class _MembersModal extends Component {
    state = {
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }
    onCloseLabel = (ev) => {
        document.querySelector('.members-wrap-modal').classList.toggle('d-none')

        // const { boardId, taskId, groupId } = this.props.match.params;
        // this.props.history.push(`/board/${boardId}/${groupId}/${taskId}`)
    }
    render() {
        return <div className="members-wrap-modal d-none p-abs flex">
            <ModalAction onClick={(event) => { this.onCloseLabel(event) }}>
                <div className="action-modal members-modal p-abs flex column pad-1">
                        <div className="header-modal font-1 fam-1 fw-2 flex center content-end gap-5 w-70">
                            <h1 className="fam-1 font-1 ">Members</h1>
                            <span className="cur-pointer fam-1 font-s bold" onClick={() => { this.onCloseLabel() }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content">
                        <ul>
                            <li>Avi</li>
                            <li>MOR</li>
                            <li>TALIA</li>
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


export const MembersModal = connect(mapStateToProps, mapDispatchToProps)(_MembersModal)