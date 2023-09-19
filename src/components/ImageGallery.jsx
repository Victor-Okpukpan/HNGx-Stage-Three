/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";

/**
 * ImageGallery is a component that displays a grid of images with drag-and-drop functionality
 * and a search feature based on tags.
 *
 * @param {Object[]} images - An array of image objects to be displayed in the gallery.
 * @param {string} images[].id - A unique identifier for the image.
 * @param {Object} images[].src - An object containing image source URLs (e.g., { src: 'image-url.jpg' }).
 * @param {string[]} images[].tags - An array of tags associated with the image for searching.
 *
 * @returns {JSX.Element} The image gallery component.
 */

export default function ImageGallery({ images }) {
  const [imageOrder, setImageOrder] = useState(images || []);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // New state for the search term
  const [filteredImages, setFilteredImages] = useState(images || []);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(delay);
  }, [images]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("imageIndex", index);
    setDraggedIndex(index);
  };

  const handleTouchStart = (e, index) => {
    // Store the index of the touched element for touch-based drag-and-drop
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    const droppedIndex = e.dataTransfer.getData("imageIndex");
    if (droppedIndex === "") return;

    const updatedImageOrder = [...filteredImages];
    const [draggedImage] = updatedImageOrder.splice(droppedIndex, 1);
    updatedImageOrder.splice(targetIndex, 0, draggedImage);

    // setImageOrder(updatedImageOrder);
    setFilteredImages(updatedImageOrder);
  };

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    // Filter images based on search term
    if (value === "") {
      // If search term is empty, show all images
      setFilteredImages(imageOrder);
    } else {
      const filtered = imageOrder.filter((image) =>
        image.tags.some((tag) =>
          tag.toLowerCase().includes(value.toLowerCase())
        )
      );
      // Check if there are images with the exact matching tag
      const exactMatch = filtered.filter((image) =>
        image.tags.some((tag) => tag.toLowerCase() === value.toLowerCase())
      );

      if (filtered.length === 0) {
        setNoResults(true); // Set the "No results found" message flag
      } else {
        setNoResults(false); // Reset the flag if there are results
      }
      // If there are exact matches, show all images with the matching tag
      // Otherwise, show the partially matched images
      setFilteredImages(exactMatch.length ? exactMatch : filtered);
    }
  };

  return (
    <>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by tags..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="w-full border-b outline-none"
        />
      </div>
      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 md:gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="h-32 sm:h-40 md:h-56 w-full bg-gray-200 animate-pulse rounded overflow-hidden"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 md:gap-5">
          {noResults ? (
            <div className=" w-full">
              <p className="md:text-3xl text-sm font-bold w-full">
                No Results Found
              </p>
            </div>
          ) : (
            filteredImages.map((image, index) => (
              <div
                key={image.id}
                draggable
                onTouchStart={(e) => handleTouchStart(e, index)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="h-32 sm:h-40 md:h-56 w-full cursor-grab rounded overflow-hidden"
              >
                <img
                  src={image.src.src}
                  loading="lazy"
                  alt="picture"
                  className="w-full h-full object-cover block"
                />
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
