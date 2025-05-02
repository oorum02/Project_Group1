import "../styles/Footer.css"
import tmdbLogo from "../assets/logos/tmdbLogo.svg"


function Footer() {
    return(
        <footer>
            <p className="main-footer-text">I'm not lazy, I'm just in a long-term relationship with my movie queue</p>
            <p className="intro-tmbd-text">powered by</p>
            <p className="group-name-date">&copy; Group 1 {new Date().getFullYear()}</p>
            <img className="tmdb-logo" src={tmdbLogo} alt="TMDb Logo" />
        </footer>
    )
}

export default Footer