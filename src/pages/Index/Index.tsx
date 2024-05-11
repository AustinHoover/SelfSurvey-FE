import * as React from "react";
import DefaultNavbar from "../../components/DefaultNavbar/DefaultNavbar";
import { FormEvent, FormEventHandler } from "react";
import { APIURL, appContext } from "../../entry/app";
import { createActionSetSurveyList } from "../../state/actions";
import { dummySurvey } from "../../state/interface";

/**
 * Index page
 * @returns a component
 */
const Index = () => {
    //get context
    const appStateContext = React.useContext(appContext);
    const state = appStateContext.state
    const dispatch = appStateContext.dispatch


    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const loginBoxElements: JSX.Element[] = []
    if(state.loggedIn){
        loginBoxElements.push(
            <div></div>
        )
    } else {
        const loginFunc = (event: FormEvent) => {
            event.preventDefault()
            let authHeaders : Headers = new Headers();
            authHeaders.set('Authorization','Basic ' + btoa(username + ":" + password))
            const response = fetch(APIURL + '/login',{
                method: "GET",
                headers: authHeaders,
                credentials: 'include',
            }).then(
                (response) => response.text()).then(
            (text)=>{
                console.log(text)
                fetch(APIURL + "/survey/list",{
                    method: "GET",
                    credentials: 'include',
                })
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp)
                    dispatch(createActionSetSurveyList(resp))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
        loginBoxElements.push(
            <form
            onSubmit={(event)=>{
                loginFunc(event)
            }}
            >
                <div>
                    <input
                    type="text"
                    id="username"
                    onChange={(event) => setUsername(event.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                    type="password"
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                    ></input>
                </div>
                <div>
                    <button
                    >Login</button>
                </div>
            </form>
        )
    }

    return (
        <div
        style={{
            backgroundSize : "cover",
            height: "100vh",
        }}
        >
            <div
            style={{
                backgroundSize : "cover",
                height: "100vh",
            }}
            >
                <header>
                    <DefaultNavbar name={"Home"}/>
                </header>
                <main role="main">
                    <div className="container">
                        <div className="row"></div>
                        <div className="row text-center">
                            <div className="col">
                                <h1 className="p-3 display-1">Hello</h1>
                                <p className="display-4">
                                    How are you feeling today?
                                </p>
                                {/* <img className="card-img-top text-light" src="" alt="There was supposed to be a picture of my face here"></img> */}
                            </div>
                        </div>
                        <div className="row">
                            {loginBoxElements}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Index;