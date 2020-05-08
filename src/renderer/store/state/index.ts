import { RouterState } from 'connected-react-router';
import { Type as Note, defaultState as NoteDefaults } from './note';

export interface Store {
  router: RouterState;
  note: Note;
};

export const defaultState = {
  note: NoteDefaults,
}