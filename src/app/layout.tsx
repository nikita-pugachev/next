import "../assets/styles/variables.scss";
import "../assets/styles/fonts/fonts.scss";
import "../assets/styles/global.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
