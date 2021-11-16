import React, { FC, isValidElement } from 'react'

import { useClipboard } from '@chakra-ui/react'

const Clipboard: FC<{ value: string; onCopy: () => void }> = ({ children, value, onCopy }) => {
  const clipboard = useClipboard(value)

  return (
    <div
      onClick={() => {
        clipboard.onCopy()
        onCopy()
      }}
    >
      {isValidElement(children) ? children : null}
    </div>
  )
}

export default Clipboard
