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
      console.log(chalk.white(`${user} ya tiene un directorio`))
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
    }
    return false
  }
}
