import React from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import './DraftEditor.css'
import DraftEditor from './MainEditor'
import { initialBlocks } from './MainEditor/Helpers/initialBlocks'
import { decorators } from './MainEditor/Helpers/Decorator'

// const OutsideEntity = (props) => {
//   const data = props.contentState.getEntity(props.entityKey).getData()
//   console.log(data, 'Data')
//   return (
//     <span
//       className='outside-entity'
//       {...props}
//     >
//       {props.children}
//     </span>
//   )
// }
// const findOutsideEntity = (contentBlock, callback, contentState) => {
//   contentBlock.findEntityRanges((character) => {
//     const entityKey = character.getEntity()
//     return (
//       entityKey !== null &&
//       contentState.getEntity(entityKey).getType() === 'AZISTAR_ENTITY'
//     )
//   }, callback)
// }

// const decorator = new CompositeDecorator([
//   {
//     strategy: findOutsideEntity,
//     component: OutsideEntity,
//   },
// ])
const AzistarEditor = () => {
  const content = convertFromRaw(initialBlocks)
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(decorators)
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
