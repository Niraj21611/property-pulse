import "@/assets/styles/globals.css";

export const metadata = {
    title: "PropertyPulse | Find the perfect Rental property",
    description: "Find your dream rental property",
    keywords: "rental, find rentals, find properties"
}

function layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}

export default layout;
