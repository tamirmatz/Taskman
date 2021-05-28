import { Link } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Provider } from 'react-redux';
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

                <div className="task-preview font-s pad-20">
                    <Link to={`/board/${board._id}/${task.id}`}>
                        <h1>{task.title}</h1>
                    </Link>
                </div>
            </div>
        )
        }
    </Draggable>
}
