import { Link } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Provider } from 'react-redux';
import { boardService } from '../../services/boardService.js'
import { BsCheckBox } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { GrTextAlignFull } from 'react-icons/gr'
import { utilService } from '../../services/generalService/utilService'
import React, { Component } from 'react'



// export function TaskPreview({ board, index, task, updateBoard, groupId }) {
export class TaskPreview extends Component {
    state = {
        isLabelOpen: false
    }

    toggleLabels = () => {
        this.setState({ isLabelOpen: !this.state.isLabelOpen })
    }

    getStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        const { moveTo, curve, duration } = snapshot.dropAnimation;
        // move to the right spot
        const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
        // add a bit of turn for fun
        const rotate = 'rotate(0.01turn)';

        // patching the existing style
        return {
            ...style,
            transform: `${translate} ${rotate}`,
            // slowing down the drop because we can
            transition: `all ${curve} 0.2s`,
        };
    }

    onRemoveTask = (taskId) => {
        const { board, index, task, updateBoard, groupId } = this.props
        const group = board.groups[boardService.getGroupIdxById(board, groupId)]
        board.groups[boardService.getGroupIdxById(board, groupId)].tasks.splice(boardService.getTaskIdxById(group, taskId), 1)
        updateBoard({ ...board })
    }
    render() {
        const { board, index, task, updateBoard, groupId } = this.props
        return <Draggable
            draggableId={task.id}
            index={index}
            isDragDisabled={false}
        >
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                    style={this.getStyle(provided.draggableProps.style, snapshot)}
                >
                    <div className="wrap-list-task br-3">
                        <div className="wrap-task-prev">
                            <div className="task-preview flex column">
                                {/* <Link to={`/board/${board._id}/${task.id}`}> */}
                                <div className="flex row space-between center w-100">
                                    <div className="label-task-prev">
                                        {utilService.isFalse(task.labelIds) &&
                                            <div className="labels-container wrap flex" onClick={(ev) => {
                                                ev.stopPropagation();
                                            }}>
                                                {task.labelIds.map(labelId => {

                                                    const label = board.labels.find(label => {
                                                        return label.id === labelId;
                                                    })

                                                    if (label)
                                                        return <div className={`preview-label font-s flex center bold fam-1 content-center pad-xs ${this.state.isLabelOpen && "label-open"}`} onClick={this.toggleLabels} style={{ backgroundColor: label.color }}>
                                                            {this.state.isLabelOpen && label.title}
                                                        </div>
                                                })}</div>}
                                    </div>
                                    <span className="cur-pointer fam-1 bold" onClick={() => { this.onRemoveTask(task.id) }}>X</span>
                                </div>

                                <Link to={`/board/${board._id}/${groupId}/${task.id}`}>


                                    <h1 className="task-title fam-1 font-m">{task.title}</h1>
                                    <div className="flex content-start ps-1 gap-xs font-1 fam-1">
                                        {utilService.isFalse(task.comments) && <small className="flex center"><FaRegCommentDots /></small>}
                                        {utilService.isFalse(task.checklists) && <div className={`flex row center ${boardService.checklistPreview(task).isDone && "check-list-done-prev"}`}>
                                            <BsCheckBox />
                                            <small>{boardService.checklistPreview(task).str}</small>
                                        </div>}
                                        {task.dueDate && <div className="flex row center">
                                            <AiOutlineClockCircle />
                                            <small>
                                                {utilService.timeAgo(task.dueDate)}
                                            </small>
                                        </div>}
                                        {task.description && <small className="flex center"><GrTextAlignFull /></small>}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </Draggable>
    }
}
