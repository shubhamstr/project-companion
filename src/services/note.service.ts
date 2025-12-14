import { ProjectCompanionStorage } from "../storage/project-companion.storage";
import { Note } from "../models/notes.model";

export class NoteService {
  constructor(private storage: ProjectCompanionStorage) { }

  getAll(): Note[] {
    return this.storage.read().notes ?? [];
  }

  add(note: Note) {
    const data = this.storage.read();
    this.storage.write({
      ...data,
      notes: [...(data.notes ?? []), note]
    });
  }

  update(note: Note) {
    const data = this.storage.read();
    this.storage.write({
      ...data,
      notes: (data.notes ?? []).map((n: any) =>
        n.id === note.id ? note : n
      )
    });
  }

  delete(noteId: string) {
    const data = this.storage.read();
    this.storage.write({
      ...data,
      notes: (data.notes ?? []).filter(n => n.id !== noteId)
    });
  }
}
