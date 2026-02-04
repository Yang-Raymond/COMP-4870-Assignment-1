import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div>
            <h2 className="mt-0">Welcome</h2>
            <p>
                This is the public React SPA for the Mini-CMS. It fetches articles from
                the ASP.NET REST API and renders them.
            </p>
            <Link to="/articles">View Articles →</Link>
        </div>
    );
}
