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

    const contentStateWithEntity = contentState.createEntity(
      'AZISTAR_ENTITY',
      'IMMUTABLE',
      { type: 'STRING', sample: 'Hello' }
    )

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    const newContentState = Modifier.insertText(
      contentStateWithEntity,
      editorState.getSelection(),
      'azistarVariable',
      null,
      entityKey
    )

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
      <button onClick={addEntity}>Add Outside Entity</button>
    </div>
  )
}

export default DraftEditor
