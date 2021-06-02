import { MembersBoard } from '../MembersBoard';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiDashboardLine } from 'react-icons/ri'
import { AiOutlineStar } from 'react-icons/ai'
import { Component } from 'react';
import { BoardMembersModal } from './BoardMembersModal'



export class BoardNavbar extends Component {
    state = {
        title: this.props.board.title,
        members: this.props.board.members
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
        const { board, onUpdate } = this.props
        if (!board) return <div>Loading...</div>
        return (
            <nav className="board-navbar flex space-between font-1 c-white fam-1 mb-03">
                <ul className="left-bar flex center space-evenly ">
                    <li className="btn-board"><RiDashboardLine />Board<MdKeyboardArrowDown /></li>
                    <li className="btn-board "><AiOutlineStar /></li>
                    <li className="btn-board bold"><form onSubmit={(ev) => {
                        ev.preventDefault()
                        this.onChangeBoardName(ev)
                    }}>
                        <input type="text" className="app-input nav-board-input font-w2 font-m lh-20 " name="title" onChange={this.handleChange} value={this.state.title} onBlur={this.onChangeBoardName} />
                    </form></li>
                    <li className="btn-board">Visiblity</li>
                    <ul className="members-wrap">
                        <li className="btn-board " onClick={() => { this.toggleModal('board-members-wrap-modal') }}>Invite</li>
                        <BoardMembersModal users={this.props.users} isMemberChecked={this.isMemberChecked} onAddMemberToBoard={this.onAddMemberToBoard} toggleModal={() => { this.toggleModal() }} />
                    </ul>
                    <li className="btn-board" ><MembersBoard /></li>
                </ul>
                <ul className="right-bar flex center">
                    <li className="btn-board">Show-menu</li>
                </ul>
            </nav>
        )
    }
}

