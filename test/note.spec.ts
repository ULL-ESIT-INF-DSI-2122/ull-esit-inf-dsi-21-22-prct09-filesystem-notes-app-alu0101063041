import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note'
describe('Pruebas clase Note', () => {
  const note1: Note = new Note('Prueba', 'Esto es una prueba', 'red')
  it('Es una instancia de la clase Note', () => {
    expect(note1).to.be.instanceOf(Note)
  });
});

