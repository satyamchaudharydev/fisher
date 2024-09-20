import { FisherYatesShuffle } from "@/components/fisher-yates-shuffle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-">
      <FisherYatesShuffle />
    </div>
  );
}
