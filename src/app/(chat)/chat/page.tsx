import ChatBot from "@/app/(chat)/chat/_components/chat-bot";
import Footer from "@/app/(landing)/_components/footer";

// TODO:
// focus on the most critcal ideas that solve problem and show it on the presenation
// structure the code of tooling rendering
// strict the bot to only answers relted questions to npc
// add rag with direction to data sets and statstics
// add voice command and speech
// make sure that tools are working fine and fetching data the right way check open source like gemini gen ui
// make sure to discover the data sets from data.gov and visualize it
// spend more time into analysis and finding problems
// generate pdfs to download
// add auth
// presist the data later
// get ideas from https://vercel.com/templates/next.js/nextjs-ai-chatbot
// get ideas from morphic and agents
// add popover for the bot cabalites and user guidance
// text to speech: https://www.youtube.com/watch?v=WobPITF7Zb8

export default function Chat() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ChatBot />
      <Footer />
    </div>
  );
}
