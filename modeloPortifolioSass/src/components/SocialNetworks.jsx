import {FaLinkedin, FaGithub, FaInstagram} from "react-icons/fa"

import '../styles/components/socialnetworks.sass'

const socialNetworks = [
    {name: "linkedin", icon: <FaLinkedin/>},
    {name: "giithub", icon: <FaGithub/>},
    {name: "instagram", icon: <FaInstagram/>},
]

const SocialNetworks = () => {
    return(
        <section id="social-networks">
            {socialNetworks.map((network) => (
                <a href="#" className="social-btn" id={network.name} key={network.name}>
                    {network.icon}
                </a>
            ))}
        </section>
    )
}

export default SocialNetworks