import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "PropertyPulse | Find the perfect Rental property",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

function layout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </html>
    </AuthProvider>
  );
}

export default layout;
