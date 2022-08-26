import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavbarItem = ({to, text, fav}) => {
    return (
        <Link
            className="h-16 w-full flex hover:bg-gray-400 items-center border-b border-gray-800 pl-5 mt-1 mb-1 cursor-pointer"
            to={to}>
            <p className="mr-1">{text}</p>
            <FontAwesomeIcon icon={fav} />

        </Link>
    )
}

export default NavbarItem