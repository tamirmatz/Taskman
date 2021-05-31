import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { remove, add, query } from '../store/actions/boardsAction.js';
import {MiniBoard} from '../cmps/board/MiniBoard'


class _BoardList extends Component {
    componentDidMount() {
        this.props.query()
        
    }


    render() {
        const boards = this.props.boards
        return (
            <section className=" w-100 flex column center content-center pad-3">
                <h1 className="fam-1">Choose Your Board List</h1>
                <div className="boards-gallary flex h-40 w-100">
                    {boards && boards.map(board => <Link key={board._id} to={`board/${board._id}`}><MiniBoard title={board.title}/></Link>)}
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