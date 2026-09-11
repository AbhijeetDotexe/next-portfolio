import Link from "next/link";
import { SITE } from "@/data/site";

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
            <Link href="/resume">résumé</Link>
            {" · "}
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
              github
            </a>
            {" · "}
            <a href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer">
              linkedin
            </a>
            {" · "}
            <a href={`mailto:${SITE.email}`}>email</a>
            {" · "}
            <Link href="/feed.xml">rss</Link>
          </span>
          <span className="status">
            <i></i>all systems normal
          </span>
        </div>
      </div>
    </footer>
  );
}
