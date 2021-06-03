import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'

class _GroupModal extends Component {

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        const group = this.props.group;
        const groupId = group.id;
        return <div className={`action-modal group-wrap-modal ${groupId} d-none p-abs flex`}>
            <ModalAction>
                <div className="group-modal p-abs flex column pad-07 c-stand z-1 br-3">
                    <div className="header-modal font-1 fam-1 fw-2 flex center space-between gap-5 w-100 mb-1">
                        <h1 className="fam-1 font-1 ">List: {group.title}</h1>
                        <span className="cur-pointer fam-1 font-m bold" onClick={() => { this.props.toggleModal(`${groupId}`) }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content">
                        <ul>
                            <li>action list</li>
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


export const GroupModal = connect(mapStateToProps, mapDispatchToProps)(_GroupModal)