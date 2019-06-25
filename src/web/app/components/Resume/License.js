import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {Fieldset} from 'primereact/fieldset'
import Box from '@material-ui/core/Box'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'


const useStyles = makeStyles( theme =>({
  root: {
    background: theme.palette.primary.white,
    opacity: 0.95
  },
  license: {
    minWidth: '30vw',
    maxHeight: '90%',
    width: '30vw',
    height: '60%',
    margin: theme.spacing(2),
  }
}) )

const License = (props) => {
  const classes = useStyles()
  const acceptLicenseType = ['.pdf','.png','.gif','.jpg','jpeg']
  const [files, setFiles] = useState([])
  const [pond, setPond] = useState()
  const {uploadLicense} = props

  const handleInit = () => {
    console.log("FilePond instance has initialised", pond)
  }

  useEffect(() => {
  },[])


  return(
    <div className={classes.root}>
      <Box display="flex" className={classes.license}  >
        {/* <input
          accept={acceptLicenseType}
          hidden
          id="buttonFileLicense"
          multiple
          type="file"
          onChange={handleUpdatedLicense}
        />
        <label htmlFor="buttonFileLicense">
          <Button variant="raised" component="span" color='primary'>
            <FiUpload/>
          </Button>
        </label> */}

        <Box minHeight='50%' width='100%'>
          <Fieldset legend="證照上傳" style={{ minWidth: '25vw', color:'#3f51b5',borderColor:'#80d8ff'}}>
            <FilePond
              name='file'
              ref={ref => setPond(ref)}
              files={files}
              allowMultiple={true}
              maxFiles={20}
              server={uploadLicense}
              server="/resume/update"
              oninit={handleInit}
              onupdatefiles={fileItems => {
                // Set currently active file objects to this.state
                setFiles(fileItems.map(fileItem => fileItem.file))
              }}
            />

            <img/>
          </Fieldset>
        </Box>
      </Box>
    </div>
  )
}

export default License
