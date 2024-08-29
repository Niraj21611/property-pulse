import Properties from "@/components/Properties";
import SearchPropertyForm from "@/components/SearchPropertyForm";


function PropertiesPage() {

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchPropertyForm />
        </div>
      </section>
      <Properties/>
    </>
  );
}

export default PropertiesPage;
