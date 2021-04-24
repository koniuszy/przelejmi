import React, { FC } from 'react'

import NextImg from 'next/image'

import { Box } from '@chakra-ui/react'

import { OptimizedImg } from 'src/types'

const BlurredImg: FC<{ optimizedImg: OptimizedImg; height: number }> = ({
  optimizedImg,
  height,
}) => (
  <Box className="nextImgBox">
    <img
      aria-hidden="true"
      alt="placeholder"
      className="nextImgPlaceholder"
      src={optimizedImg.base64}
    />
    <NextImg
      width={height / optimizedImg.ratio}
      src={optimizedImg.src}
      objectFit="contain"
      objectPosition="center"
      height={height}
    />
  </Box>
)

export default BlurredImg
