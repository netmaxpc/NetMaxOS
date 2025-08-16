import React, { useEffect, useMemo, useRef, useState } from "react";

// ---------- Types ----------
type AppId = "notes" | "terminal" | "ai";

interface Win {
  id: string;
  app: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
}

// ---------- Theme tokens ----------
const theme = {
  bg: "#0b0b0d",
  bgAlt: "#121216",
  deepRed: "#8b0a12",
  deepRed2: "#A10E17",
  steel: "#A7B0B7",
  steelDark: "#707983",
  text: "#EAEAF0",
  textDim: "#A3A3AC",
  glow: "rgba(255, 20, 40, 0.35)",
};

function cx(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ---------- Voice Controls Hook ----------
function useVoiceControls(
  onOpenApp: (app: AppId) => void,
  onCloseTop: () => void,
  onToggleStart: () => void
) {
  const [listening, setListening] = useState(false);
  const [lastHeard, setLastHeard] = useState("");
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!(window as any).webkitSpeechRecognition && !(window as any).SpeechRecognition) return;
    setSupported(true);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      setLastHeard(transcript);

      if (transcript.includes("open notes") || transcript.includes("notes")) onOpenApp("notes");
      else if (transcript.includes("open terminal") || transcript.includes("terminal")) onOpenApp("terminal");
      else if (transcript.includes("open ai") || transcript.includes("assistant")) onOpenApp("ai");
      else if (transcript.includes("close")) onCloseTop();
      else if (transcript.includes("start menu") || transcript.includes("menu")) onToggleStart();
    };

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    const startListening = () => {
      try {
        recognition.start();
      } catch (e) {
        console.warn("Speech recognition error:", e);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault();
        if (listening) {
          recognition.stop();
        } else {
          startListening();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      recognition.stop();
    };
  }, [onOpenApp, onCloseTop, onToggleStart]);

  return { listening, lastHeard, supported };
}

// ---------- AI Assistant Function ----------
async function aiAsk(prompt: string): Promise<string> {
  // Placeholder - replace with your LLM endpoint
  // Example: Ollama integration
  /*
  const r = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      model: "llama3.1:8b",
      messages: [{role: "user", content: prompt}]
    })
  });
  const data = await r.json();
  return data.message.content;
  */
  
  return `AI Response to: "${prompt}"\n\nThis is a placeholder response. To enable real AI, replace the aiAsk() function with a call to your local LLM service (like Ollama) or API endpoint.`;
}

// ---------- App Components ----------
function NotesApp({ onClose }: { onClose: () => void }) {
  const [notes, setNotes] = useState("Welcome to NetMaxOS Notes!\n\nThis is your personal note-taking space.");
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-medium" style={{ color: theme.text }}>Notes</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-lg leading-none">×</button>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="flex-1 p-3 bg-transparent border-none outline-none resize-none text-sm"
        style={{ color: theme.text }}
        placeholder="Start typing your notes..."
      />
    </div>
  );
}

function TerminalApp({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState(["NetMaxOS Terminal v1.0", "Type 'help' for available commands."]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, `> ${cmd}`];
    
    switch (cmd.toLowerCase().trim()) {
      case "help":
        newHistory.push("Available commands: help, clear, date, echo [text]");
        break;
      case "clear":
        setHistory(["NetMaxOS Terminal v1.0"]);
        setInput("");
        return;
      case "date":
        newHistory.push(new Date().toString());
        break;
      default:
        if (cmd.startsWith("echo ")) {
          newHistory.push(cmd.slice(5));
        } else {
          newHistory.push(`Command not found: ${cmd}`);
        }
    }
    
    setHistory(newHistory);
    setInput("");
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col h-full font-mono text-sm">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-medium" style={{ color: theme.text }}>Terminal</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-lg leading-none">×</button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        {history.map((line, i) => (
          <div key={i} className="mb-1" style={{ color: theme.text }}>{line}</div>
        ))}
        <div className="flex items-center">
          <span style={{ color: theme.deepRed2 }}>$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(input);
              }
            }}
            className="flex-1 bg-transparent border-none outline-none ml-1"
            style={{ color: theme.text }}
          />
        </div>
      </div>
    </div>
  );
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

function AIApp({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await aiAsk(input);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-medium" style={{ color: theme.text }}>AI Assistant</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-lg leading-none">×</button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <div className="text-2xl mb-2">🤖</div>
            <div>Ask me anything!</div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === "user" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white/10 text-gray-100"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-gray-100 p-3 rounded-lg text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-white/10">
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-sm outline-none focus:border-white/40"
            style={{ color: theme.text }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded text-sm transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Main OS ----------
export default function NetMaxOS() {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const [wins, setWins] = useState<Win[]>([]);
  const [zTop, setZTop] = useState(10);
  const [startOpen, setStartOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const { listening, lastHeard, supported } = useVoiceControls(
    (app) => openApp(app),
    () => closeTop(),
    () => setStartOpen((s) => !s)
  );

  // Splash screen state
  const [splashOpen, setSplashOpen] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setSplashOpen(false), 2200);
    const skip = () => setSplashOpen(false);
    window.addEventListener('keydown', skip);
    return () => { clearTimeout(t); window.removeEventListener('keydown', skip); };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  function newWin(app: AppId): Win {
    return {
      id: Math.random().toString(36).slice(2),
      app,
      title: app === "notes" ? "Notes" : app === "terminal" ? "Terminal" : "AI Assistant",
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 100,
      w: app === "terminal" ? 600 : 500,
      h: app === "terminal" ? 400 : 450,
      z: zTop + 1,
      minimized: false,
    };
  }

  function openApp(app: AppId) {
    const existing = wins.find(w => w.app === app && !w.minimized);
    if (existing) {
      focusWin(existing.id);
      return;
    }
    const win = newWin(app);
    setWins(prev => [...prev, win]);
    setZTop(win.z);
  }

  function closeTop() {
    const topWin = wins.reduce((top, w) => w.z > top.z ? w : top, wins[0]);
    if (topWin) closeWin(topWin.id);
  }

  function closeWin(id: string) {
    setWins(prev => prev.filter(w => w.id !== id));
  }

  function focusWin(id: string) {
    const newZ = zTop + 1;
    setZTop(newZ);
    setWins(prev => prev.map(w => w.id === id ? { ...w, z: newZ } : w));
  }

  const desktopWallpaper = useMemo(() => ({
    backgroundImage: `radial-gradient(1200px 800px at 60% 20%, ${theme.deepRed2}22, transparent 60%), radial-gradient(900px 700px at 30% 70%, ${theme.deepRed}22, transparent 60%), radial-gradient(1200px 900px at 50% 50%, ${theme.steelDark}10, transparent 65%)`,
    backgroundColor: theme.bg,
  } as React.CSSProperties), []);

  if (showSplash) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black" style={{background: theme.bg}}>
        <img src="/netmax-logo.svg" alt="NetMax Logo" className="h-32 w-auto animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" style={desktopWallpaper}>
      {/* Splash Screen */}
      {splashOpen && (
        <div
          className="absolute inset-0 z-[1000] flex flex-col items-center justify-center select-none"
          style={{ background: `radial-gradient(900px 600px at 50% 40%, ${theme.deepRed}11, transparent 60%), #0a0a0d` }}
          onClick={() => setSplashOpen(false)}
        >
          <img src="/netmax-logo.svg" alt="NetMaxOS" className="h-28 w-28 object-contain drop-shadow" />
          <div className="mt-4 text-gray-200 text-lg tracking-wide">NetMaxOS</div>
          <div className="mt-3 h-1 w-40 rounded bg-white/10 overflow-hidden">
            <div className="h-full w-1/3" style={{ background: theme.deepRed, animation: 'load 1.8s ease-in-out infinite' }} />
          </div>
          <div className="mt-2 text-[11px] text-gray-400">click or press any key to skip</div>
          <style>{`@keyframes load { 0% { transform: translateX(-100%);} 100% { transform: translateX(300%);} }`}</style>
        </div>
      )}

      {/* Embossed/engraved NetMax logo watermark */}
      <div
        className="pointer-events-none select-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url('/netmax-logo.svg'), linear-gradient(transparent, transparent)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 34%",
          backgroundSize: "min(48vw, 640px) auto",
          filter: "drop-shadow(0 2px 0 #0005) contrast(120%) grayscale(60%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Desktop layer */}
      <div ref={desktopRef} className="relative w-full h-full">
        {/* Open windows */}
        {wins.map((win) => (
          <div
            key={win.id}
            className="absolute border border-white/20 rounded-lg overflow-hidden shadow-2xl"
            style={{
              left: win.x,
              top: win.y,
              width: win.w,
              height: win.h,
              zIndex: win.z,
              background: theme.bgAlt,
            }}
            onClick={() => focusWin(win.id)}
          >
            <div className="h-full">
              {win.app === "notes" && <NotesApp onClose={() => closeWin(win.id)} />}
              {win.app === "terminal" && <TerminalApp onClose={() => closeWin(win.id)} />}
              {win.app === "ai" && <AIApp onClose={() => closeWin(win.id)} />}
            </div>
          </div>
        ))}

        {/* Start Menu */}
        {startOpen && (
          <div
            className="absolute bottom-12 left-2 w-64 rounded-lg border border-white/20 shadow-2xl overflow-hidden"
            style={{ background: theme.bgAlt, zIndex: 1000 }}
          >
            <div className="p-4">
              <div className="text-lg font-medium mb-4" style={{ color: theme.text }}>NetMaxOS</div>
              <div className="space-y-2">
                <button
                  onClick={() => { openApp("notes"); setStartOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-white/10 transition-colors"
                  style={{ color: theme.text }}
                >
                  📝 Notes
                </button>
                <button
                  onClick={() => { openApp("terminal"); setStartOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-white/10 transition-colors"
                  style={{ color: theme.text }}
                >
                  💻 Terminal
                </button>
                <button
                  onClick={() => { openApp("ai"); setStartOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-white/10 transition-colors"
                  style={{ color: theme.text }}
                >
                  🤖 AI Assistant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Taskbar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 border-t border-white/20 flex items-center px-2 space-x-2"
          style={{ background: theme.bgAlt }}
        >
          <button
            onClick={() => setStartOpen(!startOpen)}
            className={cx(
              "flex items-center space-x-2 px-3 py-2 rounded transition-colors",
              startOpen ? "bg-white/20" : "hover:bg-white/10"
            )}
            style={{ color: theme.text }}
          >
            <img src="/netmax-logo.svg" alt="NetMax" className="w-5 h-5" />
            <span className="text-sm font-medium">NetMax</span>
          </button>
          
          <div className="flex-1" />
          
          {wins.map((win) => (
            <button
              key={win.id}
              onClick={() => focusWin(win.id)}
              className="px-3 py-1 rounded text-sm hover:bg-white/10 transition-colors"
              style={{ color: theme.textDim }}
            >
              {win.title}
            </button>
          ))}
        </div>

        {/* Voice HUD */}
        {supported && (
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div
              className={cx(
                "px-3 py-2 rounded-lg text-sm border",
                listening ? "border-green-500 bg-green-500/20" : "border-white/20 bg-black/20"
              )}
              style={{ color: theme.text }}
            >
              {listening ? "🎤 Listening..." : "Press F1 to talk"}
            </div>
            {lastHeard && (
              <div
                className="px-3 py-2 rounded-lg text-sm border border-white/20 bg-black/20 max-w-xs truncate"
                style={{ color: theme.textDim }}
              >
                "{lastHeard}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}