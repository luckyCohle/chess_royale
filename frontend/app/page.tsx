import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <Image
              src="/chess-board_sm.png"
              alt="Small chess board"
              width={560} // Adjusted for responsiveness
              height={560}
              className="w-full max-w-[35rem] h-auto"
            />
          </div>

          {/* Text and Button Section */}
          <div className="text-center md:text-left">
            <p className="text-3xl md:text-5xl font-bold text-white">
              Welcome to Chess Royale
            </p>
            <p className="text-xl md:text-3xl font-semibold text-white mt-2">
              Play chess online on the #3 site
            </p>

            {/* Play Online Button */}
            <div className="mt-6 flex justify-center md:justify-start">
              <Link href={"/game"}>
                  <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 w-full md:w-auto"
                      aria-label="Play Online"                
              >
                Play Online
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
