import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'
import { LabelTask } from '../LabelTask'
import { update } from '../store/actions/boardsAction.js';


class _MoveMdodal extends Component {
    state = {
        
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }
    render() {
        return <div className="action-modal move-wrap-modal d-none p-abs flex">
            <ModalAction>
                <div className="label-modal p-abs flex column pad-1">
                    <div className="header-modal font-1 fam-1 fw-2 flex center content-end gap-5 w-70">
                        <h1 className="fam-1 font-1 ">Move to</h1>
                        <span className="cur-pointer fam-1 font-s bold" onClick={() => { this.props.toggleModal('move-wrap-modal') }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content">
                        <form onSubmit={this.moveTask}>
                        <select onChange={this.handleChange}>
                            {}
                        </select>

                        </form>
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


export const MoveMdodal = connect(mapStateToProps, mapDispatchToProps)(_MoveMdodal)