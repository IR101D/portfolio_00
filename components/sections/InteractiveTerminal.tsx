'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal as TerminalIcon,
  ChevronRight,
  Copy,
  Check,
  X,
  Maximize2,
  Minimize2,
  HelpCircle,
  Folder,
  File,
  Coffee
} from 'lucide-react';
import Card from '@/components/ui/Card';
import { cn } from '@/libs/utils';

type Command = {
  input: string;
  output: string[];
  type: 'success' | 'error' | 'info' | 'welcome';
};

const initialCommands: Command[] = [
  {
    input: 'welcome',
    output: [
      'Welcome to my interactive terminal!',
      'Type "help" to see available commands',
      'Type "clear" to clear the terminal',
      '',
      'Try exploring: about, skills, projects, contact',
    ],
    type: 'welcome',
  },
];

const availableCommands = [
  { command: 'help', description: 'Show all available commands' },
  { command: 'about', description: 'Learn more about me' },
  { command: 'skills', description: 'View my technical skills' },
  { command: 'projects', description: 'See my featured projects' },
  { command: 'experience', description: 'Check my work history' },
  { command: 'contact', description: 'Get my contact information' },
  { command: 'social', description: 'View my social media links' },
  { command: 'resume', description: 'Download my resume' },
  { command: 'clear', description: 'Clear the terminal screen' },
  { command: 'ls', description: 'List directory contents' },
  { command: 'pwd', description: 'Print working directory' },
  { command: 'whoami', description: 'Display current user' },
  { command: 'date', description: 'Show current date and time' },
  { command: 'echo [text]', description: 'Display a line of text' },
  { command: 'fun-fact', description: 'Get a random fun fact about me' },
  { command: 'coffee', description: 'Virtual coffee break!' },
];

const commandResponses: Record<string, string[]> = {
  about: [
    "I'm Ikram Romane, a Full-Stack Developer.",
    "I specialize in building scalable web applications with modern technologies.",
    "Passionate about clean code, performance optimization, and great UX.",
    "",
   // "When I'm not coding, I enjoy hiking, photography, and playing guitar.",
  ],
  skills: [
    "Frontend: React, Next.js, TypeScript, Tailwind CSS",
    "Backend: Node.js, Python, PostgreSQL, GraphQL",
    "DevOps: AWS, Docker, Kubernetes, CI/CD",
    "Tools: Git, Jest, Figma, VS Code",
    "",
    "Specialties: Performance optimization, system architecture, team leadership",
  ],
  projects: [
    "Featured Projects:",
    "  • E-Commerce Platform - Full-stack with real-time features",
    "  • Task Management App - Collaborative with WebSockets",
    "  • AI Content Generator - GPT-4 integration",
    "  • Fitness Tracking App - React Native with analytics",
    "",
    "View details in the Projects section above ↑",
  ],
  experience: [
    "2022-Present: Senior Full-Stack Developer at TechCorp Solutions",
    "2020-2021: Full-Stack Developer at Startup Innovators",
    "2018-2020: Frontend Developer at Digital Agency XYZ",
    "",
    "Check the Experience section for more details ↑",
  ],
  contact: [
    "Email: alex@example.com",
    "Phone: +1 (555) 123-4567",
    "Location: San Francisco, CA (Remote available)",
    "",
    "Use the contact form above to send me a message ↑",
  ],
  social: [
    "GitHub:   github.com/alexchen",
    "LinkedIn: linkedin.com/in/alexchen",
    "Twitter:  twitter.com/alexchen",
    "Dev.to:   dev.to/alexchen",
  ],
  resume: [
    "Downloading resume... (simulated)",
    "",
    "✅ Resume downloaded successfully!",
    "In a real scenario, this would trigger a PDF download.",
  ],
  ls: [
    "about.txt",
    "skills.md",
    "projects/",
    "experience.json",
    "contact.md",
    "resume.pdf",
    "social_links/",
  ],
  pwd: [
    "/home/alex/portfolio",
  ],
  whoami: [
    "alexchen",
  ],
  date: [
    new Date().toLocaleString(),
  ],
  'fun-fact': [
    "I once deployed a critical fix while hiking using my phone's hotspot!",
    "I've contributed to 50+ open source projects.",
    "I can solve a Rubik's cube in under 2 minutes.",
    "My first website was built with Notepad in 2010.",
  ],
  coffee: [
    "☕ Enjoying a virtual coffee break!",
    "",
    "        )  (",
    "         ( )",
    "       .______.",
    "      |      |]",
    "      \\      /",
    "       `----'",
    "",
    "Need a real coffee? Let's connect!",
  ],
};

export default function InteractiveTerminal() {
  const [commands, setCommands] = useState<Command[]>(initialCommands);
  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Focus input on click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output: string[] = [];
    let type: Command['type'] = 'info';

    // Clear command
    if (cmd === 'clear') {
      setCommands([]);
      setInput('');
      return;
    }

    // Help command
    if (cmd === 'help') {
      output = availableCommands.map(c => `${c.command.padEnd(20)} ${c.description}`);
      type = 'info';
    }
    // Echo command
    else if (cmd.startsWith('echo ')) {
      output = [cmd.substring(5)];
      type = 'info';
    }
    // Known commands
    else if (commandResponses[cmd]) {
      output = commandResponses[cmd];
      type = 'success';
    }
    // Unknown command
    else {
      output = [
        `Command not found: ${cmd}`,
        "Type 'help' to see available commands",
      ];
      type = 'error';
    }

    setCommands(prev => [...prev, { input: cmd, output, type }]);
    setInput('');
  };

  const copyToClipboard = () => {
    const text = commands
      .map(c => `$ ${c.input}\n${c.output.join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle tab for auto-complete
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = input.trim();
      const matchingCommand = availableCommands.find(c => 
        c.command.startsWith(currentInput)
      );
      if (matchingCommand) {
        setInput(matchingCommand.command + ' ');
      }
    }
    // Handle up/down arrow for command history (simplified)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const lastCommand = commands[commands.length - 1]?.input;
      if (lastCommand && lastCommand !== 'welcome') {
        setInput(lastCommand);
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interactive <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Terminal</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore my portfolio through a terminal interface. Type 'help' to get started!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className={cn(
            "p-0 overflow-hidden",
            isMaximized && "fixed inset-4 z-50 m-0 max-w-none"
          )}>
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
              <div className="flex items-center gap-3">
                <TerminalIcon className="w-5 h-5" />
                <span className="font-mono">portfolio-terminal</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Copy terminal content"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title={isMaximized ? "Restore down" : "Maximize"}
                >
                  {isMaximized ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="h-96 bg-gray-900 text-gray-100 font-mono p-6 overflow-y-auto"
              onClick={focusInput}
            >
              {/* Welcome Message */}
              <div className="mb-4">
                <div className="text-green-400">
                  <span className="text-cyan-400">visitor@portfolio</span>
                  <span className="text-yellow-400">:~$</span>
                  <span className="ml-2">Welcome to Alex Chen's Portfolio!</span>
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  Type 'help' to see available commands, or explore the sections above.
                </div>
              </div>

              {/* Command History */}
              <AnimatePresence>
                {commands.map((cmd, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4"
                  >
                    {/* Input Line */}
                    <div className="flex items-center mb-1">
                      <span className="text-green-400">
                        <span className="text-cyan-400">visitor@portfolio</span>
                        <span className="text-yellow-400">:~$</span>
                      </span>
                      <span className="ml-2 text-white">{cmd.input}</span>
                    </div>

                    {/* Output Lines */}
                    <div className={cn(
                      "ml-4",
                      cmd.type === 'error' && "text-red-400",
                      cmd.type === 'success' && "text-green-400",
                      cmd.type === 'info' && "text-blue-400",
                      cmd.type === 'welcome' && "text-yellow-400"
                    )}>
                      {cmd.output.map((line, lineIndex) => (
                        <div key={lineIndex} className="whitespace-pre-wrap">
                          {line}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Current Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-green-400">
                  <span className="text-cyan-400">visitor@portfolio</span>
                  <span className="text-yellow-400">:~$</span>
                </span>
                <div className="flex-1 flex items-center ml-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-white caret-green-400"
                    autoFocus
                    spellCheck="false"
                  />
                  <div className={cn(
                    "w-2 h-5 bg-green-400 ml-1",
                    cursorVisible ? "opacity-100" : "opacity-0"
                  )} />
                </div>
                <button type="submit" className="ml-2 text-gray-400 hover:text-white">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </form>

              {/* Hint */}
              <div className="mt-4 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Press Tab for auto-complete, ↑ for history</span>
                </div>
              </div>
            </div>

            {/* Terminal Footer */}
            <div className="px-6 py-3 bg-gray-800 text-gray-400 text-sm border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    <span>Available commands: {availableCommands.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4" />
                    <span>Commands executed: {commands.length}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  <span>Type 'coffee' for a break!</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Commands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <div className="text-center mb-4">
              <p className="text-gray-600 dark:text-gray-400">
                Try these commands:
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {['help', 'about', 'skills', 'projects', 'fun-fact'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setInput(cmd);
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-mono"
                >
                  $ {cmd}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}