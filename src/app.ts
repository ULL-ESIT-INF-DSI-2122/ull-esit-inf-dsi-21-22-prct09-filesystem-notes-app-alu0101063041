
import * as yargs from 'yargs'
import {NoteApp} from './note-app';
import * as chalk from 'chalk'

const app = new NoteApp
/**
 * Añade una nota
 */
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
      console.log(chalk.red('ERROR! Parametros incorrectos'))
    }
  },
})
/**
 * Elimina una nota
 */
yargs.command({
  command: 'remove',
  describe: 'Elimina una nota',
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
  },
  handler(argv) {
    if ((typeof argv.user == 'string') && (typeof argv.title == 'string')) {
      app.removeNote(argv.user, argv.title)
    } else {
      console.log(chalk.red('ERROR! Parametros incorrectos'))
    }
  },
})
/**
 * Listar los titulos de las notas de un usario
 */
yargs.command({
  command: 'list',
  describe: 'Muestra los titulos de las notas de un usuario',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user == 'string') {
      app.listNotes(argv.user)
    } else {
      console.log(chalk.red('ERROR! Parametros incorrectos'))
    }
  },
})
/**
 * Muestra el contenido de una nota
 */
yargs.command({
  command: 'show',
  describe: 'Muestra el contenido de una nota',
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
  },
  handler(argv) {
    if ((typeof argv.user == 'string') && (typeof argv.title == 'string')) {
      app.showNote(argv.user, argv.title)
    } else {
      console.log(chalk.red('ERROR! Parametros incorrectos'))
    }
  },
})
/**
 * Edita el contenido de una nota
 */
yargs.command({
  command: 'edit',
  describe: 'Edita una nota',
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
      describe: 'Nuevo contenido de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.user == 'string') && (typeof argv.title == 'string') &&
        (typeof argv.body == 'string')) {
      app.editNote(argv.user, argv.title, argv.body)
    } else {
      console.log(chalk.red('ERROR! Parametros incorrectos'))
    }
  },
})

yargs.parse()