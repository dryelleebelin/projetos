import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./darkmode.scss";

export default function DarkMode(){
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
        localStorage.setItem("selectedTheme", "dark")
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
        localStorage.setItem("selectedTheme", "light")
    }

    const selectedTheme = localStorage.getItem("selectedTheme")

    if(selectedTheme === "dark"){
        setDarkMode()
    }

    const toggleTheme = e => {
        if(e.target.checked) setDarkMode()
        else setLightMode()
    }

    return (
        <div className="darkmode">
            <input className='dark_mode_input' type='checkbox' id='darkmode-toggle' onChange={toggleTheme} defaultChecked={selectedTheme === "dark"}/>
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
            <p>Wello Word!</p>
        </div>
    );
};