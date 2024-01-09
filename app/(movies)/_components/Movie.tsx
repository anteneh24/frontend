import Image from "next/image";
import Link from "next/link";

type MovieProps = {
  id: string;
  title: string;
  year: number;
  poster: string;
};

export default function Movie({ id, title, year, poster }: MovieProps) {
  return (
    <Link
      href={`/update?id=${id}&poster=${poster}&title=${title}&year=${year}`}
      className="bg-card flex flex-col gap-4 p-3 rounded-xl"
    >
      <div className="relative w-[266px] h-[400px] ">
        <Image
          src={poster}
          alt={title}
          className="rounded-xl w-full h-full"
          fill
        />
      </div>

      <h3 className="text-xl">{title}</h3>
      <p className="text-sm">{year}</p>
    </Link>
  );
}
