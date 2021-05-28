import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Board } from '../../pages/Board.jsx';
import {boardService} from '../../services/boardService.js'
import { remove, add, query } from '../../store/actions/boardsAction.js';


class _TaskDetails extends Component {
    state = {
        group: null,
        task: null
    }

    componentDidMount(){
        const { taskId, groupId } = this.props.match.params;
        const board = this.props.board;
        const  group = boardService.getGroupById(board, groupId);
        const task = boardService.getTaskById(group, taskId);
        this.setState({...this.state, group: group, task: task})
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        
        this.setState(prevState => ({
            task: {
                ...prevState.toy,
                [field]: value,
            }
        }))
    }

    render() {
        const {task, group} = this.state;
        console.log(task, group)
        if(!task) return <h1>Loading...</h1>
        return (
            <section className="task-details w-50 h-70 bg-danger c-stand">
                <h1>Task details</h1>
                <h4>{task.title}</h4>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    remove,
    add,
    query
}
export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)