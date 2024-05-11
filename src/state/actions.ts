import { Question, Survey } from "./interface"


/**
 * Types of app-wide actions that can be taken (eg login)
 */
export enum StateActions {
    LOGIN,
    SET_SURVEY_LIST,
}



//constructors for individual action objects


export const createActionSetSurveyList = (surveyList: any[]) => {
    return {
        type: StateActions.SET_SURVEY_LIST,
        value: surveyList,
    }
}

export const createActionLogin = (login: boolean) => {
    return {
        type: StateActions.LOGIN,
        value: login,
    }
}