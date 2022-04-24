import * as chalk from 'chalk'

/**
 * Clase Nota que representa las notas que un usuario puede almacenar
 */
export class Note {
  /**
   * @param title titulo de la nota
   * @param body contenido de la nota
   * @param color color de la nota
   */
  constructor(private title: string, private body:string, private color: string) {}
  /**
   *
   * @returns Devuelve el titulo de la nota
   */
  getTitle(): string {
    return this.title;
  }
  /**
   *
   * @returns Devuelve el contenido de la nota
   */
  getBody(): string {
    return this.body;
  }
  /**
   *
   * @returns Devuelve el color correspondiente a la nota
   */
  getColor(): string {
    return this.color;
  }
  /**
   * Cambia el titulo de la nota
   * @param title
   */

  setTitle(title: string) {
    this.title = title;
  }
  /**
   * Cambia el contenido de la nota
   * @param body
   */
  setBody(body: string) {
    this.body = body;
  }
  /**
   * Cambia el color de la nota
   * @param color
   */
  setColor(color: string) {
    this.color = color;
  }
  /**
   *
   * @returns Devuelve un string con formato JSON
   */
  noteToJson(): string {
    return JSON.stringify({title: this.getTitle(), body: this.getBody(), color: this.getColor()})
  }
  /**
   * Muestra el titulo de la nota con el color correspondiente por consola
   */
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
  /**
   * Muestra el contenido de la nota con su color correspondiente
   */
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