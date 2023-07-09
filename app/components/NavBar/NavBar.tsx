import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.nav_container}>
          <a className={styles.brand} href="/">
            <span>RetroBoard</span>
          </a>
          <a
            className={styles.icon_link}
            href="https://github.com/marcellosabino/retroboard-org"
            target="_blank"
            rel="no-referrer"
          >
            <i className="bi bi-github" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </nav>
  );
}
