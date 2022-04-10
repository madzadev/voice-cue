import ContentWrapper from "../components/ContentWrapper";
import MetaTags from "../components/MetaTags";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MetaTags />
      <Header />
      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>
      <Footer />
    </>
  );
}

export default MyApp;
