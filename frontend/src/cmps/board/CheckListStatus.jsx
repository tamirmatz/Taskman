import { boardService } from '../../services/boardService.js'
import React, { Component } from 'react'

export class CheckListStatus extends Component {
    render() {
        const precent = boardService.checklistPreview(this.props.task).precent
        return (
            <div className="mail-status flex center">
                <span class="checklist-progress-percentage">{Math.round(precent)}%</span>
                <div className="bar-container">
                    <div className="bar-proccess" style={{width: `${precent}%`}}></div>
                </div>
            </div>
        )
    }
}