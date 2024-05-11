import * as React from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../pages/Index/Index";
import NotFound from "../pages/NotFound/NotFound";
import { AppContextInterface, initialContext, initialState } from "../state/interface";
import { reducer } from "../state/reducer";
import InfoScreen from "../pages/Info/InfoScreen";
import EditSurvey from "../pages/EditSurvey/EditSurvey";
import TakeSurvey from "../pages/TakeSurvey/TakeSurvey";

//The app-wide state context
//@ts-ignore
export let appContext : React.Context<AppContextInterface> = null

/**
 * Specific app config
 */
export interface AppConfig {
    debug: boolean,
}

/**
 * Creation props
 */
export interface AppProperties {
    appConfig?: AppConfig,
}

//@ts-ignore
export const APIURL: string = API_URL

/**
 * App wide component
 * @param props props constructing the app
 * @returns App wide component
 */
const App = (props: AppProperties) => {
    appContext = React.createContext(initialContext)
    let initialHookState = {
        ...initialState
    }
    const [state, dispatch] = React.useReducer(reducer, initialHookState)
    const context = React.useContext(appContext)
    context.state = state
    context.dispatch = dispatch
    return (
        <appContext.Provider value={context}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" Component={Index}/>
                        <Route path="/survey" Component={TakeSurvey}/>
                        <Route path="/edit" Component={EditSurvey}/>
                        <Route path="/info" Component={InfoScreen}/>
                        <Route Component={NotFound}/>
                    </Routes>
                </BrowserRouter>
            </React.Suspense>
        </appContext.Provider>
    );
}

export default App;