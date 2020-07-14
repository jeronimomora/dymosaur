import React from 'react';
import '../styles/Contact.scss';

export default () => {
    return (
        <section className="contact__container">
            <h1>Contact us!</h1>
            <div className="contact__text">
                Do you have any questions or suggestions for the future of this
                app? Did you encounter an issue and want help resolving it?
                Please send us an email to <b>dymosaur.cropper@gmail.com</b> and
                we will be sure to get back to you as soon as possible! We thank
                you for using our application and hope it has helped you save
                time!
            </div>
        </section>
    );
};
