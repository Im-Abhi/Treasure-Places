import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import BackDrop from "../UIElements/BackDrop";
import MainHeader from "./MainHeader";

import './MainNavigation.css';
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }
    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }
    return (
        <Fragment>
            {
                drawerIsOpen && <BackDrop onClick={closeDrawerHandler} />
            }
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 className="main-navigation__title">
                    <Link to='/'>
                        YourPlaces
                    </Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </Fragment>
    )
}

export default MainNavigation;