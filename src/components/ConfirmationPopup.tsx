import React, { FC } from 'react'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
} from '@chakra-ui/react'

const ConfirmationPopup: FC<{
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
  confirmText: string
  colorScheme?: 'red'
}> = ({ isOpen, onClose, onConfirm, isLoading, confirmText, colorScheme = 'red', children }) => {
  return (
    <Modal isCentered isOpen={isOpen} motionPreset="slideInBottom" onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button isLoading={isLoading} colorScheme={colorScheme} onClick={onConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationPopup
