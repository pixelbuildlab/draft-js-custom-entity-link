import React from 'react'
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js'
import { myBlockStyleFn, styleMap } from './Helpers/blockStyles'
import Toolbar from './Helpers/Toolbar'

const DraftEditor = ({ onEditorChange, editorState, setEditorState }) => {
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return true
    }
    return false
  }
  const addEntity = () => {
    const contentState = editorState.getCurrentContent()

    // Create the "ENTITY" with its metadata
    const contentStateWithEntity = contentState.createEntity(
      'OUTSIDE_ENTITY', // Entity type
      'IMMUTABLE', // Mutability
      { color: 'red' } // Entity data
    )

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    // Insert the entity text into the content
    const newContentState = Modifier.insertText(
      contentStateWithEntity,
      editorState.getSelection(),
      'outside entity', // The text that will be displayed
      null, // No inline style applied here
      entityKey // The entity key for the text
    )

    // Push the new content state with the entity to the editor
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    )

    setEditorState(newEditorState)
  }
  return (
    <div>
      <div className='editor-container'>
        <Editor
          placeholder='Write Here'
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
          onChange={onEditorChange}
        />
      </div>
      <Toolbar
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <button onClick={addEntity}>Add Outside Entity</button> {/* New Button */}
    </div>
  )
}

export default DraftEditor
