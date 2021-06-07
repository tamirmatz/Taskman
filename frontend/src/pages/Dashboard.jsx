import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { ChartMembersTasks } from '../cmps/dashboard/ChartMembersTasks';
import { ChartLabelsTasks } from '../cmps/dashboard/ChartLabelsTasks';
import { ChartGroupsTasks } from '../cmps/dashboard/ChartGroupsTasks';
import { withRouter } from "react-router";
import { boardService } from '../services/boardService'



class _Dashboard extends Component {
    state = {
        board: null,
        tasks: null,
        groups: null,
        membersBoard: null,
        labelsBoard: null
    }

    componentDidMount() {
        const board = this.props.board;
        console.log(board);
        const tasks = boardService.getTasks(board.groups);
        const groups = board.groups;
        const membersBoard = board.members;
        const labelsBoard = board.labels;

        this.setState({
            ...this.state,
            board: board,
            groups: groups,
            tasks: tasks,
            membersBoard: membersBoard,
            labelsBoard: labelsBoard
        });
    }

    componentDidUpdate(prevProps) {

    }
    checkDataExist() {
        const { board, groups, tasks, membersBoard, labelsBoard } = this.state;
        return board && groups && tasks && membersBoard && labelsBoard;
    }

    render() {
        const { board, groups, tasks, membersBoard, labelsBoard } = this.state;
        if (!this.checkDataExist()) return <h1>Loading...</h1>
        return <div className="dashboard w-100 h-100 flex column center space-between pb-1">
            <div className="w-100 flex space-evenly ">
                <div className="dashboard flex column center content-center">
                    <p className="font-1 fam-1 c-white">Tasks Per Staff</p>
                    <ChartMembersTasks membersBoard={membersBoard} tasks={tasks} />
                </div>
                <div className="dashboard flex column center content-center">
                    <p className="font-1 fam-1 c-white">Tasks Per Label</p>
                    <ChartLabelsTasks labelsBoard={labelsBoard} tasks={tasks} />
                </div>
                <div className="dashboard flex column center content-center">
                    <p className="font-1 fam-1 c-white">Tasks Per Groups</p>
                    <ChartGroupsTasks groups={groups} tasks={tasks} />
                </div>
            </div>
            <div className="w-100 flex space-evenly">

            </div>
            <div className="w-100 flex space-evenly">

            </div>
        </div>
    }

}
const mapStateToProps = state => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {

}


export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Dashboard))