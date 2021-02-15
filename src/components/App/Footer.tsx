import React, { FC } from 'react'

import {
  Box,
  Center,
  Divider,
  Flex,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'

const Footer: FC = () => {
  return (
    <Box position="sticky" bottom="0" w="100%">
      <Divider mb="5" />
      <footer>
        <Flex justifyContent="space-between">
          <Center>
            <Stat>
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber fontSize="1.2rem">£132.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </Center>

          <Center>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber fontSize="1.2rem">345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </Center>

          <Center>
            <Stat>
              <StatLabel>Clicked</StatLabel>
              <StatNumber fontSize="1.2rem">45</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
            </Stat>
          </Center>

          <Center>
            <Stat>
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber fontSize="1.2rem">4 000 zł</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </Center>
        </Flex>
      </footer>
    </Box>
  )
}

export default Footer
