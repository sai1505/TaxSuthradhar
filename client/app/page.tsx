import ThemeProvider from "./components/Theme/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <ThemeProvider>
        <Navbar />

        <div className="p-10">Your content here</div>

        <Footer />
      </ThemeProvider>
    </>
  );
}
