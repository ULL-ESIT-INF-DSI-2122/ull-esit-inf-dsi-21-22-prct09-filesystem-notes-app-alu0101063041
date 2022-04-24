# Practica 9. filesystem-notes-app

En esta práctica hemos hecho una implementacion de una aplicacion para el procesamiento de notas de texto. En la que se podra añadir, eliminar, editar, listar y leer las notas. Estas notas se guardaran en directorios especificos para cada usuario y a su vez en ficheros independientes tipo JSON. Todas estas funciones se realizaran desde la consola mediante comandos.

## Clase Note
La estructura de la clase Note es:
  1. un titulo
  2. un cuerpo o contenido de la nota
  3. un color que se usara para mostrar el contenido o titulo de la nota
~~~
export class Note {
  constructor(private title: string, private body:string, private color: string) {}
~~~
Getters y Setters
~~~
  getTitle(): string {
    return this.title;
  }
  getBody(): string {
    return this.body;
  }
  getColor(): string {
    return this.color;
  }
  setTitle(title: string) {
    this.title = title;
  }
  setBody(body: string) {
    this.body = body;
  }
  setColor(color: string) {
    this.color = color;
  }
~~~
Esta funcion convierte un objeto Note a una string con formato JSON
~~~
  noteToJson(): string {
    return JSON.stringify({title: this.getTitle(), body: this.getBody(), color: this.getColor()})
  }
~~~
PrintTitle y printBody muestran el contenido del titulo o el contenido de la nota segun el color asignado, de no existir el color seleciona el blanco como predeterminado para mostrar el mensaje
~~~
  printTitle(): void {
    switch (this.color) {
      case 'red':
        console.log(chalk.red(this.getTitle()))
        break
      case 'blue':
        console.log(chalk.blue(this.getTitle()))
        break
      case 'yellow':
        console.log(chalk.yellow(this.getTitle()))
        break
      case 'grey':
        console.log(chalk.grey(this.getTitle()))
        break
      case 'green':
        console.log(chalk.green(this.getTitle()))
        break
      default:
        console.log(chalk.white(this.getTitle()))
        break
    }
  }
  printBody(): void {
    switch (this.getColor()) {
      case 'red':
        console.log(chalk.red(this.getBody()))
        break
      case 'blue':
        console.log(chalk.blue(this.getBody()))
        break
      case 'yellow':
        console.log(chalk.yellow(this.getBody()))
        break
      case 'grey':
        console.log(chalk.grey(this.getBody()))
        break
      case 'green':
        console.log(chalk.green(this.getBody()))
        break
      default:
        console.log(chalk.white(this.getBody()))
        break
    }
  }
}
~~~

Para mostrar por consola el mensaje correspondiente usamos chalk, que es un paquete que nos facilitará a la hora de imprimir los mensajes con un formato diferente
~~~
import * as chalk from 'chalk'
~~~

## Clase NoteApp

Esta clase hace de "puente" entre la clase Note y los ficheros JSON que contendran las notas de los diferentes usuarios. Para ello usamos la libreria fs.
~~~
import * as fs from 'fs'
~~~
La cual usaremos sus funciones sincronas de esta liberia para completar las diferentes tareas que se nos pide,que son:
  1. Añadir notas
  2. Eliminar notas
  3. Mostrar el titulo de las notas
  4. Mostrar el contenido de una nota
  5. Editar una nota
Cuando hablamos de funciones sincronas nos referimos a que cada una de ellas realizara una unica acción y cuando finaliza se realiza la siguiente.

~~~
export class NoteApp {
~~~

  Esta ruta que he guardado en una variable privada indica la ruta o path donde estaran contenidas los diferentes directorios para cada usuario y sera la base para movernos entre los mismos y acceder a las notas

~~~
  private database_path: string = '/home/usuario/practicas/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101063041/database'
~~~

~~~
  constructor() {}
~~~

  Devuelve la ruta de almacenamiento de notas de un usuario 

~~~
  getPathUser(user: string): string {
    return this.database_path + '/' + user
  }
~~~

  Devuelve la ruta de un fichero JSON almacenado en la base de datos

~~~
  getFilePath(user: string, title: string): string {
    return this.getPathUser(user) + '/' + title + '.json'
  }
~~~

  Crea un nuevo directorio para almacenar notas si no existe

~~~
  createNewDir(user: string) {
    if (!this.checkDir(user)) {
      fs.mkdirSync(this.getPathUser(user))
      console.log(chalk.green(`Directorio creado para ${user}`))
    } else {
      // console.log(chalk.white(`${user} ya tiene un directorio`))
    }
  }
~~~
  
  La primera comprueba que el directorio de un usuario se encuentra en la base de datos y la segunda comprueba si existe el fichero

~~~
  checkDir(user: string): boolean {
    return fs.existsSync(this.getPathUser(user))
  }
  checkFile(user: string, title: string): boolean {
    return fs.existsSync(this.getFilePath(user, title))
  }
~~~

  Especificando un usuario, un titulo, un contenido y un color. Comprueba si la ruta existe, si no crea el directorio, crea un objeto nota con los atributos (title, body, color) y luego se añade a la base de datos si no existe una con el mismo titulo

~~~
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
~~~

  Especificando un usuario y un titulo elimina la nota con el titulo que recibe como parametro, comprando primero si existe la ruta del usuario y si existe el fichero en la ruta

~~~
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
~~~

  Obtiene una nota de la base de datos especifados en los parametros que se pasan a la funcion

~~~
  getNote(user:string, title:string) {
    const note = JSON.parse(fs.readFileSync(`${this.getPathUser(user)}/${title}.json`, 'utf-8'))
    return note
  }
~~~

  Obtiene un array con todas las notas de un usuario concreto, primero accede a la base de datos y luego lee todas las notas convierto el JSON en un objeto de la clase Note

~~~
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
~~~

ListNotes muestra la lista de notas que posee un usuario

~~~
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
~~~

Esta funcion muestra el titulo y el contenido de una nota cuyos parametros son pasados a la funcion. Se comprueba la existencia del directorio y de la nota antes de mostrar

~~~
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
~~~

EditNote edita el contenido de una nota, es deicr, el body. De igual manera que las anteriores, se comprueba la existencia del directorio y de la nota en cuestion.

~~~
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
~~~