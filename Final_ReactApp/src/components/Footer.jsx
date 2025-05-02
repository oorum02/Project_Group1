import "../styles/Footer.css"
import tmdbLogo from "../assets/logos/tmdbLogo.svg"


function Footer() {
    return(
        <footer>
            <p>I'm not lazy, I'm just in a long-term relationship with my movie queue</p>
            <p>&copy; Group 1 {new Date().getFullYear()}</p>
            <img className="tmdb-logo" src={tmdbLogo} alt="TMDb Logo" />
        </footer>
    )
}

export default Footer