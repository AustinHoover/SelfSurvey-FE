import * as React from "react";
import { Link } from "react-router-dom";
import { appContext } from "../../entry/app";

interface NavEntry {
    name : string,
    link : string,
    external : boolean,
    isIcon : boolean,
}

const entries : NavEntry[] = [
    {
        name: "Home",
        link: "/",
        external : false,
        isIcon : false,
    },
    {
        name: "Survey",
        link: "/survey",
        external : false,
        isIcon : false,
    },
    {
        name: "Edit",
        link: "/edit",
        external : false,
        isIcon : false,
    },
    {
        name: "Info",
        link: "/info",
        external : false,
        isIcon : false,
    },
];

export interface DefaultNavbarProps {
    name? : string,
}

const DefaultNavbar = (props : DefaultNavbarProps) => {
    //get context
    const appStateContext = React.useContext(appContext);
    const state = appStateContext.state
    const dispatch = appStateContext.dispatch


    //fast return if we aren't logged in yet don't show randoms the navbar
    if(!state.loggedIn){
        return <div></div>
    }


    //actual nav items logic
    let NavItems : JSX.Element[] = [];
    entries.forEach((el)=>{
        if(el.external){
            if(el.isIcon){
                NavItems.push(
                    <div className="nav-item" key={el.name + "navitem"}>
                        <a href={el.link} className="nav-link"><i className={el.name} role="button" style={{
                            fontSize: "1.2rem",
                            color: "gray",
                        }}></i></a>
                    </div>
                )
            } else {
                NavItems.push(
                    <div className="nav-item" key={el.name + "navitem"}>
                        <a href={el.link} className="nav-link">{el.name}</a>
                    </div>
                )
            }
        } else {
            if(props.name){
                if(props.name === el.name){
                    NavItems.push(
                        <div className="nav-item active" key={el.name + "navitem"}>
                            <Link to={el.link} className="nav-link" >{el.name}</Link>
                        </div>
                    );
                } else {
                    NavItems.push(
                        <div className="nav-item" key={el.name + "navitem"}>
                            <Link to={el.link}  className="nav-link" >{el.name}</Link>
                        </div>
                    );
                }
            } else {
                NavItems.push(
                    <div className="nav-item" key={el.name + "navitem"}>
                        <Link to={el.link}  className="nav-link" >{el.name}</Link>
                    </div>
                );
            }
        }
    });
    return (
        <div className="navbar navbar-expand-lg navbar-light">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav mr-auto">
                    {NavItems}
                </div>
            </div>
        </div>
    );
}

export default DefaultNavbar;