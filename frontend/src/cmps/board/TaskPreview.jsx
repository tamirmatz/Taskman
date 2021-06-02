import { Link } from 'react-router-dom'
import { Draggable } from "react-beautiful-dnd";
import { Provider } from 'react-redux';
import { boardService } from '../../services/boardService.js'
import { BsCheckBox } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai'
import { GrTextAlignFull } from 'react-icons/gr'
import { connect } from 'react-redux'
import { utilService } from '../../services/generalService/utilService'
import React, { Component } from 'react'
import { UserPreview } from './UserPreview.jsx';

import { toggleLabel } from '../../store/actions/systemAction.js';



// export function TaskPreview({ board, index, task, updateBoard, groupId }) {
class _TaskPreview extends Component {

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
            background: '#fff',
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
        const isLabelOpen = this.props.isLabelOpen;
        return <Draggable
            draggableId={task.id}
            index={index}
        // isDragDisabled={false}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isdragging={snapshot.isDragging && !snapshot.isDropAnimating ? 'true' : 'false'}
                        style={this.getStyle(provided.draggableProps.style, snapshot)}
                    >
                        <div className="wrap-list-task br-3">
                            <div className="wrap-task-prev">
                                <div className="task-preview flex column">
                                    {/* <Link to={`/board/${board._id}/${task.id}`}> */}
                                    {utilService.isFalse(task.labelIds) &&
                                        <div className="flex row space-between center w-100">
                                            <div className="label-task-prev">
                                                <div className="labels-container wrap flex" onClick={(ev) => {
                                                    ev.stopPropagation();
                                                }}>
                                                    {
                                                        task.labelIds.map(labelId => {
                                                            const label = board.labels.find(label => {
                                                                return label.id === labelId;
                                                            })

                                                            if (label) {
                                                                return <div
                                                                    key={label.id}
                                                                    className={`preview-label ${isLabelOpen && "label-open"}`}
                                                                    onClick={() => this.props.toggleLabel(!isLabelOpen)}
                                                                    style={{ backgroundColor: label.color }}
                                                                >
                                                                    {this.props.isLabelOpen && label.title}
                                                                </div>
                                                            }
                                                        })}
                                                </div>
                                            </div>
                                            <span className="cur-pointer fam-1 font-s bold" onClick={() => { this.onRemoveTask(task.id) }}><AiOutlineClose /></span>
                                        </div>
                                    }

                                    <Link to={`/board/${board._id}/${groupId}/${task.id}`}>


                                        <h1 className="task-title fam-1 font-m">{task.title}</h1>
                                        <div className="task-mini-details flex w-100 content-start  gap-xs fam-1 c-stand">
                                            {utilService.isFalse(task.members) && <small className="flex center">{task.members.map(member => { return <UserPreview key={member._id} user={member} /> }).splice(0, 3)}</small>}
                                            {utilService.isFalse(task.comments) && <small className="flex center"><FaRegCommentDots /></small>}
                                            {utilService.isFalse(task.checklists) && <div className={`flex row center ${boardService.checklistPreview(task).isDone && "check-list-done-prev"}`}>
                                                <BsCheckBox />
                                                <small>{boardService.checklistPreview(task).str}</small>
                                            </div>}
                                            {task.dueDate && <div className="flex row center">
                                                <AiOutlineClockCircle />
                                                <small>
                                                    {task.dueDate}
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
            }
        </Draggable>
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        isLabelOpen : state.systemModule.isLabelsOpen
    }
}
const mapDispatchToProps = {
    toggleLabel
}
export const TaskPreview = connect(mapStateToProps, mapDispatchToProps)(_TaskPreview)