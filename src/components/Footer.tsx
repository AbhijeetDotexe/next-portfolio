export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="wordmark">abhijeet rana</div>
        <div className="foot-grid">
          <span>
            © <span id="year">{currentYear}</span> · crafted with intent
          </span>
          <span>
            <a
              href="https://github.com/abhijeetdotexe"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>{" "}
            ·{" "}
            <a
              href="https://linkedin.com/in/abhijeetrana/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>{" "}
            · <a href="mailto:abhijeet4rana@gmail.com">email</a>
          </span>
          <span className="status">
            <i></i>all systems normal
          </span>
        </div>
      </div>
    </footer>
  );
}
