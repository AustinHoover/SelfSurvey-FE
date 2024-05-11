import { Question, Survey } from "./interface"


/**
 * Types of app-wide actions that can be taken (eg login)
 */
export enum StateActions {
    LOGIN,
    SET_SURVEY_LIST,
    ADD_SURVEY,
    DELETE_SURVEY,
    ADD_QUESTION,
    REMOVE_QUESTION,
    QUESTION_PROMPT_CHANGE,
}



//constructors for individual action objects


export const createActionSetSurveyList = (surveyList: any[]) => {
    return {
        type: StateActions.SET_SURVEY_LIST,
        value: surveyList,
    }
}

export const createActionAddSurvey = () => {
    return {
        type: StateActions.ADD_SURVEY,
    }
}

export const createActionAddQuestion = (survey: Survey, question: Question) => {
    return {
        type: StateActions.ADD_QUESTION,
        value: {
            survey: survey,
            question: question,
        }
    }
}

export const createActionRemoveQuestion = (survey: Survey, question: Question) => {
    return {
        type: StateActions.REMOVE_QUESTION,
        value: {
            survey: survey,
            question: question,
        }
    }
}

export const createActionQuestionPromptChange = (question: Question, prompt: string) => {
    return {
        type: StateActions.QUESTION_PROMPT_CHANGE,
        value: {
            question: question,
            prompt: prompt,
        }
    }
}