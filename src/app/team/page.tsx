import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Code,
  Palette,
  ClipboardList,
  Megaphone,
  BarChart,
  ShieldCheck,
} from "lucide-react";

const teamMembers = [
  { name: "Mohamed", role: "Full-stack Developer", Icon: Code },
  { name: "Mohamed", role: "Full-stack Developer", Icon: Code },
  { name: "Mohamed", role: "Cybersecurity Specialist", Icon: ShieldCheck },
  { name: "Abdulrahman", role: "Data Scientist", Icon: BarChart },
  { name: "Abdulrahman", role: "Data Scientist", Icon: BarChart },
  { name: "Waleed", role: "Data Scientist", Icon: BarChart },
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        <img
          src="https://i.ibb.co/bMhG5T2z/image.png"
          alt="AWM Team Logo"
          className="mx-auto mb-4 h-20 w-auto"
        />
        Meet <span className="text-primary">AWM</span> Team
      </h1>
      <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
        <span className="">AWM</span> stands for our initiatives: Action,
        Wisdom, and Momentum. We are a dedicated team working together to bring
        innovative solutions to life.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-e border-t gap-0">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="bg-white shadow-none rounded-none border-0 border-s border-b"
          >
            <CardContent className="flex flex-col items-center p-6">
              <div className="w-16 h-16 mb-2 flex items-center justify-center rounded-full">
                <member.Icon className="w-12 h-12 text-neutral-600" />
              </div>
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-sm text-neutral-600 mb-3">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
