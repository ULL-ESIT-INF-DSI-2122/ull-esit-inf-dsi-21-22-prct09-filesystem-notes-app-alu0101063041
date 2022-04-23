import {Note} from './note'
import * as fs from 'fs'
import * as chalk from 'chalk'

export class NoteApp {
  private database_path: string = '/home/usuario/practicas/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101063041/database'
  constructor() {}
  getPathUser(user: string): string {
    return this.database_path + '/' + user
  }
  getFilePath(user: string, title: string): string {
    return this.getPathUser(user) + '/' + title + '.json'
  }
  /**
   * añade un directorio para un usuario
   * @param user
   */
  createNewDir(user: string) {
    if (!this.checkDir(user)) {
      fs.mkdirSync(this.getPathUser(user))
      console.log(chalk.green(`Directorio creado para ${user}`))
    } else {
      // console.log(chalk.white(`${user} ya tiene un directorio`))
    }
  }
  checkDir(user: string): boolean {
    return fs.existsSync(this.getPathUser(user))
  }
  checkFile(user: string, title: string): boolean {
    return fs.existsSync(this.getFilePath(user, title))
  }
  addNote(user: string, title: string, body: string, color: string): boolean {
    this.createNewDir(user)
    const newNote: Note = new Note(title, body, color)
    if (!this.checkFile(user, title)) {
      fs.writeFileSync(this.getFilePath(user, title), newNote.noteToJson())
      console.log(chalk.green(`Nueva nota añadida ${title}`))
      return true
    } else {
      console.log(chalk.red(`Ya existe una nota con el titulo: ${title}`))
      return false
    }
  }
  removeNote(user: string, title: string): boolean {
    if (!this.checkFile(user, title)) {
      console.log(chalk.red(`La nota con titulo ${title} no esta en la base de datos`))
      return false
    } else {
      fs.unlinkSync(this.getFilePath(user, title))
      console.log(chalk.green(`Nota con titulo ${title} eliminada de la base de datos`))
      return true
    }
  }
  getNote(user:string, title:string) {
    const note = JSON.parse(fs.readFileSync(`${this.getPathUser(user)}/${title}.json`, 'utf-8'))
    return note
  }
  getNotesUser(user:string):Note[] {
    const titles = fs.readdirSync(this.getPathUser(user))
    const notes: Note[] = []
    titles.forEach((note) => {
      const aux = note.split('.')
      const temp = this.getNote(user, aux[0])
      notes.push(new Note(temp.title, temp.body, temp.color))
    })
    return notes
  }

  listNote(user:string) {
    if (this.checkDir(user)) {
      if (this.getNotesUser(user).length === 0) {
        console.log(chalk.red(`${user} no tiene notas guardadas`))
      } else {
        console.log(chalk.green(`Estas son las notas de ${user}`))
        for (const note of this.getNotesUser(user)) {
          note.printTitle()
        }
      }
    } else {
      console.log(chalk.red(`el usuario: ${user} no esta en la base de datos`))
    }
  }
}

const app = new NoteApp
app.addNote('javi', 'prueba', 'esto es una prueba', 'red')
app.addNote('javi', 'prueba2', 'segunda prueba', 'blue')
// console.log(app.getNotesUser('javi'))
console.log(app.getNote('javi', 'prueba2'))
app.listNote('javi')