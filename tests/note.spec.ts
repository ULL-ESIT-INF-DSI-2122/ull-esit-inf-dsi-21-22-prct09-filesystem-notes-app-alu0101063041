import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note'
describe('Pruebas clase Note', () => {
  const note1: Note = new Note('Prueba', 'Esto es una prueba', 'red')
  it('Es una instancia de la clase Note', () => {
    expect(note1).to.be.instanceOf(Note)
  });
  it('Funcion getTittle', () => {
    expect(note1.getTitle()).to.be.eq('Prueba')
  })
  it('Funcion getBody', () => {
    expect(note1.getBody()).to.be.eq('Esto es una prueba')
  })
  it('Funcion getColor', () => {
    expect(note1.getColor()).to.be.eq('red')
  })
  it('Funcion setTitle', () => {
    const newtitle: string = 'Nuevo titulo'
    note1.setTitle(newtitle)
    expect(note1.getTitle()).to.be.eq('Nuevo titulo')
  })
  it('Funcion isSameTitle', () => {
    const searchTitle: string = 'Prueba'
    expect(note1.isSameTitle(searchTitle)).to.be.eq(false)
  })
  it('Convierte el objeto en un objeto json', () => {
    expect(note1.noteToJson()).to.deep.eq('{"title":"Nuevo titulo","body":"Esto es una prueba","color":"red"}')
  })
});


