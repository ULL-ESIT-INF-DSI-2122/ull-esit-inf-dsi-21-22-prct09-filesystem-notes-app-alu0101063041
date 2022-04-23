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
}