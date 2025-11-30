export interface Bookmark {
  id: string;          // uuid
  file: string;        // workspace-relative path or absolute
  line: number;        // 0-based
  label?: string;
  createdAt: string;   // ISO
}
