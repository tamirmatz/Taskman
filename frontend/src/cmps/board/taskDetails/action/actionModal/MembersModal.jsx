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

    render() {
        const { members } = this.props.board;
        return <div className="action-modal members-wrap-modal d-none p-abs flex">
            <ModalAction>
                <div className="members-modal p-abs flex column pad-1">
                    <div className="header-modal font-1 fam-1 fw-2 flex center content-end gap-5 w-70">
                        <h1 className="fam-1 font-1 ">Members</h1>
                        <span className="cur-pointer fam-1 font-s bold" onClick={() => { this.props.toggleModal('members-wrap-modal') }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content">
                        <ul>
                            {members.map(member => {
                                return <li onClick={() => { this.props.onAddMemberToTask(member) }} className="flex space-between member-modal center">
                                    <div className="flex center gap-xs">
                                        <img src={member.imgUrl} className="avatar" />
                                        <p>{member.fullname} ({member.username})</p>
                                    </div>
                                    <span className={`check ${this.props.isMemberChecked(member)}`}>✓</span>
                                </li>
                            })}
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