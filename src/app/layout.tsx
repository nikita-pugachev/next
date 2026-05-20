import "../assets/styles/variables.scss";
import "../assets/styles/fonts/fonts.scss";
import "../assets/styles/global.scss";
import styles from './app.module.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.main}>
        {children}
      </body>
    </html>
  );
}
