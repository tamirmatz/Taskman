import { boardService } from '../../services/boardService'

export function loadMiniBoards() { // Action Creator
    return async dispatch => {
        const miniBoards = await boardService.getMiniBoards()
        const action = {
            type: 'SET_MINI_BOARDS',
            miniBoards
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
            const updatedBoard = await boardService.upadte(board)            
            const action = {
                type: 'UPDATE_BOARD',
                board: updatedBoard
            }
            dispatch(action)
        } catch (err){
            console.log('BoardActions: err in update board', err)
        }
    }
}

export function addBoard() {
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
