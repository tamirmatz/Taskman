import { utilService } from './generalService/utilService.js'
import { storageService } from './generalService/asyncStorageService.js'
import {httpService} from '../services/generalService/httpService.js'

window.storageService = storageService;

export const boardService = {
    query,
    getById,
    remove,
    update,
    add,
    getGroupById,
    getTaskById,
    getGroupIdxById,
    checklistPreview,
    getTaskIdxById,
    checklistPrecent
}


function query() {
    // return storageService.query(STORAGE_KEY)
    return httpService.get('board')
}

function getById(boardId) {
    // const board = storageService.get(STORAGE_KEY, boardId);
    // return board
    return httpService.get(`board/${boardId}`)

}

function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function add() {
    // const newBoard = _createBoard()
    // const savedBoard = storageService.post(STORAGE_KEY, newBoard)
    // return savedBoard
    const board = {title: 'new' ,style:{}}
    const res = await httpService.post(`board`, board)
    return res
}

async function update(board) {
    // return storageService.put(STORAGE_KEY, board)
    board.activities = []
    
    const res = await httpService.put(`board/${board._id}`, board)
    return res

}

//task crud
function getGroupById(board, groupId) {
    return board.groups.find(group => group.id === groupId);
}

function getGroupIdxById(board, groupId) {
    return board.groups.findIndex(group => group.id === groupId);
}

function getTaskIdxById(group, taskId) {
    return group.tasks.findIndex(task => task.id === taskId);
}

function getTaskById(group, taskId) {
    return group.tasks.find(task => task.id === taskId)
}

function checklistPreview(task) {
    const checklists = task.checklists
    let isDone = false
    let allTodos = 0;
    let doneTodos = 0;
    checklists.forEach(checkList => {
        allTodos += checkList.todos.length;
        checkList.todos.forEach(todo => {
            if (todo.isDone) doneTodos++
        })
    });
    if (doneTodos === allTodos) isDone = true;
    const str = `${doneTodos}/${allTodos}`
    const res = { str, isDone}
    return res
}

function checklistPrecent(checklist){
    let doneTodos = 0;
    checklist.todos.forEach(todo => {
        if(todo.isDone) doneTodos++
    })
    const precent = (doneTodos / checklist.length) * 100 
    return precent
}