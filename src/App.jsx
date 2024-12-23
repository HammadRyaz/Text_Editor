import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Layout, Space, Typography, Modal, notification, FloatButton, Input } from "antd";
import {
  UndoOutlined,
  RedoOutlined,
  SnippetsOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from "@ant-design/icons";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import * as docx from "docx";
import "antd/dist/reset.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const TextEditor = () => {
  const [content, setContent] = useState("");
  const [showShortcutGuide, setShowShortcutGuide] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // State to track fullscreen mode
  const [fileName, setFileName] = useState('');
  const quillRef = useRef(null);

  const handleChange = (value) => {
    setContent(value);
  };

  // Export file functionality (Download as .txt, .docx, or .pdf)
 // Updated exportFile function to use fileName
const exportFile = (type) => {
  if (!fileName) {
    notification.error({
      message: "File Name Required",
      description: "Please enter a file name before exporting.",
    });
    return;
  }

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");

  if (type === "txt") {
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.txt`;
    link.click();
  } else if (type === "pdf") {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save(`${fileName}.pdf`);
  } else if (type === "docx") {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph(content)],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${fileName}.docx`);
    });
  }
};
  // Find functionality with highlight
  const findTextInEditor = () => {
    const editor = quillRef.current.getEditor();
    const text = editor.getText();
    const regex = new RegExp(findText, "g");
    const matches = [...text.matchAll(regex)];

    if (matches.length > 0) {
      matches.forEach((match) => {
        const index = match.index;
        editor.formatText(index, findText.length, { background: "yellow" });
        setTimeout(() => {
          editor.formatText(index, findText.length, { background: "transparent" });
        }, 8000); // Highlight for 3 seconds
      });
      notification.success({
        message: "Text Found",
        description: `${matches.length} matches found for "${findText}".`,
      });
    } else {
      notification.info({
        message: "No Matches",
        description: `No matches found for "${findText}".`,
      });
    }
  };

  // Find and Replace functionality
  const handleFindReplace = () => {
    const editor = quillRef.current.getEditor();
    const editorContent = editor.getText();
    if (!editorContent.includes(findText)) {
      notification.error({
        message: "Text Not Found",
        description: `The text "${findText}" was not found in the document.`,
      });
      return;
    }
    
    const regex = new RegExp(findText, "g");
    const matches = [...editorContent.matchAll(regex)];

    if (matches.length > 0) {
      matches.forEach((match) => {
        const index = match.index;
        editor.deleteText(index, findText.length);
        editor.insertText(index, replaceText);
      });
      notification.success({
        message: "Text Replaced",
        description: `"${findText}" has been replaced with "${replaceText}".`,
      });
    } else {
      notification.info({
        message: "No Matches",
        description: `No matches found for "${findText}".`,
      });
    }
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: isFullscreen ? "hidden" : "auto" }}>
      <Header style={{ backgroundColor: "#001529", padding: "1rem" }}>
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Text Editor
        </Title>
      </Header>
      <Content style={{ padding: "2rem", height: isFullscreen ? "100vh" : "auto" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Space wrap>
            <Button icon={<UndoOutlined />} onClick={() => quillRef.current.getEditor().history.undo()}>
              Undo
            </Button>
            <Button icon={<RedoOutlined />} onClick={() => quillRef.current.getEditor().history.redo()}>
              Redo
            </Button>
            <Button icon={<SnippetsOutlined />} onClick={() => setShowExportModal(true)}>
  Export File
</Button>


            <Button icon={<SearchOutlined />} onClick={() => setShowFindReplace(true)}>
              Find & Replace
            </Button>
            <Button icon={<QuestionCircleOutlined />} onClick={() => setShowShortcutGuide(true)}>
              Shortcut Guide
            </Button>
            <Button icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />} onClick={toggleFullscreen}>
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </Space>
          <ReactQuill
            value={content}
            onChange={handleChange}
            ref={quillRef}
            style={{ height: isFullscreen ? "calc(100vh - 180px)" : "300px", backgroundColor: "white" }}
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ script: "sub" }, { script: "super" }],
                [{ font: [] }, { size: [] }],
                [{ header: [1, 2, 3, false] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ["image", "video", "audio"],
              ],
            }}
            formats={[
              "bold",
              "italic",
              "underline",
              "strike",
              "script",
              "font",
              "size",
              "header",
              "list",
              "bullet",
              "blockquote",
              "color",
              "background",
              "image",
              "video",
              "audio",
            ]}
          />
        </Space>
      </Content>

      {/* // Updated Export File Modal inside the component */}
      <Modal
  visible={showExportModal}
  onCancel={() => setShowExportModal(false)}
  footer={[
    <Button key="cancel" onClick={() => setShowExportModal(false)}>
      Cancel
    </Button>,
    <Button key="txt" type="primary" onClick={() => exportFile("txt")}>
      Export as TXT
    </Button>,
    <Button key="pdf" type="primary" onClick={() => exportFile("pdf")}>
      Export as PDF
    </Button>,
    <Button key="docx" type="primary" onClick={() => exportFile("docx")}>
      Export as DOCX
    </Button>,
  ]}
  title="Export File"
>
  <p>Select the file type for export.</p>
  <Input
    placeholder="Enter file name"
    value={fileName}
    onChange={(e) => setFileName(e.target.value)}
    style={{ marginBottom: 10 }}
  />
</Modal>


      {/* Shortcut Guide Modal */}
      <Modal
        visible={showShortcutGuide}
        onCancel={() => setShowShortcutGuide(false)}
        footer={null}
        title="Keyboard Shortcuts"
      >
        <div>
          <h3>Text Editor Shortcuts</h3>
          <ul>
            <li><strong>Delete Line:</strong> Alt + Shift + K (Windows/Linux), Option + Shift + K (Mac)</li>
            <li><strong>Duplicate Line:</strong> Shift + Alt + Down (Windows/Linux), Shift + Option + Down (Mac)</li>
            <li><strong>Select Line:</strong> Alt + L</li>
            <li><strong>Undo:</strong> Alt + Z</li>
            <li><strong>Redo:</strong> Alt + Y or Alt + Shift + Z</li>
            <li><strong>Find:</strong> Alt + F</li>
            <li><strong>Go to Line:</strong> Alt + G (Windows/Linux), Option + G (Mac)</li>
            <li><strong>Move Line Up/Down:</strong> Alt + Up/Down</li>
            <li><strong>Comment/Uncomment Line:</strong> Alt + /</li>
            <li><strong>Multi-Cursor:</strong> Alt + D</li>
          </ul>
        </div>
      </Modal>

      {/* Find & Replace Modal */}
      <Modal
        visible={showFindReplace}
        onCancel={() => setShowFindReplace(false)}
        footer={[
          <Button key="find" onClick={findTextInEditor}>Find</Button>,
          <Button key="replace" type="primary" onClick={handleFindReplace}>Find & Replace</Button>,
        ]}
        title="Find & Replace"
      >
        <div>
          <Input
            placeholder="Find text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Replace with"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
        </div>
      </Modal>

      {/* Clear Notifications Button (FloatButton) */}
      <FloatButton
        type="primary"
        icon={<QuestionCircleOutlined />}
        style={{ bottom: 40, right: 40 }}
        onClick={() => notification.destroy()}
        tooltip="Clear Notifications"
        shape="circle"
        danger
      />

      {/* Clear Text Button (FloatButton) */}
      <FloatButton
        type="primary"
        icon={<DeleteOutlined />}
        style={{ bottom: 100, right: 40 }}
        onClick={() => setContent("")}
        tooltip="Clear Text"
        shape="circle"
        danger
      />
    </Layout>
  );
};

export default TextEditor;
