import React from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import './DraftEditor.css'
import DraftEditor from './MainEditor'
import { initialBlocks } from './MainEditor/Helpers/initialBlocks'

const AzistarEditor = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(convertFromRaw(initialBlocks))
  )

  const onEditorChange = (editorState) => {
    const contentState = editorState.getCurrentContent()
    console.log(convertToRaw(contentState))
    setEditorState(editorState)
  }

  return (
    <div className='editor-wrapper'>
      <DraftEditor
        setEditorState={setEditorState}
        onEditorChange={onEditorChange}
        editorState={editorState}
      />
    </div>
  )
}

export default AzistarEditor
