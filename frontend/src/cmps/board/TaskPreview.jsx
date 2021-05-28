import { Link } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Provider } from 'react-redux';
import {boardService} from '../../services/boardService.js'

export function TaskPreview({ board, index, task, updateBoard }) {

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

                <div className="task-preview font-s pad-20 ">
                    {/* <Link to={`/board/${board._id}/${task.id}`}> */}
                    <Link to={`/board/${board._id}/g102/c104`}>
                        <h1 className="c-stand pad-1 fam-1">{task.title}</h1>
                        {task.comments && <small>comments</small> }
                        {task.checklists && <small>{boardService.checklistPreview(task)}</small> }
                        {task.dueDate && <small>{Intl.DateTimeFormat('IL-il').format(task.dueDate)}</small> }
                    </Link>
                </div>
            </div>
        )
        }
    </Draggable>
}
