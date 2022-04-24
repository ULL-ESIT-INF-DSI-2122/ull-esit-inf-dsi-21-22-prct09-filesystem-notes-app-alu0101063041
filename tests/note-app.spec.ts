import 'mocha';
import {expect} from 'chai';
import {NoteApp} from '../src/note-app'

const app = new NoteApp
describe('Pruebas clase Note', () => {
  it('Funcion removeNote', ()=> {
    expect(app.removeNote('javi', 'prueba3')).to.be.eq(true)
  })
  it('Funcion addNote', () => {
    expect(app.addNote('javi', 'prueba3', 'eee', 'grey')).to.be.eq(true)
  })
  it('Funcion listNotes', ()=> {
    expect(app.listNotes('javi')).to.be.eq(true)
    expect(app.listNotes('yepp')).to.be.eq(false)
  })
  it('Funcion editNote', () => {
    expect(app.editNote('javi', 'prueba', 'Cambiando cositas')).to.be.eq(true)
  })
  it('Funcion showNote', () => {
    expect(app.showNote('javi', 'prueba')).to.be.eq(true)
  })
})