import React, { FC } from 'react'

import { Center } from '@chakra-ui/react'

import Lottie from 'lottie-react'

import FadeInAnimation from 'src/components/FadeInAnimation'

import ActionButtons from './ActionButtons'
import bigInvoiceAnimation from './bigInvoiceAnimation.json'
import statsAnimation from './statsAnimation.json'

const AnimationSection: FC<{ isSession: boolean }> = ({ isSession }) => (
  <FadeInAnimation>
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
  </FadeInAnimation>
)

export default AnimationSection
