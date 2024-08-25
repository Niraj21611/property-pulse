"use client";

import PropertyCard from "@/components/PropertyCard";
import SearchPropertyForm from "@/components/SearchPropertyForm";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowAltCircleLeft, FaArrowLeft } from "react-icons/fa";

function SearchResultsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setSearchResults(data);
          //   toast.success(`Found ${data.length} results`);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSearchResults();
  }, [location, propertyType]);

  if (isLoading) return <Spinner loading={isLoading} />;

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchPropertyForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            {" "}
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {searchResults.length === 0 ? (
            <p className="text-center">No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchResults.map((property) => (
                //   <div key={property._id}>{property.name}</div>
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchResultsPage;
