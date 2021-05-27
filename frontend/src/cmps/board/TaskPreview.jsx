import { Link } from 'react-router-dom'
export function TaskPreview({board, task, updateBoard}) {

    return <div className="task-preview font-s">
        <Link to={`${board._id}/${task.id}`}>
            <h1>{task.title}</h1>
            </Link>
    </div>
}
