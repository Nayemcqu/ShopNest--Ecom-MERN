import '../styles/disclaimer.css'

export default function Disclaimer() {
  return (
    <div className="disclaimer-page">
      <div className="disclaimer-container">

        <h1>Disclaimer</h1>

        <p className="disclaimer-intro">
          Welcome to ShopNest. The information provided on this website is
          intended for general informational purposes only.
        </p>

        <section className="disclaimer-section">
          <h2>General Information</h2>
          <p>
            ShopNest makes every effort to ensure that the information,
            product descriptions, prices, and other content displayed on this
            website are accurate and up to date. However, we do not guarantee
            that all information is complete, accurate, or error-free.
          </p>
        </section>

        <section className="disclaimer-section">
          <h2>Product Information</h2>
          <p>
            Product images are provided for illustration purposes and may
            sometimes differ slightly from the actual product. Product
            availability, specifications, colours, sizes, and prices may
            change without prior notice.
          </p>
        </section>

        <section className="disclaimer-section">
          <h2>Pricing</h2>
          <p>
            While we make reasonable efforts to display accurate prices,
            errors may occasionally occur. ShopNest reserves the right to
            correct pricing errors and update product information at any
            time.
          </p>
        </section>

        <section className="disclaimer-section">
          <h2>External Links</h2>
          <p>
            Our website may contain links to third-party websites or services.
            ShopNest is not responsible for the content, availability, or
            privacy practices of external websites.
          </p>
        </section>

        <section className="disclaimer-section">
          <h2>Limitation of Liability</h2>
          <p>
            ShopNest is not responsible for any loss or damage resulting from
            reliance on information provided on this website, except where
            such liability cannot be excluded under applicable law.
          </p>
        </section>

        <section className="disclaimer-section">
          <h2>Changes to This Disclaimer</h2>
          <p>
            We may update this disclaimer from time to time to reflect
            changes to our website, services, or legal requirements. Any
            changes will be posted on this page.
          </p>
        </section>

        <section className="disclaimer-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this disclaimer, please contact
            the ShopNest team.
          </p>
        </section>

        <p className="disclaimer-updated">
          Last updated: September 2026
        </p>

      </div>
    </div>
  )
}