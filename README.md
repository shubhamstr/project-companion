# Project Companion – VS Code Extension

A lightweight productivity extension designed to help developers manage their projects more efficiently. The initial version introduces **Project Bookmarks**, and future releases will include **Notes**, **Tasks**, and more project-level utilities.

---

## 🚀 Features

### ✅ **Project Bookmarks (Current Feature)**

Easily bookmark important lines across your project.

* Add bookmarks for quick navigation.
* View and manage all bookmarks from a side panel.
* Bookmark items show: file name, line number, and a short label.
* Click any bookmark to jump directly to the code location.

### 🧪 **Upcoming Features**

These features will be added in future updates:

* **Project Notes** – Add notes per file or globally.
* **Project Tasks** – Create and manage TODO items.
* **Smart Search** – Search across notes, tasks, and bookmarks.
* **Project Insights** – Overview of bookmarks, tasks, notes.

---

## 📦 Installation

### Install from VS Code Marketplace

1. Open **VS Code**.
2. Go to the **Extensions** panel (Ctrl+Shift+X).
3. In the search bar, type **"Project Companion"**.
4. Find the extension published under your name.
5. Click **Install** to start using it instantly.

If the extension isn’t published yet, you can install it manually using the VSIX method below.

### Install from VS Code (VSIX)

1. Open **VS Code**.
2. Go to **Extensions** panel (Ctrl+Shift+X).
3. Click the **⋯ (More Actions)** menu.
4. Choose **Install from VSIX...**.
5. Select the generated `.vsix` file to install the extension.

### Install from Source

1. Clone or download this repository.
2. Install dependencies:

   ```bash
   npm install
   ```
3. Build the extension:

   ```bash
   npm run build
   ```
4. Press `F5` in VS Code to run the extension in debug mode.

To package the extension:

```bash
npm run package
```

This will generate a `.vsix` file that you can install manually.

---

## 🖱️ Usage

### Add a Bookmark

Open a file → Right-click on a line → Select **Add Bookmark**.

### View Bookmarks

Open the **Project Companion** activity panel → Select **Bookmarks**.

### Remove Bookmark

Hover over a bookmark entry → Click the delete icon.

---

## 📁 Project Structure

```
project-companion/
├── src/
│   ├── extension.ts                 # Main activation file
│   ├── commands/
│   │   └── addBookmark.ts           # Add Bookmark
│   │   └── jumpToBookmark.ts        # Jump To Bookmark
│   ├── models/
│   │   └── bookmarks.ts             # Bookmarks Model
│   ├── storage/
│   │   └── fileStorage.ts           # Bookmarks Storage
│   ├── utils/
│   │   └── decorations.ts           # Bookmark Decorations
│   └── views/
│       └── bookmarkProvider.ts      # Bookmark Provider
├── resources/              # Assets
├── package.json            # Extension manifest
├── tsconfig.json           # TypeScript config
└── README.md               # This file
```

---

## 🧰 Configuration

The extension stores project-level data in a workspace file located at:

```
.vscode/project-companion.json
```

No additional configuration is required for bookmarks.

---

## 🌱 Contributing

Future contributions are welcome! After notes & tasks features are added, the extension will open for PRs. Stay tuned.

---

## ⭐ Support

If you find this extension useful, consider giving it a ⭐ in the marketplace when released!
