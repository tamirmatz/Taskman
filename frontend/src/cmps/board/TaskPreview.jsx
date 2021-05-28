import { Link } from 'react-router-dom'
export function TaskPreview({board,group, task, updateBoard}) {

    return <div className="task-preview font-s pad-20">
        <Link to={`/board/${board._id}/g102/c104`}>
            <h1>{task.title}</h1>
            </Link>
    </div>
}
