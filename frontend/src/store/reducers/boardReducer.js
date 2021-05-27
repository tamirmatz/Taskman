const initialState = {
    miniBoards: [],
    board: null
}

export function boardsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MINI_BOARDS':
            return { ...state, miniBoards: action.miniBoards }
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'ADD_BOARD':
            return { ...state, board: action.newBoard }
        case 'UPDATE_BOARD':
            return { ...state, board: action.updateBoard }
        case 'REMOVE_BOARD':
            return { ...state, board: null ,miniboards: miniBoards.filter(miniBoard => miniBoard._id !== action.miniBoardId)}
        default:
            return state
    }
}