import "../assets/styles/variables.scss";
import "../assets/styles/fonts/fonts.scss";
import "../assets/styles/global.scss";
import styles from "./app.module.scss";

import { AuthProvider } from "@/provider/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.main}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
