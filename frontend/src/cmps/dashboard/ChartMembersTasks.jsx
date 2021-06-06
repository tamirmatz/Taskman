import { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import {utilService} from '../../services/generalService/utilService'

// import { add, loadBoard, update, setBoard, remove } from '../store/actions/boardsAction.js';



class _ChartMembersTasks extends Component {
    state = {
        tasks: null,
        members: null
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            tasks: this.props.tasks,
            members: this.props.membersBoard
        })
    }

    mapMembersTask = (members,tasks) => {
        console.log(tasks);
        console.log(members);
        const mapObj = {};
        members.forEach( member => {
            tasks.forEach( task => {
                
            })
        });
        
    }
    

    render() {
        const {tasks, members} = this.state;
        if(!tasks || !members) return <h1>Loading...</h1>
        const mapMembersTask = this.mapMembersTask(members,tasks);
        const data = {
            // labels: Object.keys(mpp),
            labels: ['avi' ,'moshe'],
            datasets: [
                {
                    label: 'Task per Member',
                    // data: Object.values(boardMap),
                    data: [12,5,14],

                    backgroundColor: [
                        'rgba(54, 162, 80, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 80, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 4,
                },
            ],
        };
        console.log('data',data)
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
export const ChartMembersTasks = connect(mapStateToProps, mapDispatchToProps)(_ChartMembersTasks)