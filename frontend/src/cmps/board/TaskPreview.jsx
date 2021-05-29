import { Link } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Provider } from 'react-redux';
import { boardService } from '../../services/boardService.js'

export function TaskPreview({ board, index, task, updateBoard, groupId }) {

    function onRemoveTask(taskId) {
        const group = board.groups[boardService.getGroupIdxById(board, groupId)]
        board.groups[boardService.getGroupIdxById(board, groupId)].tasks.splice(boardService.getTaskIdxById(group, taskId), 1)
        updateBoard({...board})
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

            >

                <div className="task-preview font-s pad-20 flex">
                    {/* <Link to={`/board/${board._id}/${task.id}`}> */}
                    <Link to={`/board/${board._id}/${groupId}/${task.id}`}>
                        <h1 className="c-stand pad-1 fam-1">{task.title}</h1>
                        {task.comments && <small>comments</small>}
                        {task.checklists && <small>{boardService.checklistPreview(task)}</small>}
                        {task.dueDate && <small>{Intl.DateTimeFormat('IL-il').format(task.dueDate)}</small>}
                    </Link>
                    <span className="cur-pointer" onClick={() => { onRemoveTask(task.id) }}>X</span>
                </div>
            </div>
        )
        }
    </Draggable>
}
