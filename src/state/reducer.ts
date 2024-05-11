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

        //adding a survey
        case StateActions.ADD_SURVEY: {
            let newSurvey: Survey = {
                id: 0,
                name: "fdsa",
                questions: [],
            }
            if(newState.surveys){
                if(!newState.surveys.find(survey => survey.id === newSurvey.id)){
                    newState.surveys = [...newState.surveys,newSurvey]
                }
            } else {
                newState.surveys = [newSurvey]
            }
            if(!newState.selectedSurvey){
                newState.selectedSurvey = newSurvey
            }
            newState.surveyIdIterator = newSurvey.id + 1
            console.log(newState)
        } break

        //adding a question
        case StateActions.ADD_QUESTION: {
            const survey: Survey = action.value.survey
            const newQuestion: Question = action.value.question
            if(!survey.questions.find(question => question.id === newQuestion.id)){
                survey.questions = [...survey.questions,newQuestion]
            }
            newState.questionIdIterator = newQuestion.id + 1
            console.log(newState)
        } break

        //removing a question
        case StateActions.REMOVE_QUESTION: {
            const survey: Survey = action.value.survey
            const toRemove: Question = action.value.question
            survey.questions = survey.questions.filter(question => question.id !== toRemove.id)
            console.log(newState)
        } break

        //change prompt
        case StateActions.QUESTION_PROMPT_CHANGE: {
            const question: Question = action.value.question
            const prompt: string = action.value.prompt
            question.prompt = prompt
            console.log(newState)
        } break

    }

    return newState
}