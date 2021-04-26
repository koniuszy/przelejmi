import { FC } from 'react'

import { Image, Flex, Divider, Input, Text } from '@chakra-ui/react'

const ImageSection: FC<{ onImageUrlChange(Url: string): void; imgUrl: string }> = ({
  onImageUrlChange,
  imgUrl,
}) => (
  <>
    <Flex justifyContent="space-between">
      <Text fontWeight="bold" fontSize="lg">
        Image URL
      </Text>
    </Flex>

    <Divider my={4} />

    <Input
      placeholder="https://images.example.com"
      value={imgUrl}
      mb={4}
      onChange={(e) => onImageUrlChange(e.target.value)}
    />
    <Image
      mx="auto"
      objectFit="cover"
      align="center"
      w={300}
      h={400}
      mt={5}
      borderRadius={5}
      src={imgUrl}
    />
  </>
)

export default ImageSection
