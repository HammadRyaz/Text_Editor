![Vite+React](https://miro.medium.com/v2/resize:fit:1200/1*_7w3dSyzgf6Tgb3iBe-o1g.png)

# React + Vite Text Editor

This project provides a rich text editor built with React and Vite. It supports a variety of features such as exporting the document in multiple formats (TXT, PDF, DOCX), find & replace functionality, keyboard shortcuts, and fullscreen mode.

## Features

### 1. **Text Editing**
- Use a rich-text editor based on [React-Quill](https://github.com/zenoamaro/react-quill) ![Vite+React](https://img.shields.io/npm/v/react-quill.svg) to create and modify text.
- The editor supports basic text formatting like **bold**, **italic**, **underline**, and **strikethrough**.
- Users can apply **subscript** and **superscript** styles.
- **Font size** and **font family** can be customized.
- Supports ordered and unordered **lists**, **blockquote**, and **alignment**.
- Users can insert **images**, **videos**, and **audio** into the document.

### 2. **Exporting Documents**
- The text can be exported in three formats:
  - **TXT**: A plain text file.
  - **PDF**: A PDF file using [jsPDF](https://github.com/parallax/jsPDF). ![Vite+React](https://img.shields.io/npm/v/jspdf-react.svg)
  - **DOCX**: A Word document using [docx](https://github.com/dolanmiu/docx). ![Vite+React](https://camo.githubusercontent.com/ff741333161e50ba008f76dc6c89a79de3bcd1844e56a0e23847fff29a234eb6/68747470733a2f2f62616467652e667572792e696f2f6a732f646f63782e737667)

### 3. **Find & Replace**
- Users can search for text in the document using the **Find** feature.
- Replace functionality allows replacing the found text with new text.

### 4. **Keyboard Shortcuts**
- A modal displays a list of keyboard shortcuts for actions like:
  - Undo (Alt + Z)
  - Redo (Alt + Y)
  - Find (Alt + F)
  - Delete Line (Alt + Shift + K)
  - Duplicate Line (Shift + Alt + Down)
  - Go to Line (Alt + G)
  - Comment/Uncomment Line (Alt + /)

### 5. **Fullscreen Mode**
- The editor can be toggled into fullscreen mode to maximize the writing area.

### 6. **Notifications**
- Notification system to inform users about successful actions, such as successful find & replace, or errors like missing file names before export.

### 7. **Float Buttons**
- Floating buttons to clear text or clear notifications from the editor interface.

## Dependencies

The following npm packages are used in the project:

- **[react-quill](https://github.com/zenoamaro/react-quill)**: Rich text editor based on Quill.
- **[antd](https://ant.design/)**: UI components like buttons, modals, notifications, etc.
- **[@ant-design/icons](https://github.com/ant-design/ant-design-icons)**: Ant Design icons used in buttons.
- **[jsPDF](https://github.com/parallax/jsPDF)**: For generating PDF documents from the text editor content.
- **[docx](https://github.com/dolanmiu/docx)**: For generating DOCX files from the text editor content.
- **[file-saver](https://github.com/eligrey/FileSaver.js)**: For saving files to the user's device.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:3000`.

## Exporting Files

- To export the content, click the "Export File" button and choose between **TXT**, **PDF**, or **DOCX**.
- If no file name is provided, a notification will prompt the user to enter a file name before exporting.
<hr>

![Shorcut](https://raw.githubusercontent.com/HammadRyaz/Text_Editor/refs/heads/main/Screenshot%202024-12-19%20113521.png)

## Keyboard Shortcuts

- **Delete Line**: `Alt + Shift + K` (Windows/Linux), `Option + Shift + K` (Mac)
- **Duplicate Line**: `Shift + Alt + Down` (Windows/Linux), `Shift + Option + Down` (Mac)
- **Select Line**: `Alt + L`
- **Undo**: `Alt + Z`
- **Redo**: `Alt + Y` or `Alt + Shift + Z`
- **Find**: `Alt + F`
- **Go to Line**: `Alt + G` (Windows/Linux), `Option + G` (Mac)
- **Move Line Up/Down**: `Alt + Up/Down`
- **Comment/Uncomment Line**: `Alt + /`
- **Multi-Cursor**: `Alt + D`




## Troubleshooting

- **Missing file name on export**: Ensure that you provide a file name before attempting to export.
- **Fullscreen mode not working**: Some browsers may block fullscreen requests. Ensure that your browser allows fullscreen requests.
- **Text formatting issues**: The React-Quill editor supports basic text formatting, but advanced features may require additional configuration or plugins.
