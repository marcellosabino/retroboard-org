import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className={styles.lhs}>
            Made with{" "}
            <i className="bi bi-heart-fill text-red-400" aria-hidden="true"></i>{" "}
            on GitHub
          </div>
          <div className={styles.rhs}>
            <ul>
              <li>
                <a href="https://github.com/marcellosabino/retroboard-org">
                  Issues
                </a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
