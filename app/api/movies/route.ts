import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const movies = [
    {
      title: "Movie 1",
      year: 2001,
      poster: "https://i.ibb.co/xLCVQw0/poster1.png",
    },
    {
      title: "Movie 2",
      year: 2002,
      poster: "https://i.ibb.co/2SBwcVz/poster2.png",
    },
    {
      title: "Movie 3",
      year: 2003,
      poster: "https://i.ibb.co/2SBwcVz/poster2.png",
    },
    {
      title: "Movie 4",
      year: 2004,
      poster: "https://i.ibb.co/YNwsxR2/poster3.png",
    },
    {
      title: "Movie 5",
      year: 2005,
      poster: "https://i.ibb.co/xLCVQw0/poster1.png",
    },
    {
      title: "Movie 6",
      year: 2006,
      poster: "https://i.ibb.co/2SBwcVz/poster2.png",
    },
    {
      title: "Movie 7",
      year: 2007,
      poster: "https://i.ibb.co/2SBwcVz/poster2.png",
    },
    {
      title: "Movie 8",
      year: 2008,
      poster: "https://i.ibb.co/YNwsxR2/poster3.png",
    },
  ];

  let response = {
    status: true,
    data: movies,
  };
  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const newMovie = await request.json();

  return new NextResponse(JSON.stringify(newMovie), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
