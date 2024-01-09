"use client";

import Movie from "./_components/Movie";
import addIcon from "@/assets/icons/add.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Movie = {
  id: string;
  title: string;
  year: number;
  poster: any;
};

async function getMovies() {
  const res = await fetch(
    "http://ec2-16-171-35-75.eu-north-1.compute.amazonaws.com:3000/movie/movies"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log(JSON.stringify(res.json));
  return res.json();
}

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const moviesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("data1");
    const fetchData = async () => {
      const { data } = await getMovies();
      console.log("data", data);

      setMovies(data);
    };

    fetchData();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil((movies?.length || 0) / moviesPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex w-full h-full justify-center flex-col items-center px-8 md:px-0">
      {movies && currentMovies?.length > 0 ? (
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <h2 className="text-5xl font-semibold">My movies</h2>
              <Link href="/create">
                <Image src={addIcon} alt="add-movie" />
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-base font-bold">Logout</p>
              <Link href="/signin">
                <Image src={logoutIcon} alt="logout" />
              </Link>
            </div>
          </div>
          <div className="grid pt-32 grid-cols-2 md:grid-cols-3 gap-5">
            {currentMovies?.map((movie: Movie) => (
              <Movie {...movie} key={movie.title} />
            ))}
          </div>
          <div className="py-32 flex gap-8 items-center">
            <div onClick={handlePrevPage} style={{ cursor: "pointer" }}>
              Prev
            </div>
            <div className="bg-primary px-3 rounedd-xl">{currentPage}</div>
            <div onClick={handleNextPage} style={{ cursor: "pointer" }}>
              Next
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-10 justify-center items-center">
          <h2 className="text-5xl font-semibold pt-52 text-center">
            Your movie list is empty
          </h2>
          <Link href="/create">
            <button className="bg-primary text-white w-full py-4 px-6 rounded-xl">
              Add a new movie
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
