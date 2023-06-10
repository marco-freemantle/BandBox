import "./DataCollection.css";
import { Link } from "react-router-dom";

function DataCollection() {
  return (
    <div className="privacy-policy-main-content">
      <div className="privacy-policy">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Privacy Policy: How We Collect and Delete Data
        </h1>

        <h2>Data Collection:</h2>
        <ol>
          <li>
            <b>Personal Information: </b>
            When you sign up for BandBox, we collect certain personal
            information such as your name and email address. This information is
            necessary for creating and maintaining your account, enabling us to
            provide our services effectively.
          </li>
          <li>
            <b>Band Financial Data: </b>
            We understand the importance of financial data to manage your band
            effectively. As such, our application allows you to input and store
            financial information relevant to your band's operations. This data
            is securely stored in our Firestore database.
          </li>
          <li>
            <b>Events Data: </b>
            Our application facilitates the management of band events, such as
            concerts and performances. When you create events using the BandBox
            application, relevant data such as event details, dates, addresses,
            and financial data (if applicable) will be collected and stored to
            ensure smooth coordination.
          </li>
          <li>
            <b>Group Chat Messages: </b>
            We offer group chat functionality to enhance communication and
            collaboration among band members. Messages exchanged within the
            group chat feature are stored securely to ensure effective
            communication and reference.
          </li>
        </ol>

        <h2>Data Security and Storage:</h2>
        <ol>
          <li>
            <b>Confidentiality: </b>
            We take data security seriously and implement industry-standard
            measures to protect your information from unauthorised access,
            disclosure, alteration, or destruction. We ensure that only
            authorised personnel have access to the data and implement strict
            security protocols.
          </li>
          <li>
            <b>Firestore: </b>
            All the data collected through our application, including personal
            information, band financial data, events data, and group chat
            messages, is stored in Firestore, a secure and scalable NoSQL
            database provided by Google Cloud. Firestore offers robust security
            features, including encryption at rest and in transit, ensuring the
            safety of your data.
          </li>
        </ol>

        <h2>Data Deletion:</h2>
        <ol>
          <li>
            <b>Account Deletion: </b>
            If you wish to delete your account and associated data from our band
            management application, you can delete your account on the account
            'settings' page. We will verify your identity and immediately delete
            all the data associated with your account.
          </li>
        </ol>

        <h2>Changes to the Privacy Policy:</h2>
        <p>
          We may update our privacy policy from time to time to reflect changes
          in our practices. We encourage you to review this policy periodically
          to stay informed about how we collect, use, and protect your data.
        </p>

        <p>
          By using our band management application, you agree to the collection,
          storage, and use of your data as outlined in this privacy policy.
        </p>

        <p>
          If you have any questions or concerns about our data collection,
          storage, or deletion practices, please email marcofreemantle@gmail.com
        </p>
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          <Link to="/">Click here to go to your dashboard!</Link>
        </p>
      </div>
    </div>
  );
}

export default DataCollection;
