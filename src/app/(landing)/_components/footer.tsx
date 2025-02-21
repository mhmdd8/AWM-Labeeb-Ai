import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 text-gray-500 text-xs motion-preset-slide-up">
      <Link href={"/team"}>AWM Team</Link> | Datathon 2025
    </div>
  );
}
