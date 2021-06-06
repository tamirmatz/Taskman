import { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import {utilService} from '../../services/generalService/utilService'

// import { add, loadBoard, update, setBoard, remove } from '../store/actions/boardsAction.js';



class _ChartGroupsTasks extends Component {
    state = {
        tasks: null,
        groups: null
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            tasks: this.props.tasks,
            groups: this.props.groups
        })
    }

    mapGroupTask = (groups, tasks) => {

        const mapObj = {};
        if (groups && tasks) {
            groups.forEach(group => {
                mapObj[`${group.title}`] = group.tasks.length;
            });
            return mapObj;
        }
    }

    render() {
        const { tasks, groups } = this.state;
        if (!tasks || !groups) return <h1>Loading...</h1>
        const mapGroupTask = this.mapGroupTask(groups, tasks);
        const backgroundColor = utilService.randColor(mapGroupTask.length);
        const data = {
            labels: Object.keys(mapGroupTask),
            datasets: [
                {
                    label: 'Task per Member',
                    data: Object.values(mapGroupTask),
                    backgroundColor: backgroundColor,
                    borderColor: [
                        'rgba(54, 162, 80, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        return (
            <div className="category-chart">
                <Pie data={data} />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {

}
export const ChartGroupsTasks = connect(mapStateToProps, mapDispatchToProps)(_ChartGroupsTasks)