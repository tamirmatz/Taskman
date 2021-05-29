import { Link } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Provider } from 'react-redux';
import { boardService } from '../../services/boardService.js'
import { BsCheckBox } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { GrTextAlignFull } from 'react-icons/gr'
import { utilService } from '../../services/generalService/utilService'



export function TaskPreview({ board, index, task, updateBoard, groupId }) {

    function getStyle(style, snapshot) {
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

    function onRemoveTask(taskId) {
        const group = board.groups[boardService.getGroupIdxById(board, groupId)]
        board.groups[boardService.getGroupIdxById(board, groupId)].tasks.splice(boardService.getTaskIdxById(group, taskId), 1)
        updateBoard({ ...board })
    }

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
                style={getStyle(provided.draggableProps.style, snapshot)}
            >

                <div className="task-preview font-s pad-20 flex">
                    {/* <Link to={`/board/${board._id}/${task.id}`}> */}
                    <Link to={`/board/${board._id}/${groupId}/${task.id}`}>
                        <h1 className="c-stand pad-07 fam-1">{task.title}</h1>
                        <div className="flex row">
                            {utilService.isFalse(task.comments) && <small className="flex center"><FaRegCommentDots /></small>}
                            {utilService.isFalse(task.checklists) && <div className="flex row center">
                                <BsCheckBox />
                                <small>{boardService.checklistPreview(task)}</small>
                            </div>}
                            {task.dueDate && <div className="flex row center">
                                <AiOutlineClockCircle />
                                <small>{Intl.DateTimeFormat('IL-il').format(task.dueDate)}</small>
                            </div>}
                            {task.description && <small className="flex center"><GrTextAlignFull /></small>}
                        </div>
                    </Link>
                    <span className="cur-pointer" onClick={() => { onRemoveTask(task.id) }}>X</span>
                </div>
            </div>
        )
        }
    </Draggable>
}
