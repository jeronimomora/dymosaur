import React from 'react';
import '../styles/HowTo.scss';

export default () => (
    <section className="how-to">
        <h1>Sup.</h1>
        <p className="how-to__explanation">
            This application allows you to transform a PDF containing many
            Amazon UPS shipping labels into a PDF containing one 4x6 label on
            each page. The output PDF will contain twice as many pages as the
            input PDF; one for each label contained in the input PDF. This will
            enable you to print the labels on a thermal label printer. The
            instructions are pretty straightforward: Just drag and drop the PDF
            you want to crop into the dropzone and allow the app to do the rest.
            The images provided below show what the input PDF looks like and one
            of two labels that will be extracted from it.
        </p>
        <div className="label-container">
            <img
                className="label"
                alt="Example of a page containing UPS FBA shipping labels from Amazon"
                src="images/UpsFbaInput.png"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 25 25"
            >
                <path
                    className="how-to__arrow-path"
                    d="M24 12l-9-8v6h-15v4h15v6z"
                />
            </svg>
            <img
                className="label"
                alt="Example of the output of our application given the input example"
                src="images/UpsFbaOutput.png"
            />
        </div>
    </section>
);
