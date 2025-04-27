import HeroImg from '../assets/heroimage.png'
import Camera from '../assets/camera.png'

function Heroes() {
    return(
        <>
         <div className="hero-container" id="heroes">
            <div className="left-container">
                <img src={HeroImg} />
                <p className="hero-slogan">Let your mood pick the movie</p>
            </div>
            <div className="right-container">
                <img src={Camera} />
            </div>
        </div>
        </>
    )
}

export default Heroes