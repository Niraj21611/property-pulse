import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "PropertyPulse | Find the perfect Rental property",
    description: "Find your dream rental property",
    keywords: "rental, find rentals, find properties"
}

function layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}

export default layout;
