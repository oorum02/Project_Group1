import React from "react"
import "../styles/Footer.css"

function Footer() {
    return(
        <footer>
            <p>I'm not lazy, I'm just in a long-term relationship with my movie queue</p>
            <p>&copy; Group 1 {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer