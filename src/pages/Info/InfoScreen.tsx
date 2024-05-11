import * as React from "react";
import DefaultNavbar from "../../components/DefaultNavbar/DefaultNavbar";
import { APIURL } from "../../entry/app";

const InfoScreen = () => {

    let surveys: any = []
    fetch(APIURL + "/survey/list")
    .then(resp => resp.json())
    .then(resp => surveys = resp)
    .catch(err => console.log(err))

    let testMessage: any = null
    fetch(APIURL + "/hello")
    .then(resp => resp.text())
    .then(resp => testMessage = resp)
    .catch(err => console.log(err))

    return(
        <div>
            <header>
                <DefaultNavbar name={"Info"}/>
            </header>
            <p>Info about the app + debug</p>
            <button
            style={{
                backgroundColor: 'blue',
                alignItems: 'center',
                margin: 25,
                paddingTop: 10,
                paddingBottom: 10,
            }}
            onClick={() =>
              console.log("pushed button")
            }>
                <p style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 30,
                }}>Test responsiveness</p>
            </button>

            <p>
                survey state: {JSON.stringify(surveys)}
            </p>
            <p>
                test message: {JSON.stringify(testMessage)}
            </p>
        </div>
    )
}

export default InfoScreen