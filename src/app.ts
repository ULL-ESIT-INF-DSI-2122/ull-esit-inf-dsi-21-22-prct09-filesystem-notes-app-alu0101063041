
import * as yargs from 'yargs'
import {NoteApp} from './note-app';

const app = new NoteApp
yargs.command({
  command: 'add',
  describe: 'Añade una nueva nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Contenido de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user == 'string') && (typeof argv.title == 'string') &&
        (typeof argv.body == 'string') && (typeof argv.color == 'string')) {
      app.addNote(argv.user, argv.title, argv.body, argv.color)
    } else {
      console.log(`Error\n`)
    }
  },
})


yargs.parse()