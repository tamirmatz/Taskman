import { MembersBoard } from '../MembersBoard';
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiDashboardLine } from 'react-icons/ri'
import { AiOutlineStar } from 'react-icons/ai'
import { Component } from 'react';




export class BoardNavbar extends Component {
    state = {
        title: this.props.board.title
    }
    onChangeBoardName = () => {
        const board =this.props.board
        board.title = this.state.title
        this.props.updateBoard(board)
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({[field]:value})
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
                        <input type="text" className="app-input font-w2 font-m lh-20 " name="title" onChange={this.handleChange} value={this.state.title} onBlur={ this.onChangeBoardName } />
                    </form></li>
                    <li className="btn-board">Visiblity</li>
                    <li className="btn-board"><MembersBoard /></li>
                    <li className="btn-board">invite</li>
                </ul>
                <ul className="right-bar flex center">
                    <li className="btn-board">Show-menu</li>
                </ul>
            </nav>
        )
    }
}

