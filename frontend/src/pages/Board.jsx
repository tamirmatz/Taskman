import { connect } from 'react-redux'
import { remove, add, loadBoard } from '../store/actions/boardsAction.js';
import React, { Component } from 'react'


class _Board extends Component {
    state = {

    }
    componentDidMount() {
        
    }
    
    render() {
        const { boardId } = this.props.match.params
        const board = this.props.loadBoard(boardId);
        console.log(board)
        return (
            <section>
                <h1>{board._id}</h1>
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
    loadBoard
}
export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)