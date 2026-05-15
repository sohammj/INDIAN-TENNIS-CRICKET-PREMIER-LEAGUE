"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDevData = seedDevData;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../config/prisma");
const password = "player123";
const teams = [
    ["Mumbai Warriors", "Mumbai", "West"],
    ["Delhi Strikers", "Delhi", "North"],
    ["Bangalore Titans", "Bengaluru", "South"],
    ["Chennai Kings", "Chennai", "South"],
    ["Kolkata Knights", "Kolkata", "East"],
    ["Hyderabad Falcons", "Hyderabad", "South"],
    ["Pune Panthers", "Pune", "West"],
    ["Ahmedabad Arrows", "Ahmedabad", "West"],
    ["Jaipur Royals", "Jaipur", "North"],
    ["Lucknow Legends", "Lucknow", "North"],
];
const players = [
    ["ITCPL001", "Rohit Kadam", "rohit@itcpl.com", "Mumbai", "West"],
    ["ITCPL002", "Arjun Varma", "arjun@itcpl.com", "Delhi", "North"],
    ["ITCPL003", "Suresh Kumar", "suresh@itcpl.com", "Bengaluru", "South"],
    ["ITCPL004", "Aman Shah", "aman@itcpl.com", "Mumbai", "West"],
    ["ITCPL005", "Nikhil Rao", "nikhil@itcpl.com", "Chennai", "South"],
    ["ITCPL006", "Yash Mehta", "yash@itcpl.com", "Kolkata", "East"],
    ["ITCPL007", "Kabir Singh", "kabir@itcpl.com", "Hyderabad", "South"],
    ["ITCPL008", "Dev Patel", "dev@itcpl.com", "Pune", "West"],
    ["ITCPL009", "Vivaan Jain", "vivaan@itcpl.com", "Ahmedabad", "West"],
    ["ITCPL010", "Aryan Nair", "aryan@itcpl.com", "Jaipur", "North"],
    ["ITCPL011", "Rishi Iyer", "rishi@itcpl.com", "Lucknow", "North"],
    ["ITCPL012", "Manav Desai", "manav@itcpl.com", "Mumbai", "West"],
    ["ITCPL013", "Karan Malhotra", "karan@itcpl.com", "Delhi", "North"],
    ["ITCPL014", "Aditya Joshi", "aditya@itcpl.com", "Bengaluru", "South"],
    ["ITCPL015", "Harsh Gupta", "harsh@itcpl.com", "Chennai", "South"],
    ["ITCPL016", "Omkar Kulkarni", "omkar@itcpl.com", "Kolkata", "East"],
    ["ITCPL017", "Raghav Bhat", "raghav@itcpl.com", "Hyderabad", "South"],
    ["ITCPL018", "Ishaan Sethi", "ishaan@itcpl.com", "Pune", "West"],
    ["ITCPL019", "Neel Shah", "neel@itcpl.com", "Ahmedabad", "West"],
    ["ITCPL020", "Samarth Rao", "samarth@itcpl.com", "Jaipur", "North"],
    ["ITCPL021", "Tanish Kapoor", "tanish@itcpl.com", "Lucknow", "North"],
    ["ITCPL022", "Pranav Rane", "pranav@itcpl.com", "Mumbai", "West"],
    ["ITCPL023", "Jay Bansal", "jay@itcpl.com", "Delhi", "North"],
    ["ITCPL024", "Atharva More", "atharva@itcpl.com", "Bengaluru", "South"],
    ["ITCPL025", "Krish Menon", "krish@itcpl.com", "Chennai", "South"],
    ["ITCPL026", "Rudra Pillai", "rudra@itcpl.com", "Kolkata", "East"],
    ["ITCPL027", "Veer Khanna", "veer@itcpl.com", "Hyderabad", "South"],
    ["ITCPL028", "Dhruv Agarwal", "dhruv@itcpl.com", "Pune", "West"],
    ["ITCPL029", "Parth Trivedi", "parth@itcpl.com", "Ahmedabad", "West"],
    ["ITCPL030", "Neil Dsouza", "neil@itcpl.com", "Jaipur", "North"],
];
async function seedDevData() {
    await prisma_1.prisma.matchPlayerStat.deleteMany();
    await prisma_1.prisma.payment.deleteMany();
    await prisma_1.prisma.tournamentRegistration.deleteMany();
    await prisma_1.prisma.teamPlayer.deleteMany();
    await prisma_1.prisma.match.deleteMany();
    await prisma_1.prisma.tournament.deleteMany();
    await prisma_1.prisma.team.deleteMany();
    await prisma_1.prisma.playerProfile.deleteMany();
    await prisma_1.prisma.user.deleteMany();
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const admin = await prisma_1.prisma.user.create({
        data: {
            name: "ITCPL Admin",
            email: "admin@itcpl.com",
            password: await bcryptjs_1.default.hash("admin123", 10),
            role: "ADMIN",
        },
    });
    const createdTeams = [];
    for (const [name, city, zone] of teams) {
        const team = await prisma_1.prisma.team.create({
            data: { name, city, zone },
        });
        createdTeams.push(team);
    }
    const createdPlayers = [];
    for (const [playerId, name, email, city, zone] of players) {
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER",
            },
        });
        const profile = await prisma_1.prisma.playerProfile.create({
            data: {
                userId: user.id,
                playerId,
                name,
                city,
                zone,
                phone: "+91 98765 43210",
                address: `${city} Training Zone`,
            },
        });
        createdPlayers.push(profile);
    }
    for (let i = 0; i < createdTeams.length; i++) {
        const teamPlayers = createdPlayers.slice(i * 3, i * 3 + 3);
        for (const player of teamPlayers) {
            await prisma_1.prisma.teamPlayer.create({
                data: {
                    teamId: createdTeams[i].id,
                    playerId: player.id,
                    role: i % 2 === 0 ? "Batter" : "All-Rounder",
                    status: "ACTIVE",
                },
            });
        }
    }
    const tournament = await prisma_1.prisma.tournament.create({
        data: {
            name: "ITCPL Season 1",
            city: "Mumbai",
            zone: "West",
            startDate: new Date("2026-06-01T10:00:00.000Z"),
            endDate: new Date("2026-06-10T18:00:00.000Z"),
            entryFee: 999,
            status: "OPEN",
        },
    });
    for (let i = 0; i < 15; i++) {
        const player = createdPlayers[i];
        const registration = await prisma_1.prisma.tournamentRegistration.create({
            data: {
                tournamentId: tournament.id,
                playerId: player.id,
                status: "REGISTERED",
            },
        });
        await prisma_1.prisma.payment.create({
            data: {
                userId: player.userId,
                playerId: player.id,
                tournamentId: tournament.id,
                registrationId: registration.id,
                amount: i % 3 === 0 ? 1499 : 999,
                currency: "INR",
                status: "COMPLETED",
                provider: "RAZORPAY",
                providerRef: `PAY-ITCPL-${String(i + 1).padStart(3, "0")}`,
            },
        });
    }
    const matchPairs = [
        [0, 1, "Mumbai Warriors won by 18 runs", "Mumbai Warriors 142/5 vs Delhi Strikers 124/7"],
        [2, 3, "Bangalore Titans won by 6 wickets", "Chennai Kings 118/8 vs Bangalore Titans 119/4"],
        [4, 5, "Kolkata Knights won by 9 runs", "Kolkata Knights 136/6 vs Hyderabad Falcons 127/7"],
        [6, 7, "Pune Panthers won by 4 wickets", "Ahmedabad Arrows 111/9 vs Pune Panthers 112/6"],
        [8, 9, "Jaipur Royals won by 22 runs", "Jaipur Royals 151/4 vs Lucknow Legends 129/8"],
    ];
    for (let i = 0; i < matchPairs.length; i++) {
        const [a, b, result, score] = matchPairs[i];
        const match = await prisma_1.prisma.match.create({
            data: {
                tournamentId: tournament.id,
                teamAId: createdTeams[a].id,
                teamBId: createdTeams[b].id,
                venue: `ITCPL Ground ${i + 1}`,
                matchDate: new Date(`2026-06-0${i + 1}T10:00:00.000Z`),
                status: "COMPLETED",
                summary: `${score}. ${result}.`,
            },
        });
        const matchPlayers = [
            ...createdPlayers.slice(a * 3, a * 3 + 3),
            ...createdPlayers.slice(b * 3, b * 3 + 3),
        ];
        for (let j = 0; j < matchPlayers.length; j++) {
            await prisma_1.prisma.matchPlayerStat.create({
                data: {
                    matchId: match.id,
                    playerId: matchPlayers[j].id,
                    runs: 15 + i * 8 + j * 4,
                    ballsFaced: 10 + j * 3,
                    fours: j % 3,
                    sixes: j % 2,
                    innings: 1,
                    notOuts: j % 4 === 0 ? 1 : 0,
                    oversBowled: j % 2 === 0 ? 2 : 1,
                    runsConceded: 12 + j * 5,
                    wickets: j % 3 === 0 ? 2 : j % 2,
                    dotBalls: 4 + j,
                    catches: j % 2,
                    runOuts: j === 2 ? 1 : 0,
                    mvpPoints: 20 + i * 5 + j * 3,
                },
            });
        }
    }
    return {
        message: "Seed data created successfully",
        admin: {
            email: admin.email,
            password: "admin123",
        },
        playerPassword: password,
        players: players.map(([playerId, name, email]) => ({
            playerId,
            name,
            email,
            password,
        })),
    };
}
