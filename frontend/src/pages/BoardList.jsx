import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { remove, add, query } from '../store/actions/boardsAction.js';


class _BoardList extends Component {
    componentDidMount() {
        this.props.query()
    }


    render() {
        const boards = this.props.boards
        return (
            <section>
                <h1>I am board list</h1>
                {boards && boards.map(board => <Link key={board._id} to={`board/${board._id}`}>{board.title}</Link>)}
                {!boards && <h1>No boards to show</h1>}
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