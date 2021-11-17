import React, { FC } from 'react'

import { Center } from '@chakra-ui/react'

import Lottie from 'lottie-react'

import ActionButtons from './ActionButtons'
import bigInvoiceAnimation from './bigInvoiceAnimation.json'
import statsAnimation from './statsAnimation.json'

const AnimationSection: FC<{ isSession: boolean }> = ({ isSession }) => (
  <>
    <Center>
      <Lottie
        loop
        autoplay
        style={{ height: 400 }}
        animationData={isSession ? statsAnimation : bigInvoiceAnimation}
      />
    </Center>
    <Center mt="5">
      <ActionButtons isSession={isSession} />
    </Center>
  </>
)

export default AnimationSection
