import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {Fieldset} from 'primereact/fieldset'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { FiUpload } from 'react-icons/fi'
import { Document, Page, pdfjs  } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles( theme =>({
  autobiography: {
    maxWidth: '100%',
    maxHeight: '90%',
    height: '60%',
  },
}) )

const Autobiography = props => {
  const classes = useStyles()
  const acceptAutobiographyType = ['.pdf']
  const [numPages, setNumPages] = useState(0)
  const [pageNumber,setPageNumber] = useState(1)
  const {uploadAutobiography} = props
  const [file, setFile] = useState()

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  const handleFileUpload = event => {
    const files = event.target.files
    if(files) {
      uploadAutobiography(files[0])
    }
    event.target.value  = ''
  }
  return(
    <div className={classes.root}>
      <Box display="flex" className={classes.autobiography} mt={2}>
        <input
          accept={acceptAutobiographyType}
          hidden
          id="buttonFileAutobiography"
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="buttonFileAutobiography">
          <Button variant="raised" component="span" color='primary'>
            <FiUpload/>
          </Button>
        </label>
        <Box minHeight='50%' width='100%'>
          <Fieldset legend="自傳上傳(需上傳PDF檔)" style={{ minWidth: '25vw', color:'#3f51b5',borderColor:'#80d8ff'}}>

            <Document
              file=""
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={console.error}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </Fieldset>
        </Box>
      </Box>
    </div>
  )
}

export default Autobiography
