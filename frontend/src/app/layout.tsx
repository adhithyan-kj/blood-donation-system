import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarvam Maya - Blood Donation System",
  description: "A modern, reliable, and swift blood donation system that connects donors with recipients in Kerala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="glass-nav">
          <div className="container nav-container">
            <div className="logo">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Sarvam<span>Maya</span>
            </div>
            <div className="nav-links">
              <a href="#" className="nav-link">Home</a>
              <a href="#requests" className="nav-link">Live Requests</a>
              <a href="#" className="nav-link">Hospitals</a>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Donate Now
              </button>
            </div>
          </div>
        </nav>
        {children}
        <footer>
          <div className="container">
            <p>&copy; 2026 Sarvam Maya - Blood Donation System</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
