const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Yargs customization
yargs.version('1.1.0')

// Add a note
yargs.command({
    command: 'add',
    describe: 'Allows user to add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Remove a note
yargs.command({
    command: 'remove',
    describe: 'Allows user to remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Read a note
yargs.command({
    command: 'read',
    describe: 'Allows user to view a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// List a note
yargs.command({
    command: 'list',
    describe: 'Allows the user to list all notes',
    handler() {
        notes.listNotes()
    }
})

yargs.parse()