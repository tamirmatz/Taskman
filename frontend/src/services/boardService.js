import { utilService } from './generalService/utilService.js'
import { storageService } from './generalService/asyncStorageService.js'

window.storageService = storageService;

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    remove,
    upadate,
    add,
    getGroupById,
    getTaskById,
    getGroupIdxById
}


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    const board = storageService.get(STORAGE_KEY, boardId);
    return board
}

function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}

function add(){
    const newBoard = _createBoard()
    const savedBoard = storageService.post(STORAGE_KEY, newBoard)
    return savedBoard
}

function upadate(board){
        return storageService.put(STORAGE_KEY, board)

}

//task crud
function getGroupById(board,groupId){
    return board.groups.find( group => group.id === groupId);    
}

function getGroupIdxById(board,groupId){
    return board.groups.findIndex( group => group.id === groupId);    
}

function getTaskById(group,taskId){
    return group.tasks.find( task =>  task.id === taskId )    
}

function addTask(board,group,title){
    const newTask = {
        id: utilService.makeId(),
        title: title
    }

    
}


//group crud

function _createBoard(title = 'New Board',loggedInUser = {fullname: 'some user', _id:'u101', imgUrl:'http://some-img.jpg'}) {
    const board = {
        "_id": utilService.makeId(),
        title,
        "createdAt": Date.now(),
        "createdBy": {
            "_id": loggedInUser._id,
            "fullname": loggedInUser.fullname,
            "imgUrl": loggedInUser.imgUrl
        },
        "style": {},
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l101",
                "title": "Todo",
                "color": "green"
            }
        ],
        "members": [
            {
                "_id": loggedInUser._id,
                "fullname":  loggedInUser.fullname,
                "imgUrl": loggedInUser.imgUrl
            }
        ],
        "groups": [
            {
                "id": utilService.makeId(),
                "title": "Group 1",
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo"
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
                    }
                ],
                "checklists": [],
                "style": {}
            },
        ],
        "activities": []
    }
        
    return board;
}