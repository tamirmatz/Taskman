const boardService = require('./board.service')
const socketService = require('../../services/socket.service')
async function getBoards(req, res) {
    try {
        const boards = await boardService.query()
        res.send(boards)
    } catch {
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function getBoard(req, res) {
    
    try {
        const board = await boardService.getById(req.params.boardId)
        res.send(board)        
    } catch (err) {
        res.status(500).send({ err: 'Failed to get board' })
    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.boardId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to delete board' })
    }
}

async function addBoard(req, res){
    try{
        const board = req.body
        const {loggedInUser} = req.session
        console.log(board,loggedInUser)
        const addedBoard = await boardService.add(board,loggedInUser)
        socketService.broadcast({ type: 'board-added', data: board, to: addedBoard._id })

    } catch (err) {
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function updateBoard(req, res){
    try{
        const board = req.body
        const updatedBoard = await boardService.update(board)
        // socketService.broadcast({ type: 'board updated', room: updatedBoard._id })
        res.send(updatedBoard)

    } catch (err) {
        res.status(500).send({ err: 'Failed to update board' })
    }
}


module.exports = {
    getBoards,
    getBoard,
    deleteBoard,
    updateBoard,
    addBoard
}