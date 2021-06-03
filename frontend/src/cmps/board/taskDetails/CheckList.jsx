import React, { Component } from 'react'
import { utilService } from '../../../services/generalService/utilService'
import { CheckListStatus } from './CheckListStatus'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsCheckBox } from 'react-icons/bs'


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
        // if (!checklist) return <div>loading...</div>
        return (
            <li>
                <div className="flex space-between center">
                    <div className="flex center desc-header">
                        <BsCheckBox />
                        <input onBlur={this.props.updateTask} type="text" value={checklist.title} name="title" className="input-details fam-1 font-m fw-2" onChange={this.handleChangeCheckList} />
                    </div>
                    <div onClick={() => { this.props.onRemoveCheckList(this.props.idx) }} className="btn-del-chacklist font-m">Delete</div>
                </div>
                <div className="content-gap ">
                    {checklist.todos.length > 0 && <CheckListStatus checklist={checklist} />}
                    <ul className="todo-list">
                        {checklist.todos.map((todo, idx) => {
                            return <li key={todo.id} className="flex space-between">
                                <div>
                                    <input type="checkbox" name="isDone" checked={todo.isDone} onChange={(ev) => {
                                        this.handleChangeTodos(ev, idx)
                                    }
                                    } />
                                    <input className={`input-details ${todo.isDone && "done-todo"}`} type="text" name="txt" value={todo.txt} onChange={(ev) => {
                                        this.handleChangeTodos(ev, idx)
                                    }} />
                                </div>
                                <span className="" onClick={() => {
                                    this.handleChangeTodos({}, idx, true)
                                }}><RiDeleteBin6Line className="trash-todo"/></span>
                            </li>
                        })}
                        <form onSubmit={(ev) => {
                            ev.preventDefault()
                            this.handleChangeTodos(ev, -1)
                        }}>
                            <input type="text" className="input-details mb-1" placeholder="+ Add Todo" />
                        </form>
                    </ul>
                </div>
            </li>
        )
    }
}

