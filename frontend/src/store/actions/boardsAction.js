import { boardService } from '../../services/boardService'

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
    console.log(board)
    // Action Creator
    return async dispatch => {
        try {      
            const updatedBoard = await boardService.update(board)
            console.log(updatedBoard)   
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
