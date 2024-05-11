import { Dispatch } from "react"


//STATE INTERFACES


export interface Question {
    id: number,
    type: number,
    prompt: string,
    ratingMax?: number,
    ratingMin?: number,
}

export interface Survey {
    id: number,
    name: string,
    questions: Question[]
}

export interface ResponseValue {
    questionId: number,
    value: string,
}

export interface Response {
    surveyId: number,
    responseValues: ResponseValue[]
}

/**
 * The app-wide state type
 */
export interface AppState {
    surveysValid : boolean,
    surveys: Survey[] | null,
    responseCurrent: Response | null,
    testMessage: string | null,
    questionIdIterator: number,
    surveyIdIterator: number,
    selectedSurvey: Survey | null,
    loggedIn: boolean,
}


//ACTUAL INITIAL STATE
export const dummySurvey: Survey = {
    id: 0,
    name: "Test Survey",
    questions: [
        {
            id: 0,
            type: 0,
            prompt: "Some question",
        }
    ]
}
/**
 * The initial state of the app
 */
export const initialState: AppState = {
    surveysValid: false,
    surveys: [dummySurvey],
    responseCurrent: null,
    testMessage: null,
    questionIdIterator: 1,
    surveyIdIterator: 1,
    selectedSurvey: dummySurvey,
    loggedIn: false,
}


//APP WIDE CONTEXT VAR

export interface AppContextInterface {
    state : AppState,
    dispatch: Dispatch<any>,
}

export let initialContext: AppContextInterface = {
    state: initialState,
    dispatch: () => {},
}