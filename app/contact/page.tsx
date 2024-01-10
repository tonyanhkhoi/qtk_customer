// ContactPage.js
import React from 'react';
import Container from 'react-bootstrap/Container';

const ContactPage = () => {
  const facebookLink = 'https://www.facebook.com/YokuTony1010/';
  const phoneNumber = '0908551402';
  const contactName = 'Tony AnhKhoi';

  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <h1>Contact Page</h1>
      <p>
        If you have any questions or inquiries, feel free to contact us:
      </p>

      <ul className="list-unstyled text-center">
        <li>
          Facebook: <a href={facebookLink} target="_blank" rel="noopener noreferrer">{facebookLink}</a>
        </li>
        <li>
          Phone Number: <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        </li>
        <li>
          Contact Person: {contactName}
        </li>
      </ul>
    </Container>
  );
};

export default ContactPage;
