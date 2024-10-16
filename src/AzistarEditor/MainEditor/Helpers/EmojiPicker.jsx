import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import React from 'react'

function EmojiSelector({ setEmoji }) {
  const [show, setShow] = React.useState(false)
  const handleEmojiSelect = (emoji) => {
    setEmoji(emoji.native)
  }

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setShow(!show)}>show</button>
      {show && (
        <div style={{ position: 'absolute' }}>
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            perLine={8}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiSelector
