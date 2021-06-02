import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'
import { UserPreview } from '../UserPreview';




class _BoardMembersModal extends Component {
    state = {
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        const members  = this.props.users;
        console.log(members)
        return <div className="action-modal c-stand board-members-wrap-modal d-none p-abs flex">
            <ModalAction>
                <div className="members-modal p-abs flex column pad-1">
                    <div className="header-modal font-1 fam-1 fw-2 flex center content-end gap-5 w-70">
                        <h1 className="fam-1 font-1 ">Members</h1>
                        <span className="cur-pointer fam-1 font-s bold" onClick={() => { this.props.toggleModal('board-members-wrap-modal') }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content">
                        <ul>
                            {members.map(member => {
                                return <li onClick={() => { this.props.onAddMemberToBoard(member) }} className="flex space-between member-modal center">
                                    <div className="flex center gap-xs">
                                        <UserPreview user={member}/>
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


export const BoardMembersModal = connect(mapStateToProps, mapDispatchToProps)(_BoardMembersModal)