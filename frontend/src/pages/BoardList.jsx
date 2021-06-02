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

class _BoardList extends Component {
    state = {
        newBoard: {
            title: '',
            backgroundId: 0,
            backgrounds: [p1, p2, p3, p4, p5, p6, p7]
        }
    }
    componentDidMount() {
        this.props.query()

    }

    onCreateBoard = () => {
        const { title, backgrounds,backgroundId } = this.state.newBoard
        this.props.add(title, backgrounds[backgroundId])
    }

    changeImg = (num) => {
        const { backgroundId, backgrounds } = this.state.newBoard
        if (backgroundId + num === backgrounds.length||backgroundId + num === -1) num = 0
        this.setState(prevState => ({
            newBoard: {
                ...prevState.newBoard,
                backgroundId: backgroundId + num,
            }
        }),console.log(this.state.newBoard.backgroundId))
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
        return (
            <section className=" w-100 flex column center content-center pad-3">
                <h1 className="fam-1">Choose Your Board List</h1>
                <div className="boards-gallary flex h-40 w-100">
                    {boards && boards.map(board => <Link key={board._id} to={`board/${board._id}`}><MiniBoard title={board.title} /></Link>)}
                    <section className="miniBoard flex center content-center" style={{ backgroundImage: "url(" + this.state.newBoard.backgrounds[this.state.newBoard.backgroundId] + ")" }}>
                        <form onSubmit={this.onCreateBoard}>
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