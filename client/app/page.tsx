import ThemeProvider from "./components/Theme/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";

export default function Home() {
  return (
    <>
      <ThemeProvider>
        <Navbar />

        <MainPage />

        <Footer />
      </ThemeProvider>
    </>
  );
}
