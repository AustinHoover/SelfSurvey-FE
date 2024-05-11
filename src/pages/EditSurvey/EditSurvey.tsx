import * as React from "react";
import { APIURL, appContext } from "../../entry/app";
import { createActionSetSurveyList } from "../../state/actions";
import { Question, Survey } from "../../state/interface";
import QuestionEdit from "../../components/QuestionEdit/QuestionEdit";
import DefaultNavbar from "../../components/DefaultNavbar/DefaultNavbar";

const EditSurvey = () => {
    //get context
    const appStateContext = React.useContext(appContext);
    const state = appStateContext.state
    const dispatch = appStateContext.dispatch


    //add survey button
    let onAddSurvey = () => {
        const response = fetch(APIURL + '/survey/add',{
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

    //generate elements for all surveys that exist
    const surveyElements: JSX.Element[] = []
    state.surveys?.forEach(survey => {
        //generate question elements
        const questionElements: JSX.Element[] = []
        survey.questions.forEach(question => {
            questionElements.push(<QuestionEdit survey={survey} question={question}/>)
        })

        //actual survey elements
        const addQuestion = (survey: Survey) => {
            const question: any = {
                type: 1,
                prompt: "some prompt",
            }
            const response = fetch(APIURL + '/survey/addQuestion/' + survey.id,{
                method: "POST",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(question),
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

        //delete a survey
        const deleteSurvey = (survey: Survey) => {
            const response = fetch(APIURL + '/survey/delete/' + survey.id,{
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

        surveyElements.push(
            <div
            className="card shadow"
            style={{
                width: "500px",
                height: "500px",
            }}
            >
                {survey.name}
                <div
                style={{
                    overflow: "scroll",
                }}
                >
                    {questionElements}
                </div>
                <div>
                    <button className="btn btn-success m-3" onClick={()=>{addQuestion(survey)}}>Add Question</button>
                    <button className="btn btn-danger m-3" onClick={()=>{deleteSurvey(survey)}}>Delete Survey</button>
                </div>
            </div>
        )
    })

    //return
    return(
        <div>
            <header>
                <DefaultNavbar name={"Edit"}/>
            </header>
            <div className="w-100 d-flex justify-content-center">Add Question Screen</div>
            <div className="col">
                <div
                className="row m-5"
                >
                    <div
                    style={{
                        width: "150px"
                    }}
                    >
                        <button className="btn btn-primary" onClick={()=>{onAddSurvey()}}>Add Survey</button>
                    </div>
                </div>
                <div className="row m-5">
                    {surveyElements}
                </div>
            </div>
        </div>
    );
}

export default EditSurvey