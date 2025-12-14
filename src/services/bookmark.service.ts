import { Bookmark } from "../models/bookmark.model";
import { ProjectCompanionStorage } from "../storage/project-companion.storage";

export class BookmarkService {
  constructor(private storage: ProjectCompanionStorage) { }

  getAll(): Bookmark[] {
    return this.storage.read().bookmarks ?? [];
  }

  add(bookmark: Bookmark): boolean {
    const data = this.storage.read();
    const bookmarks = data.bookmarks ?? [];

    const exists = bookmarks.some(
      b => b.file === bookmark.file && b.line === bookmark.line
    );

    if (exists) { return false; }

    this.storage.write({
      ...data,
      bookmarks: [...bookmarks, bookmark]
    });

    return true;
  }
}
