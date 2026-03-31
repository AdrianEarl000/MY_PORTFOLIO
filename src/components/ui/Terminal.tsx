"use client";

import React, { useState, useRef, useEffect } from "react";

type HistoryItem = {
  id: number;
  type: "command" | "response" | "system";
  content: React.ReactNode;
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 0, type: "system", content: "Starting AdrianOS v1.0.0..." },
    { id: 1, type: "system", content: "Loading modules... Done." },
    { id: 2, type: "response", content: "Welcome! Type 'help' to see available commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      setInput("");

      // Add the user's command to history
      const newHistory: HistoryItem[] = [
        ...history,
        { id: Date.now(), type: "command", content: cmd },
      ];

      // Generate the response
      let response: React.ReactNode = "";
      switch (cmd) {
        case "help":
          response = (
            <div className="text-txt-3">
              Available commands:<br />
              <span className="text-teal">about</span>    - Learn more about me<br />
              <span className="text-teal">skills</span>   - View my tech stack<br />
              <span className="text-teal">contact</span>  - Get my email<br />
              <span className="text-teal">clear</span>    - Clear the terminal
            </div>
          );
          break;
        case "about":
          response = "I'm Adrian Earl, a Full Stack Developer based in San Francisco. I build performant, accessible, and maintainable applications.";
          break;
        case "skills":
          response = "Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express, PostgreSQL, MongoDB\nTools: Git, Docker, AWS";
          break;
        case "contact":
          response = (
            <span>
              Reach out to me at <a href="mailto:hello@adrianearl.com" className="text-accent-2 hover:underline">hello@adrianearl.com</a>
            </span>
          );
          break;
        case "clear":
          setHistory([]);
          return; // Exit early to not add a response
        case "sudo":
          response = "Nice try. This incident will be reported. 🚨";
          break;
        case "":
          setHistory(newHistory);
          return;
        default:
          response = `Command not found: ${cmd}. Type 'help' for available commands.`;
      }

      setHistory([...newHistory, { id: Date.now() + 1, type: "response", content: response }]);
    }
  };

  return (
    <div 
      className="w-full h-[400px] bg-[#0D0D12] border border-border-2 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-[13px] sm:text-[14px]"
      onClick={handleTerminalClick}
    >
      {/* Terminal Header (Mac Style) */}
      <div className="h-10 bg-[#1A1A24] border-b border-border-2 flex items-center px-4 gap-2 flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        <div className="flex-1 text-center text-txt-3 text-xs opacity-70">
          guest@adrian-portfolio ~
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 flex-1 overflow-y-auto text-txt-2 whitespace-pre-wrap">
        {history.map((item) => (
          <div key={item.id} className="mb-2">
            {item.type === "command" && (
              <div className="flex items-center gap-2 text-txt">
                <span className="text-teal">➜</span>
                <span className="text-accent-2">~</span>
                <span>{item.content}</span>
              </div>
            )}
            {item.type === "system" && <div className="text-txt-3 opacity-70">{item.content}</div>}
            {item.type === "response" && <div>{item.content}</div>}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-txt mt-2">
          <span className="text-teal">➜</span>
          <span className="text-accent-2">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-txt font-mono shadow-none"
            spellCheck="false"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}