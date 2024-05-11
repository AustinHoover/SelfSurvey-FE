import * as React from "react";
import { APIURL, appContext } from "../../entry/app";
import { createActionAddQuestion, createActionAddSurvey } from "../../state/actions";
import { Question, ResponseValue, Survey } from "../../state/interface";
import QuestionEdit from "../../components/QuestionEdit/QuestionEdit";
import DefaultNavbar from "../../components/DefaultNavbar/DefaultNavbar";
import QuestionInput from "../../components/QuestionInput/QuestionInput";


const TakeSurvey = () => {
    //get context
    const appStateContext = React.useContext(appContext);
    const state = appStateContext.state
    const dispatch = appStateContext.dispatch


    const [surveyInstanceState, setSurveyInstanceState] = React.useState<any>({})


    //construct question inputs
    const questionElements: JSX.Element[] = []
    if(state.selectedSurvey){
        state.selectedSurvey.questions.forEach(question => {
            questionElements.push(<QuestionInput question={question} surveyInstanceState={surveyInstanceState} surveyInstanceStateUpdate={setSurveyInstanceState}/>)
        })
    }

    const onClickSubmit = () => {
        //group all values into a list
        const surveyKeys: string[] = Object.keys(surveyInstanceState)
        const valuesList = surveyKeys.map(key => {
            const value: ResponseValue = {
                questionId: +key,
                value: surveyInstanceState[key],
            }
            return value
        })
        console.log(valuesList)
        const response = fetch(APIURL + '/surveyresponse/add/' + state.selectedSurvey?.id,{
            method: "GET",
            credentials: 'include',
        }).then(
            (response) => response.text()).then(
        (text)=>{
            console.log(text)
            fetch(APIURL + "/surveyresponse/value/addall/" + text,{
                method: "POST",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valuesList),
            })
            .then(resp => resp.text())
            .then(resp => {
                console.log(resp)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    //return
    return(
        <div>
            <header>
                <DefaultNavbar name={"Edit"}/>
            </header>
            <div className="w-100 d-flex justify-content-center">Survey</div>
            <div className="col">
                {questionElements}
            </div>
            <button
            className="btn btn-success"
            onClick={()=>{onClickSubmit()}}
            >
                Submit
            </button>
        </div>
    );
}

export default TakeSurvey