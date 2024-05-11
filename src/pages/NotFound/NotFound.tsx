import * as React from "react";
import DefaultNavbar from "../../components/DefaultNavbar/DefaultNavbar";

const NotFound = () => {
    return (
        <>
            <header>
                <DefaultNavbar/>
            </header>
            <main role="main">
                <div className="container text-center">
                    <h1>404</h1>
                    <p className="text-muted">
                        Couldn't find that page.
                    </p>
                </div>
            </main>
        </>
    );
}

export default NotFound;