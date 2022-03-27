import ContentWrapper from "../components/ContentWrapper";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>
      <Footer />
    </>
  );
}

export default MyApp;
