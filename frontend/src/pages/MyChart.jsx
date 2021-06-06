import { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service'
import { add, loadBoard, update, setBoard, remove } from '../store/actions/boardsAction.js';
import { boardService } from '../../../services/boardService.js'



class _DashBoard extends Component {
    state = {
        toyMap:null
    }

    componentDidMount() {
        boardService.getTypeMap()
            .then(boardMap => this.setState({ boardMap }))
    }

    render() {
        const {toyMap} = this.state
        console.log('toyMap',toyMap)
        if (!toyMap) return <h1>Loading...</h1>
        const data = {
            labels: Object.keys(toyMap),
            datasets: [
                {
                    label: '# of Votes',
                    data: Object.values(toyMap),
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
        loggedInUser: state.userModule.loggedInUser,
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    remove,
    add,
    loadBoard,
    update
}
export const DashBoard = connect(mapStateToProps, mapDispatchToProps)(_DashBoard)