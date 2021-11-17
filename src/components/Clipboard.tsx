import React, { FC, isValidElement } from 'react'

import { useClipboard } from '@chakra-ui/react'

const Clipboard: FC<{ value: string; onCopy: () => void }> = ({ children, value, onCopy }) => {
  const clipboard = useClipboard(value)

  function handleClick() {
    clipboard.onCopy()
    onCopy()
  }

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick()
      }}
      onClick={handleClick}
    >
      {isValidElement(children) ? children : null}
    </div>
  )
}

export default Clipboard
