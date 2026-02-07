import React, { useState } from "react";

// Types
type MessageType = "customer" | "agent" | "bookend" | "section";

interface ChatMessage {
  type?: MessageType;
  text?: string;
  timestamp?: string;
  section?: string;
  duration?: string;
  quality?: "High" | "Low";
}

// Mock Data
const sessionData = {
  id: "Y890KRTU000KF3bPBG",
  title: "Session: April 16, 2025, 9:01:14 AM",
  duration: "3 min, 24 sec",
  agentName: "Car Rental Service Agent",
  chatStartedAt: "9:01:14 AM",
  chatEndedAt: "9:04:38 AM",
};

const momentData = {
  intentId: "7GBHt000000KF3bPBG",
  question: "Question regarding cancellation policy",
  totalInteractions: "2 interactions",
  avgLatency: "134 ms",
  intentDuration: "1 min, 12 sec",
  agentName: "Car Rental Service Agent",
  topicsTriggered: ["Order Management"],
  intentTag: "Cancellation Request",
  actionsTriggered: ["Retrieve Knowledge"],
  qualityScore: "Low" as const,
  qualityReasoning:
    "The agent did not provide the user a detailed response about the Cancellation Policy.",
};

const chatMessages: ChatMessage[] = [
  { type: "bookend", text: "Chat initiated by User • 9:01:14 AM" },
  { section: "Conversation Starters", duration: "27 sec", quality: "High" },
  { type: "customer", text: "Hi", timestamp: "User • 9:02:04 AM" },
  {
    type: "agent",
    text: "Hi there! Thank you for contacting Outdoor Unlimited Customer Support. How can I assist you today?",
    timestamp: "Agent (Complete: 3 sec)",
  },
  { section: "Cancellation Request", duration: "1 min, 12 sec", quality: "Low" },
  {
    type: "customer",
    text: "Hi, I have a question about your cancellation policy.",
    timestamp: "User • 9:02:04 AM",
  },
  {
    type: "agent",
    text: "Sure! Our cancellation policy is available on our website. Let me know if you need anything else.",
    timestamp: "Agent (Complete: 7 sec)",
  },
  {
    type: "customer",
    text: "Yeah, my order number is #9876543210, and my email is mark.williams@gmail.com",
    timestamp: "User • 9:03:04 AM",
  },
  {
    type: "agent",
    text: "Thanks, Mark! It looks like your order is still processing but hasn't shipped yet. Instead of canceling, would you like to modify it? I can help update the quantity, swap items, or adjust the order details.",
    timestamp: "Agent (Complete: 11 sec)",
  },
  { type: "bookend", text: "Chat ended by Car Rental Service Agent • 9:04:38 AM" },
];

// Icons as SVG components
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M2.22 2.22a.75.75 0 0 1 1.06 0L6 4.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L7.06 6l2.72 2.72a.75.75 0 1 1-1.06 1.06L6 7.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L4.94 6 2.22 3.28a.75.75 0 0 1 0-1.06z" />
  </svg>
);

const InfoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
  </svg>
);

const TopicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect width="20" height="20" rx="4" fill="#1B96FF" />
    <path d="M10 5L14 10L10 15L6 10L10 5Z" fill="white" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect width="20" height="20" rx="4" fill="#3BA755" />
    <path d="M6 8H9L8 12H6V8ZM11 8H14L13 12H11V8Z" fill="white" />
  </svg>
);

const ActionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect width="20" height="20" rx="4" fill="#FF5D2D" />
    <path d="M10 5V15M5 10H15" stroke="white" strokeWidth="2" />
  </svg>
);

const LiveChatIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="16" fill="#CB65FF" />
    <path
      d="M16 8C11.582 8 8 11.134 8 15C8 16.76 8.743 18.37 10 19.6C10 20.348 9.752 21.176 9.287 21.871C9.107 22.144 9.255 22.508 9.573 22.476C10.393 22.39 11.247 22.164 12 21.8C12.52 22.063 13.639 22.542 15.468 22.905C15.636 22.936 15.816 22.952 16 22.952C20.418 22.952 24 19.818 24 15.952C24 12.086 20.418 8 16 8Z"
      fill="white"
    />
  </svg>
);

const AgentAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
    </svg>
  </div>
);

// Components
const Badge = ({
  variant,
  children,
}: {
  variant: "success" | "warning";
  children: React.ReactNode;
}) => {
  const styles = {
    success: "bg-[#CDEFC4] text-[#22683E]",
    warning: "bg-[#F9E3B6] text-[#8C4B02]",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-normal ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

const ReadOnlyField = ({
  label,
  value,
  showInfo = false,
  infoText = "",
}: {
  label: string;
  value: string;
  showInfo?: boolean;
  infoText?: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex flex-col gap-1 relative">
      <div className="flex items-center gap-1">
        <span className="text-[13px] font-bold text-[#03234D]">{label}</span>
        {showInfo && (
          <button
            className="text-[#0B5CAB] hover:text-[#0250D9] focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            aria-label={`Info about ${label}`}
            tabIndex={0}
          >
            <InfoIcon />
          </button>
        )}
        {showTooltip && infoText && (
          <div className="absolute top-6 left-0 z-50 bg-[#032D60] text-white text-[13px] px-3 py-2 rounded shadow-lg max-w-[200px]">
            {infoText}
            <div className="absolute -top-1 left-4 w-2 h-2 bg-[#032D60] transform rotate-45" />
          </div>
        )}
      </div>
      <span className="text-[13px] text-[#2E2E2E]">{value}</span>
    </div>
  );
};

const ChatBubble = ({ message }: { message: ChatMessage }) => {
  if (message.section) {
    return (
      <div className="flex items-center gap-2 py-2 px-4">
        <div className="flex-1 h-px bg-[#C9C9C9]" />
        <span className="text-[10px] text-[#5C5C5C] whitespace-nowrap">
          {message.section} ({message.duration})
        </span>
        <Badge variant={message.quality === "High" ? "success" : "warning"}>
          Quality: {message.quality}
        </Badge>
        <div className="flex-1 h-px bg-[#C9C9C9]" />
      </div>
    );
  }

  if (message.type === "bookend") {
    return (
      <div className="flex items-center justify-center gap-1 py-3 text-[12px] text-[#2E2E2E]">
        <ChatIcon />
        <span>{message.text}</span>
      </div>
    );
  }

  if (message.type === "customer") {
    return (
      <div className="flex flex-col items-end pl-20 py-1">
        <div className="bg-[#014486] text-white px-3 py-2 rounded-xl rounded-br-none max-w-full">
          <p className="text-[13px]">{message.text}</p>
        </div>
        <span className="text-[10px] text-[#2E2E2E] mt-1">{message.timestamp}</span>
      </div>
    );
  }

  if (message.type === "agent") {
    return (
      <div className="flex items-end gap-2 pr-20 py-1">
        <AgentAvatar />
        <div className="flex flex-col">
          <div className="bg-white border border-[#E5E5E5] px-3 py-2 rounded-xl rounded-bl-none max-w-full">
            <p className="text-[13px] text-[#2E2E2E]">{message.text}</p>
          </div>
          <span className="text-[10px] text-[#2E2E2E] mt-1">{message.timestamp}</span>
        </div>
      </div>
    );
  }

  return null;
};

const GlobalHeader = () => (
  <header className="h-16 bg-white flex items-center justify-between px-3 border-b border-[#E5E5E5]">
    {/* Logo */}
    <div className="flex items-center gap-2 px-1">
      <div className="w-12 h-10 bg-[#00A1E0] rounded flex items-center justify-center">
        <span className="text-white font-bold text-lg">SF</span>
      </div>
    </div>

    {/* Search */}
    <div className="flex-1 max-w-md mx-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#5C5C5C]">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search…"
          className="w-full h-8 pl-10 pr-4 border border-[#5C5C5C] rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search"
        />
      </div>
    </div>

    {/* Header Icons */}
    <div className="flex items-center gap-4 px-4">
      {["New", "Help", "Setup", "Bell"].map((icon) => (
        <button
          key={icon}
          className="w-6 h-6 text-[#5C5C5C] hover:text-[#03234D] focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
          aria-label={icon}
          tabIndex={0}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">
              {icon[0]}
            </text>
          </svg>
        </button>
      ))}
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 cursor-pointer" />
    </div>
  </header>
);

const ConsoleNavigation = () => (
  <nav className="h-10 bg-white flex items-center px-0 shadow-sm border-b border-[#E5E5E5]">
    {/* App Name */}
    <div className="flex items-center gap-4 px-4 h-8 border-r border-[#C9C9C9]">
      <div className="w-5 h-5 grid grid-cols-3 gap-0.5">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-[#747474] rounded-sm" />
        ))}
      </div>
      <span className="text-[20px] text-[#03234D]">Agentforce Studio</span>
    </div>

    {/* Divider */}
    <div className="w-px h-8 bg-[#C9C9C9] mx-0" />

    {/* Tab 1 */}
    <div className="flex items-center h-8 px-2 cursor-pointer hover:bg-gray-50">
      <span className="text-[14px] font-semibold text-[#03234D]">Sessions & Intents</span>
    </div>

    {/* Divider */}
    <div className="w-px h-8 bg-[#C9C9C9]" />

    {/* Tab 2 - Active */}
    <div className="flex items-center h-8 px-2 bg-white border-b-[3px] border-[#0250D9]">
      <div className="flex items-center gap-2">
        <span className="text-[#0250D9]">
          <ChatIcon />
        </span>
        <span className="text-[14px] text-[#0250D9]">Y890KRTU000KF3b...</span>
        <button
          className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#0250D9] focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Close tab"
          tabIndex={0}
        >
          <CloseIcon />
        </button>
      </div>
    </div>

    {/* Divider */}
    <div className="w-px h-8 bg-[#C9C9C9]" />
  </nav>
);

const PageHeader = () => (
  <div className="flex items-center justify-between py-4 px-6 bg-[#F3F3F3]">
    <div className="flex items-center gap-3">
      <LiveChatIcon />
      <div className="flex flex-col">
        <h1 className="text-[28px] text-[#03234D]">{sessionData.title}</h1>
        <span className="text-[13px] text-[#5C5C5C]">Session ID: {sessionData.id}</span>
      </div>
    </div>
    <button
      className="flex items-center gap-2 px-4 py-1.5 border border-[#5C5C5C] rounded-full text-[14px] font-semibold text-[#0250D9] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      tabIndex={0}
    >
      Open in Messaging Sessions
      <ExternalLinkIcon />
    </button>
  </div>
);

const ChatSessionLog = () => (
  <div className="w-[464px] bg-white border-r border-[#C9C9C9] flex flex-col h-full">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5]">
      <div className="flex items-center gap-2">
        <span className="text-[20px] text-[#03234D]">Chat Session Log</span>
        <span className="text-[12px] text-[#2E2E2E]">({sessionData.duration})</span>
      </div>
      <button
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#0250D9] focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Download transcript"
        tabIndex={0}
      >
        <DownloadIcon />
      </button>
    </div>

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto bg-[#F3F3F3] p-4">
      {chatMessages.map((message, index) => (
        <ChatBubble key={index} message={message} />
      ))}
    </div>
  </div>
);

const MomentDetailsCard = () => (
  <div className="flex-1 p-4 overflow-y-auto">
    <div className="bg-white rounded-lg border border-[#C9C9C9] p-4">
      {/* Card Header */}
      <div className="border-b border-[#E5E5E5] pb-3 mb-4">
        <h2 className="text-[20px] text-[#03234D]">Moment Details</h2>
      </div>

      {/* Title */}
      <h3 className="text-[20px] text-[#03234D] mb-2">{momentData.question}</h3>
      <p className="text-[13px] text-[#5C5C5C] mb-6">Intent (Moment) ID: {momentData.intentId}</p>

      {/* Metrics Row */}
      <div className="flex gap-6 mb-6">
        <ReadOnlyField label="Total Interactions" value={momentData.totalInteractions} />
        <ReadOnlyField
          label="Average Agent Latency"
          value={momentData.avgLatency}
          showInfo
          infoText="The average duration between a user's message and the agent's response."
        />
        <ReadOnlyField label="Intent Duration" value={momentData.intentDuration} />
      </div>

      {/* Agent Name */}
      <div className="mb-6">
        <ReadOnlyField label="Agent Name" value={momentData.agentName} />
      </div>

      {/* Divider */}
      <hr className="border-[#E5E5E5] my-6" />

      {/* Topics, Intent Tag, Actions */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-[#03234D]">Topics Triggered</span>
          <div className="flex items-center gap-2">
            <TopicIcon />
            <span className="text-[13px] text-[#0250D9]">{momentData.topicsTriggered[0]}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-[#03234D]">Intent Tag</span>
          <div className="flex items-center gap-2">
            <QuoteIcon />
            <span className="text-[13px] text-[#2E2E2E]">{momentData.intentTag}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-[#03234D]">Actions Triggered</span>
          <div className="flex items-center gap-2">
            <ActionIcon />
            <span className="text-[13px] text-[#2E2E2E]">{momentData.actionsTriggered[0]}</span>
          </div>
        </div>
      </div>

      {/* Quality Score */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-[#03234D]">Quality Score</span>
          <Badge variant="warning">{momentData.qualityScore}</Badge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-bold text-[#03234D]">Quality Score Reasoning</span>
          <p className="text-[13px] text-[#2E2E2E]">{momentData.qualityReasoning}</p>
        </div>
      </div>
    </div>
  </div>
);

// Main Component
const AgentforceExplorer = () => {
  return (
    <div className="min-h-screen bg-[#F3F3F3] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      `}</style>

      {/* Global Header */}
      <GlobalHeader />

      {/* Console Navigation */}
      <ConsoleNavigation />

      {/* Page Header */}
      <PageHeader />

      {/* Main Content */}
      <div className="flex" style={{ height: "calc(100vh - 180px)" }}>
        {/* Chat Session Log */}
        <ChatSessionLog />

        {/* Moment Details */}
        <MomentDetailsCard />
      </div>
    </div>
  );
};

export default AgentforceExplorer;

export const Head = () => <title>Agentforce Interaction Explorer</title>;



