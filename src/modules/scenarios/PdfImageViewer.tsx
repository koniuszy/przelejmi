import { FC } from 'react'

import { Skeleton } from '@chakra-ui/react'

import styled from '@emotion/styled'
import { Document, Page, pdfjs } from 'react-pdf'

// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from './pdf-worker'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const StyledPdfImageViewer = styled.div`
  canvas,
  div {
    width: 100% !important;
    height: auto !important;
  }
`

const PdfImageViewer: FC<{ url: string; onLoaded?: () => void }> = ({
  url,
  onLoaded = () => {},
}) => {
  if (!url) return <Skeleton w="100%" h="80vh" />

  return (
    <StyledPdfImageViewer>
      <Document loading={<Skeleton w="100%" h="80vh" />} file={url} onLoadSuccess={onLoaded}>
        <Page className="pdfPage" pageNumber={1} />
      </Document>
    </StyledPdfImageViewer>
  )
}

export default PdfImageViewer
