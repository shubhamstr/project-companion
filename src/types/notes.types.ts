export type NoteScope = "global" | "file"

export interface ProjectNote {
  id: string
  scope: NoteScope
  title: string
  content: string
  filePath?: string
  createdAt: number
  updatedAt: number
}
