import {MembersBoard} from '../MembersBoard';
import {MdKeyboardArrowDown} from 'react-icons/md'
import {RiDashboardLine} from 'react-icons/ri'
import {AiOutlineStar} from 'react-icons/ai'




export function BoardNavbar({board}) {
    console.log(board)
    return (
        <nav className="board-navbar flex space-between font-1 c-white fam-1 mb-03">
            <ul className="left-bar flex center space-evenly ">
                <li className="btn-board"><RiDashboardLine/>Board<MdKeyboardArrowDown/></li>
                <li className="btn-board "><AiOutlineStar/></li>
                <li className="btn-board bold">{board.title}</li>
                <li className="btn-board">Visiblity</li>
                <li className="btn-board"><MembersBoard/></li>
                <li className="btn-board">invite</li>
            </ul>
            <ul className="right-bar flex center">
                <li className="btn-board">Show-menu</li>
            </ul>
        </nav>
    )
}

