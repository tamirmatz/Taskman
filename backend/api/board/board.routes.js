const express = require('express')
const router = express.Router()
const {getBoards,getBoard,deleteBoard,addBoard,updateBoard} = require('./board.controller')

router.get('/', getBoards)
router.get('/:boardId', getBoard)
router.delete('/:boardId', deleteBoard)
router.post('/', addBoard)
router.put('/:boardId', updateBoard)

module.exports = router;