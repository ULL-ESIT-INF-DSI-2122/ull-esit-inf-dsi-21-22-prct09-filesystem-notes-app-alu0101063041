import chalk = require("chalk");

/**
 * Clase Nota que representa las notas que un usuario puede almacenar
 */
export class Note {
  constructor(private title: string, private body:string, private color: string) {}
  public getTitle(): string {
    return this.title;
  }
  public getBody(): string {
    return this.body;
  }
  public getColor(): string {
    return this.color;
  }
  public setTitle(title: string) {
    this.title = title;
  }
  public setBody(body: string) {
    this.body = body;
  }
  public setColor(color: string) {
    this.color = color;
  }
  public isSameTitle(title: string): boolean {
    return this.title === title;
  }
  public noteToJson(): string {
    return JSON.stringify({title: this.getTitle(), body: this.getBody(), color: this.getColor()})
  }
  public printTitle(): void {
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
      default:
        console.log(chalk.white(this.getTitle()))
        break
    }
  }
  public printBody(): void {
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
      default:
        console.log(chalk.white(this.getBody()))
        break
    }
  }
}