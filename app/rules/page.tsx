// CompanyRulesPage.js
import React from 'react';
import Container from 'react-bootstrap/Container';

const CompanyRulesPage = () => {
  return (
    <Container className="mt-5">
      <h1>Company Rules</h1>

      <section>
        <h2>1. Store Operating Hours</h2>
        <p>
          Our convenience store operates from Monday to Sunday.
          <br />
          Opening hours: 7:00 AM to 10:00 PM.
        </p>
      </section>

      <section className="mt-4">
        <h2>2. Customer Conduct</h2>
        <p>
          We strive to provide a pleasant shopping experience for all customers. Please be respectful to our staff and other customers.
        </p>
      </section>

      <section className="mt-4">
        <h2>3. Payment Methods</h2>
        <p>
          We accept various payment methods, including cash, credit/debit cards, and mobile payments. Please check at the cashier for the available options.
        </p>
      </section>

      <section className="mt-4">
        <h2>4. Returns and Exchanges</h2>
        <p>
          We accept returns and exchanges within 7 days of purchase with a valid receipt. Items must be in their original condition and packaging.
        </p>
      </section>

      <section className="mt-4">
        <h2>5. Hygiene and Safety</h2>
        <p>
          For the safety of our customers and staff, we maintain a clean and hygienic environment. Please dispose of trash responsibly.
        </p>
      </section>

      <section className="mt-4">
        <h2>6. Contact Information</h2>
        <p>
          If you have any inquiries or feedback, feel free to contact us:
          <br />
          Email: info@yourconveniencestore.com
          <br />
          Phone: (123) 456-7890
        </p>
      </section>
    </Container>
  );
};

export default CompanyRulesPage;
