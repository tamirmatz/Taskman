const { ObjectId } = require('mongodb')
const dbService = require('../../services/db.service')

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterByTitle = '') {
    try {
        console.log('filterByTitle',filterByTitle);
        const collection = await dbService.getCollection('board')
        var boards = await collection.find().toArray()
        if (filterByTitle[0] && filterByTitle!=={}) {
            boards = boards.filter(board => board.title.toLowerCase().includes(filterByTitle[0].toLowerCase()))
            console.log('here');
        }        
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

async function add(board, loggedInUser) {
    console.log('in add')
    try {
        const boardToAdd = _createInittialBoard(board, loggedInUser)
        console.log('board to add', boardToAdd)
        const collection = await dbService.getCollection('board')
        console.log()
        collection.insertOne(boardToAdd)
        return boardToAdd
    } catch (err) {
        console.log('err');
    }
}

async function update(board, activity) {
    try {
        // board._id=ObjectId(board._id)
        const boardToUpdate = JSON.parse(JSON.stringify(board))
        boardToUpdate._id = ObjectId(board._id)
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ '_id': boardToUpdate._id },
            {
                $push: {
                    'activities': { $each: [activity], $position: 0 }
                },
                $set: boardToUpdate
            },

        );


        console.log('boardToUpdate', boardToUpdate)
        return boardToUpdate;
    } catch (err) {
        console.log('err');
    }
}



function _createInittialBoard({ title, style }, loggedInUser) {
    console.log('in create board')
    const board = {
        // "_id": utilService.makeId(),
        title,
        "createdAt": Date.now(),
        "createdBy": {
            "_id": "gsdg52345",
            "fullname": "Guest Guest",
            "imgUrl": ""
        },
        "style": style.background,
        "labels": [
            {
                "id": "l101",
                "title": "tamir!!!!!!!!",
                "color": "red"
            },
            {
                "id": "l102",
                "title": "morani",
                "color": "green"
            },
            {
                "id": "l103",
                "title": "Done",
                "color": "blue"
            },
            {
                "id": "l104",
                "title": "Ready",
                "color": "purple"
            },
            {
                "id": "l105",
                "title": "mor",
                "color": "pink"
            },
            {
                "id": "l106",
                "title": "qa",
                "color": "gray"
            },
            {
                "id": "l107",
                "title": "tamir",
                "color": "orange"
            },
            {
                "id": "l108",
                "title": "tamir",
                "color": "#333"
            }
        ],
        "members": [
            {
                "_id": "gsdg52345",
                "fullname": "Guest Guest",
                "imgUrl": ""
            }
        ],
        "groups": [

        ],
        "activities": []
    }

    return board;
}
