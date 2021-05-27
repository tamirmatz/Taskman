import { utilService } from './utilService.js'
import { storageService } from './async-storage.service.js'

window.storageService = storageService;

const STORAGE_KEY = 'board'

export const toyService = {
    query,
    getById,
    save,
    remove,
    createToy
}


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}

function addBoard(){
    const newBoard = createBoard()
    newBoard = storageService.post(STORAGE_KEY)

    return newBoard
}

function upadateBoard(board){
        return storageService.put(STORAGE_KEY, board)

}

function createBoard(title = 'New Board',loggedInUser = {fullname: 'some user', _id:'u101', imgUrl='http://some-img.jpg'}) {
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
        
    return storageService.post(STORAGE_KEY, toy)
}