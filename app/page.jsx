import FeaturedProperty from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";

function Homepage() {
  return (
    <>
      <Hero />
      <InfoBoxes/>
      <FeaturedProperty/>
      <HomeProperties/>
    </>
  );
}

export default Homepage;
