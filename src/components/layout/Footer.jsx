import Link from "next/link";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer border-t mt-auto">
      <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="footer-bottom">
          <p>&copy; {year} Marwah Zaid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
