import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {Fieldset} from 'primereact/fieldset'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { FiUpload } from 'react-icons/fi'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { Document, Page, pdfjs  } from 'react-pdf'

const file1 = '../../../assets/autobiography/自傳1.pdf'
const file2 = '../../../assets/autobiography/自傳2.pdf'
const file3 = '../../../assets/autobiography/自傳3.pdf'
const file4 = '../../../assets/autobiography/自傳4.pdf'
const file5 = '../../../assets/autobiography/自傳5.pdf'
const file6 = '../../../assets/autobiography/自傳6.pdf'
const file7 = '../../../assets/autobiography/自傳7.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const useStyles = makeStyles( theme =>({
  autobiography: {
    maxHeight: '90%',
    height: '60%',
  },
  textField: {
    width: '25%',
    color: theme.palette.primary.main,
  },
  page: {
    padding: 50
  }
}) )

const Autobiography = props => {
  const classes = useStyles()
  const files = ['自傳1','自傳2','自傳3','自傳4','自傳5','自傳6','自傳7']
  // const acceptAutobiographyType = ['.pdf']
  const [numPages, setNumPages] = useState(0)
  const [pageNumber,setPageNumber] = useState(1)
  const {uploadAutobiography, isUploaded,autobiography} = props
  const [path, setPath] = useState(require(`../../../assets/autobiography/${autobiography}.pdf`))
  // const [file, setFile] = useState()
  const [selectedItem, setSelectedItem] = useState('')

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
  function handleFileListUpload (event) {
    setSelectedItem(event.target.value)
    uploadAutobiography(event.target.value)
  }

  useEffect(()=>{
    selectedItem && setPath(require(`../../../assets/autobiography/${selectedItem}.pdf`))
  },[selectedItem])

  return(
    <div className={classes.root}>
      <Box display="flex" className={classes.autobiography} mt={2}>
        <TextField
          disabled={isUploaded}
          className={classes.textField}
          select
          label="自傳選單"
          value={selectedItem}
          onChange={handleFileListUpload}
          margin="normal"
          variant="outlined"
        >
          {files.map((file,index) => (
            <MenuItem key={index} value={file}>
              {file}
            </MenuItem>
          ))}
        </TextField>
        {/* <input
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
        </label> */}
        <Box minHeight='50%' minWidth='40%' maxWidth='40%'>
          <Fieldset legend="自傳上傳(需上傳PDF檔)" style={{ minWidth: '25vw', color:'#3f51b5',borderColor:'#80d8ff'}}>

            <Document
              file={path}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={console.error}
            >
              <Box display='flex' justifyContent='center'>
                <Page width={490} className={classes.page} pageNumber={pageNumber} />
              </Box>
              <Box display='flex' justifyContent='center'>
                <p>Page {pageNumber} of {numPages}</p>
              </Box>
            </Document>
          </Fieldset>
        </Box>
      </Box>
    </div>
  )
}

export default Autobiography
