import React from 'react'
import { CompositeDecorator } from 'draft-js'

function findEntities(contentBlock, callback, contentState, entityType) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === entityKey
    )
  }, callback)
}

const LinkDecorator = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData()
  return <a href={url}>{props.children}</a>
}

const VariableTextDecorator = (props) => {
  const data = props.contentState.getEntity(props.entityKey).getData()
  console.log(data, 'Data')
  return <span>{props.children}</span>
}

export const decorators = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) =>
      findEntities(contentBlock, callback, contentState, 'LINK'),
    component: LinkDecorator,
  },
  {
    strategy: (contentBlock, callback, contentState) =>
      findEntities(contentBlock, callback, contentState, 'AZISTAR_ENTITY'),
    component: VariableTextDecorator,
  },
])

// class LinkEditorExample extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       editorState: EditorState.createEmpty(decorator),
//       showURLInput: false,
//       urlValue: '',
//     };
//   }

//   focus = () => this.refs.editor.focus();

//   onChange = (editorState) => this.setState({editorState});

//   logState = () => {
//     const content = this.state.editorState.getCurrentContent();
//     console.log(convertToRaw(content));
//   };

//   onURLChange = (e) => this.setState({urlValue: e.target.value});

//   promptForLink = (e) =>{
//     e.preventDefault();
//     const {editorState} = this.state;
//     const selection = editorState.getSelection();
//     if (!selection.isCollapsed()) {
//       const contentState = editorState.getCurrentContent();
//       const startKey = editorState.getSelection().getStartKey();
//       const startOffset = editorState.getSelection().getStartOffset();
//       const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
//       const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
//       let url = '';
//       if (linkKey) {
//         const linkInstance = contentState.getEntity(linkKey);
//         url = linkInstance.getData().url;
//       }
//       this.setState({
//         showURLInput: true,
//         urlValue: url,
//       }, () => {
//         setTimeout(() => this.refs.url.focus(), 0);
//       });
//     }
//   }

//   confirmLink = (e) => {
//     e.preventDefault();
//     const {editorState, urlValue} = this.state;
//     const contentState = editorState.getCurrentContent();

//     const contentStateWithEntity = contentState.createEntity(
//       'LINK',
//       'MUTABLE',
//       {url: urlValue}
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

//     // Apply entity
//     let nextEditorState = EditorState.set(editorState,
//       { currentContent: contentStateWithEntity }
//     );

//     // Apply selection
//     nextEditorState = RichUtils.toggleLink( nextEditorState,
//       nextEditorState.getSelection(), entityKey
//     );

//     this.setState({
//       editorState: nextEditorState,
//       showURLInput: false,
//       urlValue: '',
//     }, () => {
//       setTimeout(() => this.refs.editor.focus(), 0);
//     });
//   }

//   onLinkInputKeyDown = (e) => { if (e.which === 13) { this.confirmLink(e); } }

//   removeLink = (e) => {
//     e.preventDefault();
//     const {editorState} = this.state;
//     const selection = editorState.getSelection();
//     if (!selection.isCollapsed()) {
//       this.setState({
//         editorState: RichUtils.toggleLink(editorState, selection, null),
//       });
//     }
//   }

//   render() {

//     const {editorState, showURLInput} = this.state;
//     const contentState = editorState.getCurrentContent();
//     const raw = convertToRaw(contentState);
//     const rawStr = jsonBeautify(raw, null, 2, 50);

//     let urlInput;
//     if (showURLInput) {
//       urlInput =
//         <div style={styles.urlInputContainer}>
//           <input
//             onChange={this.onURLChange}
//             ref="url"
//             style={styles.urlInput}
//             type="text"
//             value={this.state.urlValue}
//             onKeyDown={this.onLinkInputKeyDown}
//           />
//           <button onMouseDown={this.confirmLink}> Confirm </button>
//         </div>;
//     }

//     return (
//       <div style={styles.root}>

//         <div style={{marginBottom: 10}}>
//           Select some text, then use the buttons to add or remove links
//           on the selected text.
//         </div>

//         <div style={styles.buttons}>
//           <button
//             onMouseDown={this.promptForLink}
//             style={{marginRight: 10}}>
//             Add Link
//           </button>
//           <button onMouseDown={this.removeLink}>
//             Remove Link
//           </button>
//         </div>
//         {urlInput}
//         <div style={styles.editor} onClick={this.focus}>
//           <Editor
//             editorState={this.state.editorState}
//             onChange={this.onChange}
//             placeholder="Enter some text..."
//             ref="editor"
//           />
// //         </div>
// //         <pre><code>{rawStr}</code></pre>
// //       </div>
// //     );
// //   }
// // }

// // const styles = {
// //   root: {
// //     fontFamily: '\'Georgia\', serif',
// //     padding: 20,
// //     width: 400,
// //   },
// //   buttons: {
// //     marginBottom: 10,
// //   },
// //   urlInputContainer: {
// //     marginBottom: 10,
// //   },
// //   urlInput: {
// //     fontFamily: '\'Georgia\', serif',
// //     marginRight: 10,
// //     padding: 3,
// //   },
// //   editor: {
// //     border: '1px solid #ccc',
// //     cursor: 'text',
// //     minHeight: 80,
// //     padding: 10,
// //   },
// //   button: {
// //     marginTop: 10,
// //     textAlign: 'center',
// //   },
// //   link: {
// //     color: '#3b5998',
// //     textDecoration: 'underline',
// //   },
// // };

// // const rootElement = document.getElementById("root");
// // ReactDOM.render(<LinkEditorExample />, rootElement);
// import React, { useState, useRef, useEffect } from 'react';
// import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import jsonBeautify from 'json-beautify';

// const LinkEditorExample = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [showURLInput, setShowURLInput] = useState(false);
//   const [urlValue, setUrlValue] = useState('');

//   const editorRef = useRef(null);
//   const urlInputRef = useRef(null);

//   const focus = () => editorRef.current.focus();

//   const onChange = (newState) => setEditorState(newState);

//   const logState = () => {
//     const content = editorState.getCurrentContent();
//     console.log(convertToRaw(content));
//   };

//   const onURLChange = (e) => setUrlValue(e.target.value);

//   const promptForLink = (e) => {
//     e.preventDefault();
//     const selection = editorState.getSelection();
//     if (!selection.isCollapsed()) {
//       const contentState = editorState.getCurrentContent();
//       const startKey = selection.getStartKey();
//       const startOffset = selection.getStartOffset();
//       const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
//       const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
//       let url = '';
//       if (linkKey) {
//         const linkInstance = contentState.getEntity(linkKey);
//         url = linkInstance.getData().url;
//       }
//       setShowURLInput(true);
//       setUrlValue(url);
//       setTimeout(() => urlInputRef.current.focus(), 0);
//     }
//   };

//   const confirmLink = (e) => {
//     e.preventDefault();
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//       'LINK',
//       'MUTABLE',
//       { url: urlValue }
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

//     // Apply entity
//     let nextEditorState = EditorState.set(editorState, {
//       currentContent: contentStateWithEntity,
//     });

//     // Apply selection
//     nextEditorState = RichUtils.toggleLink(nextEditorState, nextEditorState.getSelection(), entityKey);

//     setEditorState(nextEditorState);
//     setShowURLInput(false);
//     setUrlValue('');
//     setTimeout(() => editorRef.current.focus(), 0);
//   };

//   const onLinkInputKeyDown = (e) => {
//     if (e.which === 13) { confirmLink(e); }
//   };

//   const removeLink = (e) => {
//     e.preventDefault();
//     const selection = editorState.getSelection();
//     if (!selection.isCollapsed()) {
//       setEditorState(RichUtils.toggleLink(editorState, selection, null));
//     }
//   };

//   const contentState = editorState.getCurrentContent();
//   const raw = convertToRaw(contentState);
//   const rawStr = jsonBeautify(raw, null, 2, 50);

//   let urlInput;
//   if (showURLInput) {
//     urlInput = (
//       <div style={styles.urlInputContainer}>
//         <input
//           onChange={onURLChange}
//           ref={urlInputRef}
//           style={styles.urlInput}
//           type="text"
//           value={urlValue}
//           onKeyDown={onLinkInputKeyDown}
//         />
//         <button onMouseDown={confirmLink}> Confirm </button>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.root}>
//       <div style={{ marginBottom: 10 }}>
//         Select some text, then use the buttons to add or remove links on the selected text.
//       </div>
//       <div style={styles.buttons}>
//         <button onMouseDown={promptForLink} style={{ marginRight: 10 }}>
//           Add Link
//         </button>
//         <button onMouseDown={removeLink}>
//           Remove Link
//         </button>
//       </div>
//       {urlInput}
//       <div style={styles.editor} onClick={focus}>
//         <Editor
//           editorState={editorState}
//           onChange={onChange}
//           placeholder="Enter some text..."
//           ref={editorRef}
//         />
//       </div>
//       <pre><code>{rawStr}</code></pre>
//     </div>
//   );
// };

// const styles = {
//   root: {
//     fontFamily: '\'Georgia\', serif',
//     padding: 20,
//     width: 400,
//   },
//   buttons: {
//     marginBottom: 10,
//   },
//   urlInputContainer: {
//     marginBottom: 10,
//   },
//   urlInput: {
//     fontFamily: '\'Georgia\', serif',
//     marginRight: 10,
//     padding: 3,
//   },
//   editor: {
//     border: '1px solid #ccc',
//     cursor: 'text',
//     minHeight: 80,
//     padding: 10,
//   },
// };

// export default LinkEditorExample;
