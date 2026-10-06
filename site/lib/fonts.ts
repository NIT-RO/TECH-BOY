import { Archivo, IBM_Plex_Sans_Arabic, Inter, JetBrains_Mono } from "next/font/google";

const display = Archivo({ subsets: ["latin"], weight: ["600", "800", "900"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-arabic", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-mono", display: "swap" });

export const fontVariables = [display.variable, sans.variable, arabic.variable, mono.variable].join(" ");
