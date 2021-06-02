import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { FiEdit2 } from 'react-icons/fi'
import { withRouter } from "react-router";
import { update } from '../../../../store/actions/boardsAction';
import { boardService } from '../../../../services/boardService';

class _LabelTask extends Component {
    state = {
        isDisable: true,
        title: 'null',
        task: null,
        group: null
    }

    componentDidMount() {
        const { taskId, groupId } = this.props.match.params;
        const board = this.props.board;
        const group = boardService.getGroupById(board, groupId);
        const task = boardService.getTaskById(group, taskId);
        this.setState({ ...this.state, task: task, group: group });
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            const { boardId, taskId, groupId } = this.props.match.params;
            const board = { ...this.props.board };
            const group = boardService.getGroupById(board, groupId);
            const task = boardService.getTaskById(group, taskId);
            this.setState({ ...this.state, task: task, group: group });
        }
    }

    toggleLabel(labelId) {
        const { task, group } = this.state;
        const board = { ...this.props.board };
        if (!task.labelIds) {
            task.labelIds = []
        }
        const labelIdx = task.labelIds.findIndex(currLabelId => currLabelId === labelId);
        if (labelIdx > -1) {
            task.labelIds.splice(labelIdx, 1)
        } else task.labelIds.push(labelId)
        const updateBoard = boardService.updateTaskAtBoard(board, group, task);
        this.props.update(updateBoard)
    }

    toggleDisable() {
        console.log(this.state.isDisable);
        this.setState({
            isDisable: !this.state.isDisable
        })
    }

    borderLabel = (task, labelId) => {
        if (task.labelIds) {
            if (task.labelIds.includes(labelId))
                return 'border';
        }
        return '';
    }

    handleChange = ({ target }) => {
        const value = target.value;
        this.setState({...this.state,
            title: value
        });
        const label = this.props.label;
        label.title = this.state.title;
        this.updateLabelBoard(label);
    }

    updateLabelBoard = () => {
        const { board, label } = this.props;
        const idx = board.labels.findIndex(currLabel => currLabel.id === label.id);
        board.labels.splice(idx,1, label);
        this.props.update(board);
    };

    render() {
        const { label } = this.props;
        const { task } = this.state;
        let className;
        if (task) {
            className = this.borderLabel(task, label.id);
        }

        return (
            <div className="label flex gap-2" data-label={label.id}>
                <input
                    type="text"
                    name="title"
                    style={{ background: `${label.color}` }}
                    className={`label-input label-${label.id} ${this.state.isDisable} ${className} cur-pointer`}
                    onChange={this.handleChange}
                    onClick={() => this.toggleLabel(label.id)}
                />
                <span onClick={() => { this.toggleDisable() }} className="edit-label"><FiEdit2 /> </span>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    update
}


export const LabelTask = connect(mapStateToProps, mapDispatchToProps)(withRouter(_LabelTask))