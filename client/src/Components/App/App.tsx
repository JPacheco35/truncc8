import Header from "../Header/Header"
import URLInput from "../URLInput/URLInput"
import Footer from "../Footer/Footer"

import ShootingStars from "../ShootingStars/ShootingStars";
import './App.css'

export default function App() {
    return (
        <div className="flexer-container">
            <ShootingStars /> {/* background */}

            <div className="upper-container">
                <div className="item item-1">
                    <Header />
                </div>

                <div className="item item-2">
                    <URLInput />
                </div>
            </div>

            <div className="item item-3">
                <Footer />
            </div>
        </div>
    )
}