import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Board } from '../../pages/Board.jsx';
import { boardService } from '../../services/boardService.js'
import { remove, add, query } from '../../store/actions/boardsAction.js';


class _TaskDetails extends Component {
    state = {
        group: null,
        task: null,
        onFocus: false
    }

    componentDidMount() {
        const { taskId, groupId } = this.props.match.params;
        const board = this.props.board;
        const group = boardService.getGroupById(board, groupId);
        const task = boardService.getTaskById(group, taskId);
        this.setState({ ...this.state, group: group, task: task })
    }

    onFocusDescription() {

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
        const { task, group } = this.state;
        if (!task) return <h1>Loading...</h1>
        return (
            <section className="task-details w-70 h-70 flex column bg-modal c-stand">
                <form className="form-details">
                    <div className="input-details">
                        <label htmlFor="title"><i class="fas fa-tasks-alt font-2 c-info"></i></label>
                        <input type="text" value={task.title} name="title" className="w-50 input-details fas fa-tasks-alt" onChange={this.handleChange} />
                    </div>
                </form>
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