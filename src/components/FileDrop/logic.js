import { useCallback } from 'react';
import axios from 'axios';
import { READY, PROCESSING } from '../../constants';

export const useOnDrop = (alert, onProcessStateChange) => {
    return useCallback(
        async ([file]) => {
            if (!file) {
                alert.error('Only pdf files are supported.');
                return;
            }

            onProcessStateChange(PROCESSING);

            // Do something with the files
            const apiUrl = process.env.REACT_APP_AWS_API_URL;
            const generatePreSignedS3Url = apiUrl + 'generatePreSignedS3Url';
            const processAmazonShippingLabelUrl =
                apiUrl + 'processShippingLabel';

            // Get the signed url
            let response;

            try {
                response = await axios.post(generatePreSignedS3Url, {
                    name: file.name,
                });
            } catch (error) {
                onProcessStateChange(READY);
                alert.error('Something went wrong!');
                return;
            }

            // Upload the file to s3

            try {
                const { signed_url: signedUrl } = response.data.body;

                response = await axios.put(signedUrl, file, {
                    headers: {
                        'Content-Type': file.type,
                    },
                });
            } catch (error) {
                onProcessStateChange(READY);
                return;
            }

            // Try to crop the file

            try {
                response = await axios.post(processAmazonShippingLabelUrl, {
                    name: file.name,
                });
            } catch (error) {
                if (error.response.data.message) {
                    alert.error(error.response.data.message);
                }
                onProcessStateChange(READY);

                return;
            }

            // Try to download the file, and automatically open it

            try {
                const {
                    signed_url: downloadSignedUrl,
                    out_name: outName,
                } = response.data.body;

                axios
                    .get(downloadSignedUrl, {
                        responseType: 'blob',
                    })
                    .then((responseDownload) => {
                        const url = window.URL.createObjectURL(
                            new Blob([responseDownload.data]),
                        );
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', outName);
                        document.body.appendChild(link);
                        link.click();
                    });
            } catch (error) {
                alert.error('Something went wrong!');
            }

            onProcessStateChange(READY);
        },
        [alert, onProcessStateChange],
    );
};
