const NavbarGroup = ({children, title}) => {
    return (
        <div className="border-b-2 border-gray-700">
            <h2 className="text-gray-700">{title}</h2>
            {children}
        </div>
    );
}

export default NavbarGroup