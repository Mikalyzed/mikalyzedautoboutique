import { Poppins, JetBrains_Mono } from "next/font/google";

// Poppins does the talking, JetBrains Mono does the measuring — §3 of the
// build spec. Weights are exactly the set the mockups use; adding more would
// only cost download weight.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVars = `${poppins.variable} ${jetbrains.variable}`;
