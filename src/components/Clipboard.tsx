import React, { FC, isValidElement } from 'react'

import { useClipboard, useToast } from '@chakra-ui/react'

import { successToastContent } from 'src/lib/toastContent'

const Clipboard: FC<{ value: string; description: string }> = ({
  children,
  value,
  description,
}) => {
  const toast = useToast({ ...successToastContent, title: 'Saved to clipboard', description })
  const { onCopy } = useClipboard(value)

  return (
    <div
      onClick={() => {
        onCopy()
        toast()
      }}
    >
      {isValidElement(children) ? children : null}
    </div>
  )
}

export default Clipboard
