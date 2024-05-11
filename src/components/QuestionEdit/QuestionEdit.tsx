import * as React from "react";
import { Question, Survey } from "../../state/interface";
import { APIURL, appContext } from "../../entry/app";
import { createActionSetSurveyList } from "../../state/actions";

/**
 * Props
 */
export interface QuestionEditProps {
    survey: Survey,
    question: Question
}

/**
 * An element to edit a question
 * @param props props
 * @returns the element
 */
const QuestionEdit = (props : QuestionEditProps) => {
    //get context
    const appStateContext = React.useContext(appContext);
    const state = appStateContext.state
    const dispatch = appStateContext.dispatch


    const [promptState, setPromptState] = React.useState(props.question.prompt)

    //when you click the x button
    const onDeleteQuestion = () => {
        const response = fetch(APIURL + '/survey/removeQuestion/' + props.survey.id + '/' + props.question.id,{
            method: "GET",
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

    //when you type
    const onChangePrompt = (newValue: string) => {
        setPromptState(newValue)
    }

    //when you press the button to update the prompt
    const onUpdatePrompt = () => {
        const body: Question = {
            ...props.question,
            prompt: promptState,
        }
        const response = fetch(APIURL + '/survey/updateQuestion/' + props.survey.id + '/' + props.question.id,{
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
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

    return (
        <div
        className="m-4 p-4 border border-secondary d-flex justify-content-between"
        style={{
            borderRadius: "4px",
        }}
        >
            <input
            type="text"
            value={promptState}
            onChange={(event)=>{onChangePrompt(event.target.value)}}
            ></input>

            <button
            className="btn btn-secondary"
            onClick={()=>{onUpdatePrompt()}}
            >
                Update Prompt
            </button>
            
            <button
            className="btn btn-danger"
            onClick={()=>{onDeleteQuestion()}}
            >X</button>
        </div>
    );
}

export default QuestionEdit;