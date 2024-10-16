import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faBold,
  faChevronDown,
  faChevronUp,
  faCode,
  faHighlighter,
  faItalic,
  faListOl,
  faListUl,
  faQuoteRight,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faTextWidth,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons'
import { EditorState, Modifier, RichUtils } from 'draft-js'
import EmojiSelector from './EmojiPicker'
const tools = [
  {
    label: 'bold',
    style: 'BOLD',
    icon: <FontAwesomeIcon icon={faBold} />,
    method: 'inline',
  },
  {
    label: 'italic',
    style: 'ITALIC',
    icon: <FontAwesomeIcon icon={faItalic} />,
    method: 'inline',
  },
  // {
  //   label: 'underline',
  //   style: 'UNDERLINE',
  //   icon: <FontAwesomeIcon icon={faUnderline} />,
  //   method: 'inline',
  // },
  // {
  //   label: 'highlight',
  //   style: 'HIGHLIGHT',
  //   icon: <FontAwesomeIcon icon={faHighlighter} />,
  //   method: 'inline',
  // },
  // {
  //   label: 'strike-through',
  //   style: 'STRIKETHROUGH',
  //   icon: <FontAwesomeIcon icon={faStrikethrough} />,
  //   method: 'inline',
  // },
  // {
  //   label: 'Superscript',
  //   style: 'SUPERSCRIPT',
  //   icon: <FontAwesomeIcon icon={faSuperscript} />,
  //   method: 'inline',
  // },
  // {
  //   label: 'Subscript',
  //   style: 'SUBSCRIPT',
  //   icon: <FontAwesomeIcon icon={faSubscript} />,
  //   method: 'inline',
  // },
  // {
  //   label: 'Monospace',
  //   style: 'CODE',
  //   icon: (
  //     <FontAwesomeIcon
  //       icon={faTextWidth}
  //       transform='grow-3'
  //     />
  //   ),
  //   method: 'inline',
  // },
  {
    label: 'Blockquote',
    style: 'blockQuote',
    icon: (
      <FontAwesomeIcon
        icon={faQuoteRight}
        transform='grow-2'
      />
    ),
    method: 'block',
  },
  {
    label: 'Unordered-List',
    style: 'unordered-list-item',
    method: 'block',
    icon: (
      <FontAwesomeIcon
        icon={faListUl}
        transform='grow-6'
      />
    ),
  },
  {
    label: 'Ordered-List',
    style: 'ordered-list-item',
    method: 'block',
    icon: (
      <FontAwesomeIcon
        icon={faListOl}
        transform='grow-6'
      />
    ),
  },
  {
    label: 'Code Block',
    style: 'CODEBLOCK',
    icon: (
      <FontAwesomeIcon
        icon={faCode}
        transform='grow-3'
      />
    ),
    method: 'inline',
  },
  // {
  //   label: 'Uppercase',
  //   style: 'UPPERCASE',
  //   icon: (
  //     <FontAwesomeIcon
  //       icon={faChevronUp}
  //       transform='grow-3'
  //     />
  //   ),
  //   method: 'inline',
  // },
  // {
  //   label: 'lowercase',
  //   style: 'LOWERCASE',
  //   icon: (
  //     <FontAwesomeIcon
  //       icon={faChevronDown}
  //       transform='grow-3'
  //     />
  //   ),
  //   method: 'inline',
  // },
  // {
  //   label: 'Left',
  //   style: 'leftAlign',
  //   icon: (
  //     <FontAwesomeIcon
  //       icon={faAlignLeft}
  //       transform='grow-2'
  //     />
  //   ),
  //   method: 'block',
  // },
  // {
  //   label: 'Center',
  //   style: 'centerAlign',
  //   icon: (
  //     <FontAwesomeIcon
  //       icon={faAlignCenter}
  //       transform='grow-2'
  //     />
  //   ),
  //   method: 'block',
  // },
  // {
  //   label: 'Right',
  //   style: 'rightAlign',
  //   icon: (
  //     <FontAwesomeIcon
  //       icon={faAlignRight}
  //       transform='grow-2'
  //     />
  //   ),
  //   method: 'block',
  // },
  // { label: 'H1', style: 'header-one', method: 'block' },
  { label: 'H', style: 'header-two', method: 'block' },
  // { label: 'H3', style: 'header-three', method: 'block' },
  // { label: 'H4', style: 'header-four', method: 'block' },
  // { label: 'H5', style: 'header-five', method: 'block' },
  // { label: 'H6', style: 'header-six', method: 'block' },
]

const Toolbar = ({ editorState, setEditorState }) => {
  const applyStyle = (e, style, method) => {
    e.preventDefault()
    method === 'block'
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }

  const isActive = (style, method) => {
    if (method === 'block') {
      const selection = editorState.getSelection()
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()
      return blockType === style
    } else {
      const currentStyle = editorState.getCurrentInlineStyle()
      return currentStyle.has(style)
    }
  }

  const insertCharacter = (char) => {
    const currentContent = editorState.getCurrentContent()
    const currentSelection = editorState.getSelection()
    try {
      const contentWithCharacter = Modifier.insertText(
        currentContent,
        currentSelection,
        char
      )
      const newEditorState = EditorState.push(
        editorState,
        contentWithCharacter,
        'insert-text'
      )

      setEditorState(newEditorState)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='toolbar-grid'>
      {tools.map((item, idx) => (
        <button
          style={{
            color: isActive(item.style, item.method)
              ? 'rgba(0, 0, 0, 1)'
              : 'rgba(0, 0, 0, 0.3)',
          }}
          key={`${item.label}-${idx}`}
          title={item.label}
          onClick={(e) => applyStyle(e, item.style, item.method)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {item.icon || item.label}
        </button>
      ))}
      <button
        type='button'
        onClick={() => insertCharacter('A')}
      >
        Insert 'A'
      </button>
      <EmojiSelector
        setEmoji={(em) => {
          console.log(em)
          insertCharacter(em)
        }}
      />
    </div>
  )
}

export default Toolbar
// import React from "react";
// import { FaBold, FaItalic, FaUnderline, FaHighlighter, FaStrikethrough, FaSuperscript, FaSubscript, FaCode, FaQuoteRight, FaListUl, FaListOl, FaArrowUp, FaArrowDown, FaAlignLeft, FaAlignCenter, FaAlignRight, FaHeading } from 'react-icons/fa';
// import { RichUtils } from "draft-js";

// const Toolbar = ({ editorState, setEditorState }) => {
//   const tools = [
//     {
//       label: "Bold",
//       style: "BOLD",
//       icon: <FaBold />,
//       method: "inline",
//     },
//     {
//       label: "Italic",
//       style: "ITALIC",
//       icon: <FaItalic />,
//       method: "inline",
//     },
//     {
//       label: "Underline",
//       style: "UNDERLINE",
//       icon: <FaUnderline />,
//       method: "inline",
//     },
//     {
//       label: "Highlight",
//       style: "HIGHLIGHT",
//       icon: <FaHighlighter />,
//       method: "inline",
//     },
//     {
//       label: "Strike-through",
//       style: "STRIKETHROUGH",
//       icon: <FaStrikethrough />,
//       method: "inline",
//     },
//     {
//       label: "Superscript",
//       style: "SUPERSCRIPT",
//       icon: <FaSuperscript />,
//       method: "inline",
//     },
//     {
//       label: "Subscript",
//       style: "SUBSCRIPT",
//       icon: <FaSubscript />,
//       method: "inline",
//     },
//     {
//       label: "Code",
//       style: "CODE",
//       icon: <FaCode />,
//       method: "inline",
//     },
//     {
//       label: "Blockquote",
//       style: "blockQuote",
//       icon: <FaQuoteRight />,
//       method: "block",
//     },
//     {
//       label: "Unordered List",
//       style: "unordered-list-item",
//       method: "block",
//       icon: <FaListUl />,
//     },
//     {
//       label: "Ordered List",
//       style: "ordered-list-item",
//       method: "block",
//       icon: <FaListOl />,
//     },
//     {
//       label: "Uppercase",
//       style: "UPPERCASE",
//       icon: <FaArrowUp />,
//       method: "inline",
//     },
//     {
//       label: "Lowercase",
//       style: "LOWERCASE",
//       icon: <FaArrowDown />,
//       method: "inline",
//     },
//     {
//       label: "Left Align",
//       style: "leftAlign",
//       icon: <FaAlignLeft />,
//       method: "block",
//     },
//     {
//       label: "Center Align",
//       style: "centerAlign",
//       icon: <FaAlignCenter />,
//       method: "block",
//     },
//     {
//       label: "Right Align",
//       style: "rightAlign",
//       icon: <FaAlignRight />,
//       method: "block",
//     },
//     { label: "H1", style: "header-one", method: "block", icon: <FaHeading /> },
//     { label: "H2", style: "header-two", method: "block", icon: <FaHeading /> },
//     { label: "H3", style: "header-three", method: "block", icon: <FaHeading /> },
//     { label: "H4", style: "header-four", method: "block", icon: <FaHeading /> },
//     { label: "H5", style: "header-five", method: "block", icon: <FaHeading /> },
//     { label: "H6", style: "header-six", method: "block", icon: <FaHeading /> },
//   ];

//   const applyStyle = (e, style, method) => {
//     e.preventDefault();
//     method === "block"
//       ? setEditorState(RichUtils.toggleBlockType(editorState, style))
//       : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
//   };

//   const isActive = (style, method) => {
//     if (method === "block") {
//       const selection = editorState.getSelection();
//       const blockType = editorState
//         .getCurrentContent()
//         .getBlockForKey(selection.getStartKey())
//         .getType();
//       return blockType === style;
//     } else {
//       const currentStyle = editorState.getCurrentInlineStyle();
//       return currentStyle.has(style);
//     }
//   };

//   return (
//     <div className="toolbar-grid">
//       {tools.map((item, idx) => (
//         <button
//           style={{
//             color: isActive(item.style, item.method)
//               ? "rgba(0, 0, 0, 1)"
//               : "rgba(0, 0, 0, 0.3)",
//           }}
//           key={`${item.label}-${idx}`}
//           title={item.label}
//           onClick={(e) => applyStyle(e, item.style, item.method)}
//           onMouseDown={(e) => e.preventDefault()}
//         >
//           {item.icon || item.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Toolbar;

// const insertCharacter = (char) => {
//   const currentContent = editorState.getCurrentContent();
//   const currentSelection = editorState.getSelection();

//   if (currentSelection.isCollapsed()) { // Check if selection is collapsed
//     try {
//       const contentWithCharacter = Modifier.insertText(
//         currentContent,
//         currentSelection,
//         char
//       );

//       const newEditorState = EditorState.push(
//         editorState,
//         contentWithCharacter,
//         'insert-text'
//       );

//       setEditorState(newEditorState);
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     console.log("Selection is not collapsed. Please collapse the selection before inserting text.");
//     // Optionally, handle how you want to proceed if the selection is not collapsed.
//   }
// };
