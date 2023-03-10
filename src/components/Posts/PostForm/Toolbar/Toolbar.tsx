import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaChevronDown,
  FaChevronUp,
  FaCode,
  FaHighlighter,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaTextWidth,
  FaUnderline,
} from "react-icons/fa";

import { Icon } from "@chakra-ui/icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { RichUtils } from "draft-js";

const Toolbar = ({ editorState, setEditorState }) => {
  const tools = [
    {
      label: "bold",
      style: "BOLD",
      icon: <Icon as={FaBold} />,
      method: "inline",
    },
    {
      label: "italic",
      style: "ITALIC",
      icon: <Icon as={FaItalic} />,
      method: "inline",
    },
    {
      label: "underline",
      style: "UNDERLINE",
      icon: <Icon as={FaUnderline} />,
      method: "inline",
    },
    {
      label: "highlight",
      style: "HIGHLIGHT",
      icon: <Icon as={FaHighlighter} />,
      method: "inline",
    },
    {
      label: "strike-through",
      style: "STRIKETHROUGH",
      icon: <Icon as={FaStrikethrough} />,
      method: "inline",
    },
    {
      label: "Superscript",
      style: "SUPERSCRIPT",
      icon: <Icon as={FaSuperscript} />,
      method: "inline",
    },
    {
      label: "Subscript",
      style: "SUBSCRIPT",
      icon: <Icon as={FaSubscript} />,
      method: "inline",
    },
    {
      label: "Monospace",
      style: "CODE",
      icon: <Icon as={FaTextWidth} transform="grow-3" />,
      method: "inline",
    },
    {
      label: "Blockquote",
      style: "blockQuote",
      icon: <Icon as={FaQuoteRight} transform="grow-2" />,
      method: "block",
    },
    {
      label: "Unordered-List",
      style: "unordered-list-item",
      method: "block",
      icon: <Icon as={FaListUl} transform="grow-6" />,
    },
    {
      label: "Ordered-List",
      style: "ordered-list-item",
      method: "block",
      icon: <Icon as={FaListOl} transform="grow-6" />,
    },
    {
      label: "Code Block",
      style: "CODEBLOCK",
      icon: <Icon as={FaCode} transform="grow-3" />,
      method: "inline",
    },
    {
      label: "Uppercase",
      style: "UPPERCASE",
      icon: <Icon as={FaChevronUp} transform="grow-3" />,
      method: "inline",
    },
    {
      label: "lowercase",
      style: "LOWERCASE",
      icon: <Icon as={FaChevronDown} transform="grow-3" />,
      method: "inline",
    },
    {
      label: "Left",
      style: "leftAlign",
      icon: <Icon as={FaAlignLeft} transform="grow-2" />,
      method: "block",
    },
    {
      label: "Center",
      style: "centerAlign",
      icon: <Icon as={FaAlignCenter} transform="grow-2" />,
      method: "block",
    },
    {
      label: "Right",
      style: "rightAlign",
      icon: <Icon as={FaAlignRight} transform="grow-2" />,
      method: "block",
    },
    { label: "H1", style: "header-one", method: "block" },
    { label: "H2", style: "header-two", method: "block" },
    { label: "H3", style: "header-three", method: "block" },
    { label: "H4", style: "header-four", method: "block" },
    { label: "H5", style: "header-five", method: "block" },
    { label: "H6", style: "header-six", method: "block" },
  ];

  const applyStyle = (e, style, method) => {
    e.preventDefault();
    method === "block"
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style, method) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <div className="toolbar-grid">
      {tools.map((item, idx) => (
        <button
          style={{
            color: isActive(item.style, item.method)
              ? "rgba(0, 0, 0, 1)"
              : "rgba(0, 0, 0, 0.3)",
          }}
          key={`${item.label}-${idx}`}
          title={item.label}
          onClick={(e) => applyStyle(e, item.style, item.method)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {item.icon || item.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
