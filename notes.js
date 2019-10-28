const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()

    // Filter
    const duplicateNote = notes.find((note) => {
        note.title === title
    })

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log('Successfully added a new note!')
    } else {
        console.log('Note title is already taken.')
    }
}

const removeNote = function (title) {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => {
        note.title !== title
    })

    if (notesToKeep.length == notes.length) {
        console.log(chalk.red.inverse('No note found'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note removed!'))
    }
}

const listNotes = function (title) {
    const notes = loadNotes()

    console.log(chalk.blue.inverse("Your notes"))
    for (note in notes) {
        console.log(notes[note].title)
    }
}

const readNote = function (title) {
    const notes = loadNotes()
    for (note in notes) {
        if (notes[note].title === title) {
            console.log(chalk.bold.blue.inverse(notes[note].title))
            console.log(chalk.green(notes[note].body))
            return
        }
    }
    console.log(chalk.red.inverse.bold('Note does not exist.'))
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function () {
    try {
        // Read the file from the file system
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
        console.log
    }
    catch (e) {
        // If the file does not exist
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}