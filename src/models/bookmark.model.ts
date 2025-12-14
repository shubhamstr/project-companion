export interface Bookmark {
  id: string            // uuid
  file: string          // workspace-relative or absolute
  line: number          // 0-based
  label?: string
  createdAt: string     // ISO string
}
