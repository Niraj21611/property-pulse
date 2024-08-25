import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark } from "react-icons/fa";

function BookmarkButton({ property }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [bookmarked, setBookMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkBookmark() {
      if (!userId) {
        setIsLoading(false);
        return;
      }


      try {
        const res = await fetch(
          `/api/bookmark/check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              propertyId: property._id,
            }),
          }
        );

        if (res.status === 200) {
          const data = await res.json();
          setBookMarked(data.isBookmarked);
          console.log(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    checkBookmark();
  }, [property._id, userId]);

  async function handleClick() {
    if (!userId) {
      toast.error("You need to sign in beforehand");
    }
    if (userId === property.owner) {
      toast.error("Property listed by user cannot be saved");
      return;
    }

    try {
      if (!userId) {
        toast.error("You need to sign in to bookmark a property");
        return;
      }

      const res = await fetch(`/api/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        toast.success(data.message);
        setBookMarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <p>Loading....</p>;

  return !bookmarked ? (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  );
}

export default BookmarkButton;
