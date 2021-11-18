import { FC } from 'react'

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

const PdfImageViewer: FC<{ url: string }> = ({ url }) => {
  return (
    <StyledPdfImageViewer>
      <Document file={url}>
        <Page className="pdfPage" pageNumber={1} />
      </Document>
    </StyledPdfImageViewer>
  )
}

export default PdfImageViewer
