import React, { FC } from 'react'

import { Center } from '@chakra-ui/react'

import Lottie from 'lottie-react'
import { Session } from 'next-auth'

import ActionButtons from './ActionButtons'
import bigInvoiceAnimation from './bigInvoiceAnimation.json'
import statsAnimation from './statsAnimation.json'

const AnimationSection: FC<{ session: Session | null }> = ({ session }) => (
  <>
    <Center>
      <Lottie
        loop
        autoplay
        style={{ height: 400 }}
        animationData={session ? statsAnimation : bigInvoiceAnimation}
      />
    </Center>
    <Center mt="5">
      <ActionButtons isSession={Boolean(session)} />
    </Center>
  </>
)

export default AnimationSection
