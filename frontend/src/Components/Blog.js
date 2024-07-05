import React from 'react';
import "../Stylesheets/Blog.css";

const Blog = () => {
  return (
    <div id="content-container" className="_1CbCO _1zXYv">
      <div className="cl4Go">Customer Support Policy</div>
      
      <Section
        title="1. BACKGROUND:"
        content={
          <>
            <p className="_336Oo">
              Pharmpe acknowledges that customer satisfaction is the key cornerstone for its growth
              and customer-centricity is one of the core values that we, at Pharmpe, cherish and hope to uphold. We
              strive to provide the best customer experience from our end, however, if you face any issues and
              concerns with our services, we request you to refer to this policy which provides the detailed steps for
              customer grievance redressal.
            </p>
            <p className="_336Oo">
              The Company’s Customer Support Policy has been formulated in line with regulatory
              guidelines and other applicable laws on Customer Service. The policy outlines the framework for
              addressing customer grievances.
            </p>
            <p className="_336Oo">
              The Company defines customer complaints as a deficiency or a gap in the committed level
              of services rendered to the customer. Complaints can be on account of a breach in committed turnaround
              time, non-fulfillment of the request placed by customers, payment-related concerns, etc. It is clarified
              that the Company is purely an online intermediary connecting the sellers listed on Pharmpe platform
              with consumers and we neither control nor have any ownership of the products sold through our platform.
              Thus, all concerns with the fitness, merchantability, and adequacy of the products are the
              responsibility of the seller/retail partners and we will employ our best efforts to assist in getting
              all such product-related concerns resolved through them. We also request you to read the <span className="_2NJzs">FAQs</span>&nbsp;available at&nbsp;
              <a href="" className="_3fqrE">https://Pharmpe.in/help</a>&nbsp; as they may help to resolve certain queries that
              you may have concerning orders, returns, payments, Wallets, etc.
            </p>
          </>
        }
      />

      <Section
        title="2. OBJECTIVE:"
        content={
          <>
            <p className="_336Oo">The Objective of the policy is to ensure that:</p>
            <p className="_336Oo">
              All customers are treated fairly at all times. <br />
              All complaints, requests, and queries received from customers are responded to promptly and with courtesy within 24 hours of the complaint
              raised by the Customer on our portal.<br />
              Customers are fully informed of avenues to escalate their grievances and their rights to escalate if they are not satisfied with the response from the Customer
              Service Team.
            </p>
          </>
        }
      />

      <Section
        title="3. CHANNELS AVAILABLE FOR CUSTOMERS TO REPORT GRIEVANCE:"
        content={
          <>
            <p className="_336Oo">
              The Company’s customer service team can be reached via calls, live chat, and emails.
              They will acknowledge the customer’s issue and capture the same in the appropriate system.
            </p>
            <p className="_336Oo">
              The Company has a defined turnaround time for each process and this time will be
              disclosed basis the conversation on a topic. For us to provide you with the best customer experience,
              and for us to maintain efficiency in customer support and care functions, we sincerely urge you to
              follow the escalation protocol mentioned below.
            </p>
          </>
        }
      />

      <Level
        title="Level 1: Customer Support:"
        content={
          <p className="_336Oo">
            You can contact our customer service team via a call to 7666100300 or chat on the app or
            the website or send an email to care@pharmpe.in which provides the online resolution to your
            queries/complaints across channels. The team will respond to your concern/query within 24 business hours
            from receipt of your query/concern via the 3 different channels available to you. An escalation matrix
            is available, in each communication channel, for you to speak to an agent’s linear supervisors, as and
            when required. Please use this option to ask for help in resolving your query.
          </p>
        }
      />

      <Level
        title="Level 2: Grievance Officer"
        content={
          <p className="_336Oo">
            If your query remains unresolved for a period of 7 days after you’ve reached out to our
            Level 1 Customer support, you can escalate the matter to our Grievance Officer. You can contact
            our <span className="_2NJzs">Grievance Officer - Mr. Himanshu</span> at <span className="_2NJzs">grievance-officer@pharmpe.in</span> with the details of your interactions with
            our customer support team through Level 1. We will respond within 48 business hours from the date of
            receipt of your email. We assure you that we will strive to resolve your queries at the earliest and in
            any event, within the timelines prescribed under applicable laws.
          </p>
        }
      />

      <p className="_336Oo _2yAP-">
        4. While we strive to address all grievances internally, we acknowledge that
        certain issues may be best resolved directly between you and the Retail Pharmacies/Labs. In such cases, We
        will facilitate this process by forwarding your grievance to the relevant Retail Pharmacies/Labs to ensure
        a prompt and effective resolution. However, our Grievance Officer shall continue to serve as the primary
        point of contact for any concerns related to the services provided on our platform.
      </p>

      <div className="_39Hj5 _1tuOG _2bORD">DISCLAIMERS</div>
      <ul className="_3hQOt">
        <li>The Company DOES NOT solicit confidential details like your OTP/CVV/PIN/Card Number either through
          Calls/SMS/WhatsApp/Surveys/mail/Link or any other means. Please report such suspicious activities to
          care@pharmpe.in
        </li>
        <li>Grievance Redressal cell working window: Monday to Friday (9:00 a.m. to 6:00 p.m.)</li>
        <li>26th January, 15th August, 2nd October, and major festivals in India will be considered as
          non-business days.
        </li>
        <li>The Company will review the policy from time to time and modify/amend the policy, in line with
          regulatory guidelines and other applicable laws, to suit the business needs.
        </li>
        <li>The Company relies on its retail and payment partners. Thus, in rare cases, you might see a delay in
          resolution, due to reasons beyond our control, once we pass the investigation to them. However, please
          be rest assured that we will try our best not to exceed resolution timelines.
        </li>
        <li>Any grievances related to non-returnable products will be adhered to as per the return policy of the
          Company.
        </li>
        <li>Grievances, where customers have shared their details to unauthorized people leading to financial
          leaks, are not covered by the policy (Scam webpages, Numbers, Callers, etc.).
        </li>
      </ul>
    </div>
  );
};

const Section = ({ title, content }) => (
  <div>
    <div className="_39Hj5">{title}</div>
    <div className="_3s60Z">{content}</div>
  </div>
);

const Level = ({ title, content }) => (
  <div>
    <div className="_39Hj5"><span className="_1tuOG">{title}</span></div>
    <div className="_3s60Z">{content}</div>
  </div>
);

export default Blog;
