import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { FiEdit2 } from 'react-icons/fi'
import { withRouter } from "react-router";
import { update } from '../../../../store/actions/boardsAction';
import { boardService } from '../../../../services/boardService';






class _LabelTask extends Component {
    state = {
        isDisable : true
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    toggleLabel(labelId) {
        debugger
        const {taskId, groupId } = this.props.match.params;
        const board = this.props.board;
        const group = boardService.getGroupById(board,groupId); 
        const task =  boardService.getTaskById(group,taskId);
        if(!task.labelIds){
            task.labelIds = []
        }
        const labelIdx =task.labelIds.findIndex( currLabelId => currLabelId === labelId);
        if(labelIdx !== -1){
            task.labelIds.splice(labelIdx,1)
        }
       else task.labelIds.push(labelId)
        const updateBoard = boardService.updateTaskAtBoard(board,groupId, task);
        this.props.update(updateBoard)
    }

    toggleDisable(){
        this.setState({
            isDisable : !this.state.isDisable
        })
    }

    render() {
        const { label } = this.props;
        
        return (
            <div className="label flex gap-2" data-label={label.id}>
                <input
                    type="text"
                    style={{ background: `${label.color}` }}
                    className={`label-input label-${label.id} ${this.state.isDisable} c-pointer`}
                    onChange={() => { console.log('aa'); }}
                    onClick={() => this.toggleLabel(label.id)}
                />
                <span onClick={()=>{this.toggleDisable()}} className="edit-label"><FiEdit2 /> </span>
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