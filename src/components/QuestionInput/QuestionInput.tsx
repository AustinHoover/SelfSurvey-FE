import * as React from "react";
import { Question, Survey } from "../../state/interface";
import { appContext } from "../../entry/app";
import { createActionQuestionPromptChange, createActionRemoveQuestion } from "../../state/actions";

/**
 * Props
 */
export interface QuestionInputProps {
    question: Question,
    surveyInstanceState: any,
    surveyInstanceStateUpdate: React.Dispatch<any>,
}

/**
 * An element to edit a question
 * @param props props
 * @returns the element
 */
const QuestionInput = (props : QuestionInputProps) => {
    //get context
    const appStateContext = React.useContext(appContext);
    const state = appStateContext.state
    const dispatch = appStateContext.dispatch


    //input buttons
    const numberInputs: JSX.Element[] = []
    for(let i = 1; i < 11; i++){
        //logic when you click the number button
        const onUpdateState = () => {
            let newData: any = {
                ...props.surveyInstanceState
            }
            newData[props.question.id] = i
            props.surveyInstanceStateUpdate(newData)
        }
        
        //determine what element is
        //todo: just conditional the style object instead of whole element
        let element: JSX.Element
        if(props.surveyInstanceState?.[props.question.id] && props.surveyInstanceState[props.question.id] === i){
            element = <button
            className="btn border border-secondary"
            style={{
                width: "100px",
                height: "100px",
                marginRight: "30px",
                backgroundColor: "blue",
            }}
            onClick={()=>{onUpdateState()}}
            >
                {i}
            </button>
        } else {
            element = <button
            className="btn border border-secondary"
            style={{
                width: "100px",
                height: "100px",
                marginRight: "30px",
            }}
            onClick={()=>{onUpdateState()}}
            >
                {i}
            </button>
        }

        //add actual element
        numberInputs.push(element)
    }

    return (
        <div
        className="m-4 p-4 border border-secondary d-flex flex-column justify-content-between"
        style={{
            borderRadius: "4px",
        }}
        >
            <div className="m-5">
                {props.question.prompt}
            </div>
            <div
            className="d-flex flex-row"
            style={{
                overflow: "scroll"
            }}
            >
                {numberInputs}
            </div>
        </div>
    );
}

export default QuestionInput;