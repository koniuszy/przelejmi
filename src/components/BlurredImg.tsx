import React, { FC } from 'react'

import NextImg from 'next/image'

import { Box } from '@chakra-ui/react'

import { OptimizedImg } from 'src/types'

const BlurredImg: FC<{ optimizedImg: OptimizedImg; width: number }> = ({ optimizedImg, width }) => (
  <Box className="nextImgBox">
    <img
      aria-hidden="true"
      alt="placeholder"
      className="nextImgPlaceholder"
      src={optimizedImg.base64}
    />
    <NextImg
      width={width}
      src={optimizedImg.src}
      objectFit="contain"
      objectPosition="center"
      height={optimizedImg.ratio * width}
    />
  </Box>
)

export default BlurredImg
