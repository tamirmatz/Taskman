import { boardService } from '../../services/boardService'
import { socketService } from '../../services/generalService/socketService'

export function query() { // Action Creator
    return async dispatch => {
        const boards = await boardService.query()
        const action = {
            type: 'SET_BOARDS',
            boards
        }
        dispatch(action)
    }
}

export function loadBoard(boardId) { // Action Creator
    return async dispatch => {
        const board = await boardService.getById(boardId)
        // socketService.setup()
        // socketService.off('update board', update)
        // socketService.on('update board', update)
        console.log('loading board')
        const action = {
            type: 'SET_BOARD',
            board
        }
        dispatch(action)
    }
}


export function remove(boardId) {
    return async dispatch => {
        try {
            await boardService.remove(boardId)
            const action = {
                type: 'REMOVE_BOARD',
                boardId
            }
            dispatch(action)
        } catch (err) {
            console.log('BoardActions: err in removeBoard', err)
        }
    }
}


export function update(board) {
    // Action Creator
    return async dispatch => {
        try {      
            const updatedBoard = await boardService.update(board)
            // socketService.emit('update board', updatedBoard)
            const action = {
                type: 'UPDATE_BOARD',
                updatedBoard
            }
            dispatch(action)
        } catch (err){
            console.log('BoardActions: err in update board', err)
        }
    }
}

export function add() {
    // Action Creator
    return async dispatch => {
        try {
            const newBoard = await boardService.add()            
            const action = {
                type: 'ADD_BOARD',
                board: newBoard
            }
            dispatch(action)
        } catch (err){
            console.log('BoardActions: err in addBoard', err)
        }
    }
}
