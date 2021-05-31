import React, { Component } from 'react'

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
            console.log(checklists)
        })
        // const checklists = this.props.checklists.slice()
        // checklists.splice(this.props.idx, 1, { ...this.state.checklist, [field]: value })
        // this.props.handleChange({ target: { name: 'checklists', 'value': checklists } })
    }

    handleChangeTodos = ({ target }, idx) => {
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name
        console.log(target.type)

        const todos = this.props.checklist.todos.slice()
        todos.splice(idx, 1, { ...this.state.checklist.todos[idx], [field]: value })
        this.handleChangeCheckList({ target: { name: 'todos', 'value': todos } })
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
                <h2>*proccess bar*</h2>
                <ul>
                    {checklist.todos.map((todo, idx) => {
                        return <li className="flex">
                            <input type="checkbox" name="isDone" checked={todo.isDone} onChange={(ev) => {
                                this.handleChangeTodos(ev, idx)
                                this.props.updateTask()
                            }
                            } />
                            <p>{todo.txt}</p>
                        </li>
                    })}
                </ul>
            </li>
        )
    }
}

