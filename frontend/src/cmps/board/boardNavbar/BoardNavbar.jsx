import { MembersBoard } from '../MembersBoard';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiDashboardLine } from 'react-icons/ri'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { Component } from 'react';
import { BoardMembersModal } from './BoardMembersModal'
import { InfoBoardModal } from './InfoBoardModal'
import { BsCalendar } from 'react-icons/bs'
import { BiBarChartAlt2 } from 'react-icons/bi'




export class BoardNavbar extends Component {
    state = {
        displayBoard: this.props.displayBoard,
        title: this.props.board.title,
        members: this.props.board.members
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            displayBoard: this.props.displayBoard,
            title: this.props.board.title,
            members: this.props.board.members
        })
    }


    onAddMemberToBoard = (addedMember) => {
        const { members } = this.state
        const memberIdx = members.findIndex(member => member._id === addedMember._id)
        if (memberIdx !== -1) {
            members.splice(memberIdx, 1)
        }
        else members.push(addedMember)
        const copyBoard = { ...this.props.board }
        copyBoard.members = members
        console.log(members)
        this.props.updateBoard(copyBoard)
    }

    isMemberChecked = (memberCheck) => {
        const memberIdx = this.state.members.findIndex(member => member._id === memberCheck._id)
        if (memberIdx !== -1) {
            return 'checked'
        }
        else return ''
    }

    toggleModal = (className) => {
        const modals = document.querySelectorAll('.action-modal');
        const currModal = document.querySelector(`.${className}`);
        if (modals) {
            modals.forEach(
                el => el.classList.add('d-none'));
        }
        if (currModal) {
            currModal.classList.remove('d-none');
        }
    }
    onChangeBoardName = () => {
        const board = this.props.board
        board.title = this.state.title
        this.props.updateBoard(board)
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value })
    }

    render() {
        const { board, onUpdate } = this.props;
        const displayBoard = this.props.displayBoard
        if (!board) return <div>Loading...</div>
        return (
            <nav className="board-navbar flex space-between font-m c-white fam-1 ">
                <ul className="left-bar flex center space-evenly ">
                    <ul className="display-option">
                        {displayBoard === 'board' &&
                            <div className="board-option">
                                <li className="btn-board btn-board-navbar bg-board-btn flex center space-evenly cur-poiner" onClick={() => { this.toggleModal('info-board-wrap-modal') }}>
                                    <span className="ps-xxs flex center"><RiDashboardLine /></span>
                                Board
                                <span className="font-2 flex right">
                                        <MdKeyboardArrowDown />
                                    </span>
                                </li>
                                <InfoBoardModal
                                    toggleModal={() => { this.toggleModal() }}
                                    changeDisplay={this.props.changeDisplay}
                                />
                            </div>
                        }

                        {displayBoard === 'dashboard' &&
                            <div className="board-option">
                                <li className="btn-board btn-board-navbar bg-board-btn flex center space-evenly cur-poiner" onClick={() => { this.toggleModal('info-board-wrap-modal') }}>
                                    <span className="ps-xxs flex center"><BiBarChartAlt2 /></span>
                                Dashboard
                                <span className="font-2 flex right">
                                        <MdKeyboardArrowDown />
                                    </span>
                                    <InfoBoardModal
                                        toggleModal={() => { this.toggleModal() }}
                                        changeDisplay={this.props.changeDisplay}
                                    />
                                </li>
                            </div>
                        }

                        {displayBoard === 'calendar' &&
                            <div className="board-option">
                                <li className="btn-board btn-board-navbar bg-board-btn flex center space-evenly cur-poiner" onClick={() => { this.toggleModal('info-board-wrap-modal') }}>
                                    <span className="ps-xxs flex center"><BsCalendar /></span>
                                    Calendar
                                    <span className="font-2 flex right">
                                        <MdKeyboardArrowDown />
                                    </span>
                                </li>
                                <InfoBoardModal
                                    toggleModal={() => { this.toggleModal() }}
                                    changeDisplay={this.props.changeDisplay}
                                />
                            </div>
                        }

                    </ul>

                    <li className="btn-board bold input-navbar input-board-title">
                        <div onClick={(ev) => {
                            ev.preventDefault()
                            this.onChangeBoardName(ev)
                        }}>
                            <input type="text"
                                className="app-input nav-board-input bold font-m lh-20 c-white "
                                name="title"
                                onChange={this.handleChange}
                                autoComplete="off"
                                value={this.state.title}
                                onBlur={this.onChangeBoardName}
                            />
                        </div>
                    </li>
                    <li className="btn-board btn-board-navbar bg-board-btn" onClick={this.props.favBoard}>
                        {!board.isFavorite && <AiOutlineStar />}
                        {board.isFavorite && <AiFillStar />}
                    </li>
                    <span className="board-btn-divider"></span>
                    <li className="btn-board btn-board-navbar bg-board-btn">Visiblity</li>
                    <span className="board-btn-divider"></span>
                    <li className="btn-board bg-inherit" ><MembersBoard /></li>
                    <ul className="members-wrap ">
                        <li
                            className="btn-board btn-board-navbar bg-board-btn"
                            onClick={() => { this.toggleModal('board-members-wrap-modal') }}>
                            Invite
                        </li>
                        <BoardMembersModal
                            users={this.props.users}
                            isMemberChecked={this.isMemberChecked}
                            onAddMemberToBoard={this.onAddMemberToBoard}
                            toggleModal={() => { this.toggleModal() }}
                        />
                    </ul>
                </ul>
                <ul className="right-bar flex center">
                    <li className="btn-board btn-board-navbar bg-board-btn" onClick={() => this.props.removeBoard()}>Delete Board</li>
                </ul>
            </nav>
        )
    }
}

