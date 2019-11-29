import React, { useMemo, useCallback } from 'react';
import axios from 'axios'
import { useDropzone } from 'react-dropzone';
import { useAlert } from 'react-alert'
import { READY, PROCESSING } from '../constants'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  height: '500px',
  marginLeft: '50px',
  marginRight: '50px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default ({ onProcessStateChange }) => {

    const alert = useAlert()

    const onDrop = useCallback(async ([ file ]) => {

        // Do something with the files
        const apiUrl = process.env.REACT_APP_AWS_API_URL
        const generatePreSignedS3Url = apiUrl + 'generatePreSignedS3Url'
        const processAmazonShippingLabelUrl = apiUrl + 'processShippingLabel'

        // Get the signed url
        let response

        try {
          response = await axios.post(generatePreSignedS3Url, {
              name: file.name
          })
        } catch (error) {
          alert.error('Something went wrong!')
          console.log(error)
          return
        }

        // Upload the file to s3

        try {
          const { signed_url: signedUrl } = response.data.body

          onProcessStateChange(PROCESSING)

          response = await axios.put(signedUrl, file, {
              headers: {
                'Content-Type': file.type
              }
          })

        } catch (error) {
          onProcessStateChange(READY)
          console.log(error)
          return
        }

        // Try to crop the file

        try {
          response = await axios.post(processAmazonShippingLabelUrl, {
              name: file.name
          })

        } catch (error) {

          if(error.response.data.message){
            alert.error(error.response.data.message)
          }
          onProcessStateChange(READY)

          return
        }

        // Try to download the file, and automatically open it
        
        try {
          const { signed_url: downloadSignedUrl, out_name: outName } = response.data.body
    
          axios.get(downloadSignedUrl,{
            responseType: 'blob',
          }).then((responseDownload) => {
              const url = window.URL.createObjectURL(new Blob([responseDownload.data]));
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', outName)
              document.body.appendChild(link)
              link.click()
          });

          onProcessStateChange(READY)

        } catch (error) {

          onProcessStateChange(READY)

          console.log(error.response)
          return
        }

    }, [alert, onProcessStateChange])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'application/pdf', multiple: false, onDrop });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [isDragAccept, isDragActive, isDragReject]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your pdf or click here</p>
      </div>
    </div>
  );
}