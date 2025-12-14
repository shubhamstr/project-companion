export type NoteScope = "global" | "file"

export interface ProjectNote {
  id: string
  scope: NoteScope
  title: string
  content: string
  filePath?: string // only for file notes
  createdAt: number
  updatedAt: number
}
