import { StateActions } from "./actions";
import { AppState, Question, Survey } from "./interface";

/**
 * The reducer function for the app wide state
 * @param state The current state
 * @param action The action to reduce
 * @returns The new app wide state
 */
export const reducer = (state: AppState, action: any): AppState => {
    let newState = {...state}

    switch(action.type){
        
        //setting the survey list
        case StateActions.SET_SURVEY_LIST: {
            newState.surveys = action.value
            if(newState.surveys && newState.surveys?.length > 0){
                newState.selectedSurvey = newState.surveys[0]
            } else {
                newState.selectedSurvey = null
            }
            console.log(newState.selectedSurvey)
        } break

        //login
        case StateActions.LOGIN: {
            newState.loggedIn = action.value
        } break

    }

    return newState
}