export interface Note {
  id: string;
  title: string;
  content: string;
  tag?: string;
}

export interface Type {
  dataSource: Map<string, Note>
}

export const defaultState = {
  dataSource: new Map(),
}