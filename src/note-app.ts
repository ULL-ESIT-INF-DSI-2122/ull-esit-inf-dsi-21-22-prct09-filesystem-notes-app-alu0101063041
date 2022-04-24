import {Note} from './note'
import * as fs from 'fs'
import * as chalk from 'chalk'
/**
 * Clase NoteApp contiene las funciones que hacen posible hacer las operaciones de escritura/lectura
 * en la base de datos
 */
export class NoteApp {
  /**
   * @param database_path contiene el path de la base de datos donde se guardaran las notas de los diferentes usuarios
   */
  private database_path: string = '/home/usuario/practicas/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101063041/database'
  constructor() {}
  /**
   * Obtenemos el path de un usuario en concreto
   * @param user indica donde se encuentra el directorio del usuario
   * @returns Devuelve un string con el path completo del usuario
   */
  getPathUser(user: string): string {
    return this.database_path + '/' + user
  }
  /**
   * Obtenemos el path de un fichero .json
   * @param user indica el directorio del usuario
   * @param title indica el fichero
   * @returns devuelve el path completo de un usuario y un fichero especifico
   */
  getFilePath(user: string, title: string): string {
    return this.getPathUser(user) + '/' + title + '.json'
  }
  /**
   * añade un directorio para un usuario
   * @param user nombre del directorio que vamos a crear
   */
  createNewDir(user: string) {
    if (!this.checkDir(user)) {
      fs.mkdirSync(this.getPathUser(user))
      console.log(chalk.green(`Directorio creado para ${user}`))
    } else {
      // console.log(chalk.white(`${user} ya tiene un directorio`))
    }
  }
  /**
   * Comprueba la existencia de un directorio
   * @param user directorio a buscar
   * @returns true o false
   */
  checkDir(user: string): boolean {
    return fs.existsSync(this.getPathUser(user))
  }
  /**
   * Comprueba a existencia de un archivo .json en un directorio especifico
   * @param user indica el directorio
   * @param title indica el fichero
   * @returns true o false
   */
  checkFile(user: string, title: string): boolean {
    return fs.existsSync(this.getFilePath(user, title))
  }
  /**
   * Añade una nota a la base de datos
   * @param user usuario/directorio donde se fguarda la nota
   * @param title nombre del fichero y titulo de la nota con el que se guardara en la base de datos
   * @param body Cuerpo de la nota
   * @param color color que le asignaremos
   * @returns true o false
   */
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
  /**
   * Elimina una nota de un usuario y titulo especifico
   * @param user usuario/directorio al que le pertenece la nota
   * @param title nombre con el que esta guardada la nota
   * @returns true o false
   */
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
  /**
   * Obtenemos una nota de la base de datos a partir de un usuario y un titulo
   * @param user usuario/directorio al que le pertenece la nota
   * @param title nombre con el que esta guardada la nota
   * @returns true o false
   */
  getNote(user:string, title:string) {
    const note = JSON.parse(fs.readFileSync(`${this.getPathUser(user)}/${title}.json`, 'utf-8'))
    return note
  }
  /**
   * Obtenemos todas las notas de un usuario
   * @param user usuario/directorio al que le pertenece la nota
   * @returns un array de objetos Note
   */
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
  /**
   * Muestra el titulo de las notas que pertenece a un usuario
   * @param user usuario/directorio de las notas que queremos listar
   */
  listNotes(user:string):boolean {
    if (this.checkDir(user)) {
      if (this.getNotesUser(user).length === 0) {
        console.log(chalk.red(`${user} no tiene notas guardadas`))
        return false
      } else {
        console.log(chalk.green(`Estas son las notas de ${user}`))
        for (const note of this.getNotesUser(user)) {
          note.printTitle()
        }
        return true
      }
    } else {
      console.log(chalk.red(`el usuario: ${user} no esta en la base de datos`))
      return false
    }
  }
  /**
   * Muestra una nota especifica de un usuario y un titulo
   * @param user usuario/directorio de la nota
   * @param title titulo de la nota
   * @returns true o false
   */
  showNote(user:string, title: string): boolean {
    if (this.checkDir(user)) {
      if (this.checkFile(user, title)) {
        const temp = this.getNote(user, title)
        const aux: Note = new Note(temp.title, temp.body, temp.color)
        aux.printTitle()
        aux.printBody()
        return true
      } else {
        console.log(chalk.red(`El usuario ${user} no tiene una nota con el titulo ${title}`))
        return false
      }
    } else {
      console.log(chalk.red(`El usuario ${user} no se encuentra en la base de datos`))
      return false
    }
  }
  /**
   * Edita el contenido de una nota de un usuario
   * @param user usario/directorio donde se encuentra la nota
   * @param title titulo de la nota
   * @param body contenido de la nota que se va a actualizar
   * @returns true o false
   */
  editNote(user: string, title: string, body: string): boolean {
    if (this.checkDir(user)) {
      if (this.checkFile(user, title)) {
        const temp = this.getNote(user, title)
        const aux: Note = new Note(temp.title, temp.body, temp.color)
        aux.setBody(body)
        fs.writeFileSync(this.getFilePath(user, title), aux.noteToJson())
        console.log(chalk.green(`Nota editada!`))
        return true
      } else {
        console.log(chalk.red(`El usuario ${user} no tiene una nota con el titulo ${title}`))
        return false
      }
    } else {
      console.log(chalk.red(`El usuario ${user} no se encuentra en la base de datos`))
      return false
    }
  }
}

