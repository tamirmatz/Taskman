import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { remove, add, query } from '../store/actions/boardsAction.js';
import { MiniBoard } from '../cmps/board/MiniBoard'
import p0 from '../assets/img/background/0.jpg'
import p1 from '../assets/img/background/1.jpg'
import p2 from '../assets/img/background/2.jpg'
import p3 from '../assets/img/background/3.jpg'
import p4 from '../assets/img/background/4.jpg'
import p5 from '../assets/img/background/5.jpg'
import p6 from '../assets/img/background/6.jpg'
import p7 from '../assets/img/background/7.jpg'
import { Board } from './Board.jsx';

class _BoardList extends Component {
    state = {
        newBoard: {
            title: '',
            backgroundId: 0,
            backgrounds: [
                'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671389/backrounds/0_jflqwf.jpg',
                'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671416/backrounds/1_gavwov.jpg',
                'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671401/backrounds/2_gstip0.jpg',
                'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671395/backrounds/3_mqwgkk.jpg',
                'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671404/backrounds/4_ly2zj7.jpg',
                'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671550/backrounds/5_g7oe20.jpg',
                'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671430/backrounds/6_mi6wun.jpg',
                'https://res.cloudinary.com/dxsv4c229/image/upload/v1622671421/backrounds/7_oivv0t.jpg'
            ]
        }
    }
    componentDidMount() {
        this.props.query()

    }

    onCreateBoard = () => {
        const { title, backgrounds, backgroundId } = this.state.newBoard
        this.props.add(title, backgrounds[backgroundId])
        this.props.history.push(`/board/${this.props.boards[this.props.boards.length-1]._id}`)
    }

    changeImg = (num) => {
        const { backgroundId, backgrounds } = this.state.newBoard
        if (backgroundId + num === backgrounds.length || backgroundId + num === -1) num = 0
        this.setState(prevState => ({
            newBoard: {
                ...prevState.newBoard,
                backgroundId: backgroundId + num,
            }
        }), console.log(this.state.newBoard.backgroundId))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({
            newBoard: {
                ...prevState.newBoard,
                [field]: value,
            }
        }))
    }


    render() {
        const boards = this.props.boards
        console.log(boards);
        return (
            <section className=" w-100 flex column center content-center pad-3">
                <h1 className="fam-1">Choose Your Board List</h1>
                <div className="boards-gallary flex h-40 w-100 gap-2">
                    {boards && boards.map(board => <Link key={board._id} to={`board/${board._id}`}><MiniBoard board={board} /></Link>)}
                    <section className={"miniBoard flex center content-center" } style={{ backgroundImage: "url(" + this.state.newBoard.backgrounds[this.state.newBoard.backgroundId] + ")" }}>
                        <form onSubmit={(ev)=>{
                            ev.preventDefault()
                            this.onCreateBoard()
                            }}>
                            <input type="text" name="title" onChange={this.handleChange} placeholder="Board title..." />
                            <button>Create board</button>
                            <span onClick={() => { this.changeImg(-1) }}>{'<'}</span><span onClick={() => { this.changeImg(1) }}>{'>'}</span>
                        </form>
                    </section>
                    {!boards && <h1 >No boards to show</h1>}
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    remove,
    add,
    query
}
export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList)