import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { remove, add, query } from '../../store/actions/boardsAction.js';


class _TaskDetails extends Component {
    render() {
        const task = {
            "id": "c104",
            "title": "Help me",
            "description": "description",
            "comments": [
                {
                    "id": "ZdPnm",
                    "txt": "also @yaronb please CR this",
                    "createdAt": 1590999817436.0,
                    "byMember": {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    }
                }
            ],
            "checklists": [
                {
                    "id": "YEhmF",
                    "title": "Checklist",
                    "todos": [
                        {
                            "id": "212jX",
                            "title": "To Do 1",
                            "isDone": false
                        }
                    ]
                }
            ],
            "members": [
                {
                    "_id": "u101",
                    "username": "Tal",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
            ],
            "labelIds": ["101"],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
                "_id": "u101",
                "username": "Tal",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "style": {
                "bgColor": "#26de81"
            }
        }
        const { taskId } = this.props.match.params;
        console.log(taskId)
        return (
            <section className="task-details">
                <h1>Task details</h1>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    remove,
    add,
    query
}
export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)