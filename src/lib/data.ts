export type UserRole = "public" | "player" | "admin";

export type TeamMini = {
  short: string;
  name: string;
  city: string;
  color: string;
};

export type MatchBall =
  | { type: "run"; label: string; value: number }
  | { type: "wide"; label: "Wd"; value: 1 }
  | { type: "dot"; label: "·"; value: 0 }
  | { type: "four"; label: "4"; value: 4 }
  | { type: "six"; label: "6"; value: 6 }
  | { type: "wicket"; label: "W"; value: 0 };

export type MatchItem = {
  id: string;
  status: "live" | "upcoming" | "completed";
  badge: string;
  group?: string;
  teamA: TeamMini;
  teamB: TeamMini;
  scoreA: string;
  scoreB: string;
  overs: string;
  venue: string;
  summary?: string;
  balls?: MatchBall[];
  batters?: { name: string; score: string; strike?: boolean }[];
  scorecard?: {
    batting: { name: string; runs: string; balls: string; fours: string; sixes: string; strikeRate: string; strike?: boolean }[];
    bowling: { name: string; overs: string; runs: string; wickets: string; economy: string }[];
  };
  commentary?: { over: string; text: string }[];
};

export type RankingRow = {
  rank: number;
  initials: string;
  gradient: string;
  name: string;
  playerId: string;
  zone: string;
  city: string;
  matches: number;
  runs: number;
  wickets: number;
  points: number;
};

export type TeamCard = {
  slug: string;
  short: string;
  name: string;
  city: string;
  wins: number;
  played: number;
  color: string;
  description: string;
  roster: {
    playerId: string;
    name: string;
    role: string;
    city: string;
    status: string;
  }[];
};

export const creds = {
  admin: {
    username: "admin",
    password: "admin123",
    role: "admin" as const,
    name: "Admin",
    initials: "AD",
  },
  player: {
    username: "player",
    password: "player123",
    role: "player" as const,
    name: "Rohit Kadam",
    initials: "RK",
  },
};

export const tickerItems = [
  "Mumbai Mavericks vs Delhi Dynamos — LIVE — Over 7.3 — Mumbai: 89/2",
  "City Trials Begin April 15th, 2026",
  "16 Franchises · National Selections · T10 Format",
  "Registrations Open — 20+ Cities",
  "Kolkata Knights beat Pune Warriors by 14 runs",
];

export const matches: MatchItem[] = [
  {
    id: "mm-vs-dd",
    status: "live",
    badge: "LIVE NOW",
    group: "Group A",
    teamA: {
      short: "MM",
      name: "Mumbai Mavericks",
      city: "Mumbai",
      color: "#FF6B35",
    },
    teamB: {
      short: "DD",
      name: "Delhi Dynamos",
      city: "Delhi",
      color: "#1E90FF",
    },
    scoreA: "89/2",
    scoreB: "Yet to bat",
    overs: "7.3 OV",
    venue: "Oval Maidan, Mumbai",
    summary:
      "Mumbai Mavericks are accelerating through the middle overs after a steady powerplay foundation.",
    balls: [
      { type: "run", label: "1", value: 1 },
      { type: "wide", label: "Wd", value: 1 },
      { type: "four", label: "4", value: 4 },
      { type: "six", label: "6", value: 6 },
      { type: "dot", label: "·", value: 0 },
      { type: "run", label: "2", value: 2 },
    ],
    batters: [
      { name: "R. Kadam", score: "48*(22)", strike: true },
      { name: "S. Mehta", score: "21*(14)" },
    ],
    scorecard: {
      batting: [
        { name: "R. Kadam", runs: "48*", balls: "22", fours: "5", sixes: "2", strikeRate: "218.18", strike: true },
        { name: "S. Mehta", runs: "21*", balls: "14", fours: "2", sixes: "1", strikeRate: "150.00" },
        { name: "A. Verma", runs: "12", balls: "8", fours: "1", sixes: "0", strikeRate: "150.00" },
      ],
      bowling: [
        { name: "R. Singh", overs: "2", runs: "19", wickets: "1", economy: "9.50" },
        { name: "V. Yadav", overs: "2", runs: "24", wickets: "0", economy: "12.00" },
        { name: "K. Khan", overs: "1.3", runs: "18", wickets: "1", economy: "12.00" },
      ],
    },
    commentary: [
      { over: "7.1", text: "Single to long-on. Smart rotation keeps the over moving." },
      { over: "7.2", text: "Wide down leg. Free extra for Mumbai." },
      { over: "7.2", text: "FOUR! Width offered and punished through cover." },
      { over: "7.3", text: "SIX! Picked up over deep square leg with ease." },
      { over: "7.4", text: "Dot ball. Slower ball grips and beats the bat." },
      { over: "7.5", text: "Two more. Good running between the wickets." },
    ],
  },
  {
    id: "kk-vs-pw",
    status: "completed",
    badge: "COMPLETED",
    teamA: {
      short: "KK",
      name: "Kolkata Knights",
      city: "Kolkata",
      color: "#E8C84A",
    },
    teamB: {
      short: "PW",
      name: "Pune Warriors",
      city: "Pune",
      color: "#C0C0C0",
    },
    scoreA: "104/4",
    scoreB: "90/7",
    overs: "10 OV",
    venue: "Salt Lake Arena",
    summary: "Kolkata defended with disciplined death bowling and sharp fielding.",
  },
  {
    id: "cc-vs-hx",
    status: "upcoming",
    badge: "UPCOMING",
    teamA: {
      short: "CC",
      name: "Chennai Chargers",
      city: "Chennai",
      color: "#FFD34D",
    },
    teamB: {
      short: "HX",
      name: "Hyderabad X1",
      city: "Hyderabad",
      color: "#00D46A",
    },
    scoreA: "Starts 7 PM",
    scoreB: "Tonight",
    overs: "SCHEDULED",
    venue: "Marina Sports Turf",
    summary: "Primetime clash under lights with two aggressive top orders.",
  },
];

export const liveMatch = matches[0];

export const rankings: RankingRow[] = [
  {
    rank: 1,
    initials: "RK",
    gradient: "linear-gradient(135deg,#FF4500,#FF8C00)",
    name: "Rohit Kadam",
    playerId: "ITCPL-2026-W-0042",
    zone: "West",
    city: "Mumbai",
    matches: 8,
    runs: 312,
    wickets: 6,
    points: 1240,
  },
  {
    rank: 2,
    initials: "AV",
    gradient: "linear-gradient(135deg,#1E90FF,#00CED1)",
    name: "Arjun Varma",
    playerId: "ITCPL-2026-N-0018",
    zone: "North",
    city: "Delhi",
    matches: 8,
    runs: 288,
    wickets: 9,
    points: 1175,
  },
  {
    rank: 3,
    initials: "SK",
    gradient: "linear-gradient(135deg,#00C853,#64DD17)",
    name: "Suresh Kumar",
    playerId: "ITCPL-2026-S-0091",
    zone: "South",
    city: "Bengaluru",
    matches: 8,
    runs: 140,
    wickets: 15,
    points: 1110,
  },
  {
    rank: 4,
    initials: "PM",
    gradient: "linear-gradient(135deg,#9C27B0,#E040FB)",
    name: "Pradeep Mishra",
    playerId: "ITCPL-2026-E-0033",
    zone: "East",
    city: "Kolkata",
    matches: 8,
    runs: 98,
    wickets: 14,
    points: 1060,
  },
];

export const teams: TeamCard[] = [
  {
    slug: "mumbai-mavericks",
    short: "MM",
    name: "Mumbai Mavericks",
    city: "Mumbai",
    wins: 6,
    played: 8,
    color: "#FF6B35",
    description: "An explosive franchise built around aggressive starts, quick singles, and elite boundary hitting.",
    roster: [
      { playerId: "ITCPL-2026-W-0042", name: "Rohit Kadam", role: "Batsman", city: "Mumbai", status: "Active" },
      { playerId: "ITCPL-2026-W-0077", name: "Vikas Naik", role: "Batsman", city: "Pune", status: "Suspended" },
    ],
  },
  {
    slug: "delhi-dynamos",
    short: "DD",
    name: "Delhi Dynamos",
    city: "Delhi",
    wins: 5,
    played: 8,
    color: "#1E90FF",
    description: "Balanced and tactical, with strong all-round depth and a disciplined bowling core.",
    roster: [
      { playerId: "ITCPL-2026-N-0018", name: "Arjun Varma", role: "All-Rounder", city: "Delhi", status: "Active" },
    ],
  },
  {
    slug: "bengaluru-blaze",
    short: "BB",
    name: "Bengaluru Blaze",
    city: "Bengaluru",
    wins: 4,
    played: 8,
    color: "#00D46A",
    description: "A bowling-heavy side with relentless control through the middle overs.",
    roster: [
      { playerId: "ITCPL-2026-S-0091", name: "Suresh Kumar", role: "Bowler", city: "Bengaluru", status: "Active" },
    ],
  },
  {
    slug: "kolkata-knights",
    short: "KK",
    name: "Kolkata Knights",
    city: "Kolkata",
    wins: 4,
    played: 8,
    color: "#E8C84A",
    description: "A sharp, compact unit that thrives under scoreboard pressure.",
    roster: [
      { playerId: "ITCPL-2026-E-0033", name: "Pradeep Mishra", role: "Bowler", city: "Kolkata", status: "Active" },
    ],
  },
];

export const videos = [
  { title: "Season Launch Film", youtubeId: "dQw4w9WgXcQ", category: "Seasonal Content" },
  { title: "Top Match Highlights", youtubeId: "dQw4w9WgXcQ", category: "Highlights" },
  { title: "Magic Moments Compilation", youtubeId: "ScMzIvxBSi4", category: "Magic Moments" },
];

export const news = [
  {
    title: "Regional tennis cricket ecosystem continues to expand",
    source: "cricbuzz.com",
    date: "Apr 8",
    status: "Published",
    description: "External coverage card linking out to original reporting and analysis.",
  },
  {
    title: "City Trials Schedule Announced for April 15",
    source: "itcpl.com",
    date: "Apr 7",
    status: "Draft",
    description: "Season 2026 trials schedule update across major city clusters.",
  },
];

export const dashboardStats = [
  { label: "Matches Played", value: "08" },
  { label: "Tournaments", value: "03" },
  { label: "Total Runs", value: "312" },
  { label: "Total Wickets", value: "06" },
];

export const dashboardPerformance = {
  batting: [
    ["Runs", "312"],
    ["Balls Faced", "186"],
    ["Strike Rate", "167.74"],
    ["Average", "52.00"],
    ["4s / 6s", "28 / 17"],
  ],
  bowling: [
    ["Overs", "18"],
    ["Wickets", "6"],
    ["Runs Conceded", "122"],
    ["Economy", "6.78"],
    ["Dot Balls", "41"],
  ],
  fielding: [
    ["Catches", "4"],
    ["Run Outs", "1"],
    ["MVP Rank", "#1 West"],
    ["Referral Invites", "12"],
    ["Payments Made", "₹999"],
  ],
};

export const discoverTournaments = [
  {
    id: "tour-001",
    title: "Mumbai Premier Weekend Cup",
    city: "Mumbai",
    date: "15 Apr 2026",
    format: "T10",
    fee: "₹999",
    slots: "12 spots left",
  },
  {
    id: "tour-002",
    title: "West Zone Powerplay Clash",
    city: "Pune",
    date: "20 Apr 2026",
    format: "T10",
    fee: "₹1499",
    slots: "8 spots left",
  },
  {
    id: "tour-003",
    title: "Delhi Street Cricket Masters",
    city: "Delhi",
    date: "24 Apr 2026",
    format: "T10",
    fee: "₹999",
    slots: "18 spots left",
  },
];

export const adminStats = [
  { label: "Registered Players", value: "42,310" },
  { label: "Teams", value: "16" },
  { label: "Matches Today", value: "12" },
  { label: "Pending Payments", value: "184" },
];