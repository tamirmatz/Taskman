import { TaskPreview } from '../board/TaskPreview'

export function TaskList({ board, group, updateBoard }) {

    return <div className="task-list">
        <h1>{group.title}</h1>
        {group.tasks.map(task =>
                <TaskPreview key={task.id} board={board} group={group.id} updateBoard={updateBoard} task={task} />
        )}
    </div>
}



