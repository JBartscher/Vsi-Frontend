import NavbarItem from "./NavbarItem";
import {faExternalLink} from "@fortawesome/free-solid-svg-icons";
import NavbarIcon from "./NavbarIcon";
import NavbarGroup from "./NavbarGroup";

const Navbar = () => {
    return (
        <div
            className="min-h-screen bg-gray-800 lg:col-span-2 md:col-span-4 sm:col-span-6 p-10 text-gray-100 flex flex-col">
            <NavbarIcon/>
            <NavbarGroup title={"Basic"}>
                <NavbarItem to={"/"} text={"Bar chart"} fav={faExternalLink}/>
                <NavbarItem to={"/wordcloud"} text={"Pie Chart"} fav={faExternalLink}/>
                <NavbarItem to={"/wordcloud"} text={"Stacked Area Chart"} fav={faExternalLink}/>
                <NavbarItem to={"/wordcloud"} text={"Bubble Chart"} fav={faExternalLink}/>
            </NavbarGroup>
            <NavbarGroup title={"Advanced"}>
                <NavbarItem to={"/"} text={"Wordcloud Chart"} fav={faExternalLink}/>
                <NavbarItem to={"/wordcloud"} text={"Network Chart"} fav={faExternalLink}/>
                <NavbarItem to={"/wordcloud"} text={"Advanced Bubble Chart"} fav={faExternalLink}/>
            </NavbarGroup>

        </div>
    )
}

export default Navbar
