const { ObjectId } = require('mongodb')
const dbService = require('../../services/db.service')

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query() {
    try {
        const collection = await dbService.getCollection('board')
        var boards = await collection.find().toArray()
        return boards
    } catch {
        console.log('err');
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ '_id': ObjectId(boardId) })        
        return board
    } catch {
        console.log('err');
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
    } catch (err) {
        throw err
    }
}

async function add(board,loggedInUser) {
    try {
        const boardToAdd = _createInittialBoard(board)
        const collection = await dbService.getCollection('board')
        collection.insertOne(boardToAdd)
        return boardToAdd
    } catch (err) {
        console.log('err');
    }
}

async function update(board) {        
    try {
       // board._id=ObjectId(board._id)
       const boardToUpdate = JSON.parse(JSON.stringify(board))
       boardToUpdate._id = ObjectId(board._id)
        const collection = await dbService.getCollection('board')        
        await collection.updateOne({ '_id': boardToUpdate._id },
         { $set: boardToUpdate }
         )
        return boardToUpdate;
    } catch (err) {
        console.log('err');
    }
}



function _createInittialBoard(newBoard) {
    const board = {
    //     "_id": utilService.makeId(),
    //     title,
    //     "createdAt": Date.now(),
    //     "createdBy": {
    //         "_id": loggedInUser._id,
    //         "fullname": loggedInUser.fullname,
    //         "imgUrl": loggedInUser.imgUrl
    //     },
    //     "style": {},
    //     "labels": [
    //         {
    //             "id": "l101",
    //             "title": "Done",
    //             "color": "#61bd4f"
    //         },
    //         {
    //             "id": "l101",
    //             "title": "Todo",
    //             "color": "green"
    //         }
    //     ],
    //     "members": [
    //         {
    //             "_id": loggedInUser._id,
    //             "fullname": loggedInUser.fullname,
    //             "imgUrl": loggedInUser.imgUrl
    //         }
    //     ],
    //     "groups": [
    //         {
    //             "id": utilService.makeId(),
    //             "title": "Group 1",
    //             "tasks": [
    //                 {
    //                     "id": "c101",
    //                     "title": "Replace logo"
    //                 },
    //                 {
    //                     "id": "c102",
    //                     "title": "Add Samples"
    //                 }
    //             ],
    //             "checklists": [],
    //             "style": {}
    //         },
    //     ],
    //     "activities": []
    }

    return board;
}
