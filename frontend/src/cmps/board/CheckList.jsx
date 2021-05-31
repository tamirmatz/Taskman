import React, { Component } from 'react'
import { utilService } from '../../services/generalService/utilService'
import {CheckListStatus} from './CheckListStatus'

export class CheckList extends Component {
    state = {
        checklist: this.props.checklist
    }

    handleChangeCheckList = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({
            checklist: {
                ...prevState.checklist,
                [field]: value,
            }
        }), () => {
            const checklists = this.props.checklists.slice()
            checklists.splice(this.props.idx, 1, { ...this.state.checklist, [field]: value })
            this.props.handleChange({ target: { name: 'checklists', 'value': checklists } })
        })
    }

    handleChangeTodos = async ({ target }, idx, isRemove = false) => {
        if (isRemove) {
            const todos = this.props.checklist.todos.slice()
            todos.splice(idx, 1)
            await this.handleChangeCheckList({ target: { name: 'todos', 'value': todos } })
        }
        else {
            if (idx !== -1) {
                let value = target.type === 'checkbox' ? target.checked : target.value;
                const field = target.name
                const todos = this.props.checklist.todos.slice()
                todos.splice(idx, 1, { ...this.state.checklist.todos[idx], [field]: value })
                await this.handleChangeCheckList({ target: { name: 'todos', 'value': todos } })
            }
            else {
                const value = target[0].value
                if (!value) return
                const todos = this.props.checklist.todos.slice()
                todos.push({ txt: value, id: utilService.makeId(), isDone: false })
                await this.handleChangeCheckList({ target: { name: 'todos', 'value': todos } })
            }
        }
        this.props.updateTask()
    }

    render() {
        const { checklist } = this.state
        if (!checklist) return <div>loading...</div>
        return (
            <li>
                <div className="flex space-between center">
                    {/* <h1>{checklist.title}</h1> */}
                    <label htmlFor="title" className="font-6"></label>
                    <input onBlur={this.props.updateTask} type="text" value={checklist.title} name="title" className="input-details" onChange={this.handleChangeCheckList} />
                    <button>Delete</button>
                </div>
                <CheckListStatus task={this.props.task}/>
                <ul>
                    {checklist.todos.map((todo, idx) => {
                        return <li className="flex">
                            <input type="checkbox" name="isDone" checked={todo.isDone} onChange={(ev) => {
                                this.handleChangeTodos(ev, idx)
                            }
                            } />
                            <input className={todo.isDone && "done-todo"} type="text" name="txt" className="input-details" value={todo.txt} onChange={(ev) => {
                                this.handleChangeTodos(ev, idx)
                            }} />
                            <button onClick={() => {
                                this.handleChangeTodos({}, idx, true)
                            }}>X</button>
                        </li>
                    })}
                    <form onSubmit={(ev) => {
                        ev.preventDefault()
                        this.handleChangeTodos(ev, -1)
                    }}>
                        <input type="text" className="input-details" placeholder="+ Add Todo" />
                    </form>
                </ul>
            </li>
        )
    }
}

