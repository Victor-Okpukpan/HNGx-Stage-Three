import { getServerSession } from "next-auth";

import {
  authOptions,
  loginIsRequiredServer,
} from "../api/auth/[...nextauth]/route";
import LogOutButton from "@/components/LogOutButton";
import ImageGallery from "@/components/ImageGallery";
import { images } from "../helpers/constants";
/**
 * Gallery page component.
 * This page displays a gallery of images and user information.
 *
 * @returns {JSX.Element} The home page component.
 */
export default async function GalleryPage() {
  const session = await getServerSession(authOptions);
  // Redirect unauthenticated users to the sign in page.
  await loginIsRequiredServer();

  return (
    <div className="max-w-screen-lg mx-auto px-3 xl:px-0 w-full h-full">
      <header className="flex items-center space-x-5 justify-between py-2">
        <p className="sm:text-lg font-medium">Welcome to the Gallery, {session?.user.name}.</p>
        <LogOutButton />
      </header>

      <p className="text-sm mt-10 text-gray-500">You can search for images with the following tags: Animals, Arts, Beauty, Buildings, Flowers, Furniture, Landscape, Utensils.</p>

      <section className="pt-10 w-full h-full">
        <ImageGallery images={images} />
      </section>

      <footer className="py-10">
        <p className="text-sm text-center text-gray-500">&copy; Image Gallery by Victor Okpukpan</p>
      </footer>
    </div>
  );
}
