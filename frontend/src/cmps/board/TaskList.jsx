import { TaskPreview } from '../board/TaskPreview'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
export function TaskList({ board, group, updateBoard, index }) {
    return/*  <div className="group-container"> */(
    <Draggable index={index} isDragDisabled={false} draggableId={group.id}>
            {(provided, snapshot) => {
                return <li className="task-list"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        backgroundColor: snapshot.isDraggingOver ? 'lightblue' : '#EBECF0'
                    }}
                >
                    <h1>{group.title}</h1>
                    <Droppable key={index} droppableId={group.id} type='task'>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {group.tasks.map((task, idx) => (
                                    <TaskPreview key={task.id}
                                        board={board}
                                        index={idx}
                                        group={group.id} 
                                        updateBoard={updateBoard}
                                        task={task}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </li>
            }}
        </Draggable>)
 /*    </div> */
}