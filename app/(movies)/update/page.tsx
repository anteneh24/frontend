"use client";
// Import necessary modules
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function Create() {
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialTitle = urlParams.get("title");
    const initialYear = urlParams.get("year");
    const initialPoster = urlParams.get("poster");

    // Set the initial state based on the query parameters
    setTitle(initialTitle || "");
    setPublishingYear(initialYear || "");
    // Assuming initialPoster is a valid file URL
    setFile(
      initialPoster ? new File([initialPoster], "uploadedPoster.jpg") : null
    );
  }, []);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (file) formData.append("poster", file);
      formData.append("title", title);
      formData.append("publishing_year", publishingYear);

      const response = await axios.put(
        "http://ec2-16-171-35-75.eu-north-1.compute.amazonaws.com:3000/movie/updateMovie",
        formData
      );
      if (response.data.status) {
        // Set success message to be displayed
        setSuccessMessage(response.data.message);
        // You can also reset form fields or perform other actions upon success
      }
      // Handle the response as needed
      console.log(response.data);
    } catch (error: any) {
      console.error("Error in form submission:", error.message);
      // Handle error
    }
  };

  return (
    <div className="w-full flex flex-col px-8 md:px-0">
      <h2 className="text-5xl pb-32 font-semibold">Create a new movie</h2>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-2 gap-16">
          <div className="w-full h-[400px] bg-card row-span-3 order-2 md:order-1">
            <label
              htmlFor="fileInput"
              className="h-full flex items-center justify-center"
            >
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="selected-image"
                  width={400}
                  height={400}
                />
              ) : (
                <p>Drop an image here or click to select</p>
              )}
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="flex w-full md:w-[350px] flex-col gap-6 order-1 md:order-2">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-input p-3 px-5 rounded-xl text-white placeholder-white"
              required
            />
            <input
              type="number"
              placeholder="Publishing year"
              value={publishingYear}
              onChange={(e) => setPublishingYear(e.target.value)}
              className="w-full md:w-2/3 bg-input p-3 px-5 rounded-xl text-white placeholder-white"
              required
            />
          </div>
          <div className="flex gap-4 row-span-2 order-3 md:order-3">
            {/* Use the Link component for navigation */}
            <Link
              href="/"
              className="h-fit bg-transparent border border-whitew-full py-4 rounded-xl"
            >
              <span className="px-8">Cancel</span>
            </Link>
            <button
              type="submit"
              className="h-fit bg-primary text-white w-full py-4 rounded-xl"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      {successMessage && (
        <div className="mt-4 p-2 bg-green-500 text-white rounded-md">
          {successMessage}
        </div>
      )}
    </div>
  );
}
