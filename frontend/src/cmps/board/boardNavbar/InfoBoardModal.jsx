import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ModalAction } from '../../shared/ModalAction';
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { BsCalendar } from 'react-icons/bs'
import { BiBarChartAlt2 } from 'react-icons/bi'
import { RiDashboardLine } from 'react-icons/ri'





class _InfoBoardModal extends Component {

    render() {
        const { board } = this.props;
        return <div className="action-modal info-board-wrap-modal d-none p-abs flex">
            <ModalAction>
                <div className="info-board-modal p-abs flex column pad-1 bg-white c-stand z-1 br-3 h-100">
                    <div className="header-modal font-1 fam-1 fw-2 flex center space-between gap-5 w-100 mb-1">
                        <h1 className="fam-1 font-m ">Option</h1>
                        <span className="cur-pointer fam-1 font-m bold" onClick={() => { this.props.toggleModal() }}><AiOutlineClose /></span>
                    </div>
                    <div className="action-content font-m ">
                        <ul className="flex column space-evenly h-100">
                            <li
                                onClick={() => { this.props.changeDisplay('board') }}>
                                <RiDashboardLine />Board
                            </li>
                            <li 
                                onClick={() => { this.props.changeDisplay('dashboard') }}>
                                <BiBarChartAlt2 />Dashboard
                            </li>
                            <li
                                onClick={() => { this.props.changeDisplay('calendar') }}>
                                 <BsCalendar /> Calender</li>
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


export const InfoBoardModal = connect(mapStateToProps, mapDispatchToProps)(_InfoBoardModal)