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

Para mostrar por consola el mensaje corresponiendote usamos chalk, que es un paquete que nos facilitará a la hora de imprimir los mensajes con un formato diferente
~~~
import * as chalk from 'chalk'
~~~

## Clase NoteApp

