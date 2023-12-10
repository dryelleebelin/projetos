import avatar from '../img/dryelle.jpg'

import '../styles/components/sidebar.sass'
import InformationContainer from './InformationContainer'
import SocialNetworks from './SocialNetworks'

const Sidebar = () => {
    return(
        <aside id="sidebar">
            <img src={avatar} alt="Dryelle Ebelin" />
            <p className="title">Desenvolvedora</p>
            <SocialNetworks/>
            <InformationContainer/>
            <a href="#" className="btn">download currículo</a>
        </aside>
    )
}

export default Sidebar