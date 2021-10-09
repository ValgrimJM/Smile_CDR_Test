import React, { Component } from 'react'
import questionJSON from "../../assets/questionnaire.json"

class QuestionnaireView extends Component{
    constructor(props){
        super(props)
        this.state = {
            formElements :[],
            formValues: {},
            displayValues: {},
            responseJSON: {}
        }
    }
    componentDidMount(){
        let formElements = questionJSON.item.map((item, itemIndex) => {
            return <div className="form_group" key={itemIndex} id={item.linkId}>
                <label className="form_label" htmlFor={item.linkId}>{item.text}</label>
                {this.renderFormElement(item)}
            </div>
        })
        let formValues = {};
        questionJSON.item.forEach(item => {
            formValues[item.linkId] = ""
        })
        this.setState({formElements, formValues})
    }
    renderFormElement(item, key){
        switch(item.type){
            case "boolean":
                return <div className="input_group" onChange={(e) => this.onInputChange(e, item.linkId)}>
                    <input type="radio" value="True" name={item.linkId}/>
                    <label className="form_label" htmlFor="True">True</label>
                    <input type="radio" value="False" name={item.linkId} id=""/>
                    <label className="form_label" htmlFor="False">False</label>
                </div>
            case "choice":
                return <select name={item.linkId} defaultValue="none" onChange={(e) => this.onInputChange(e, item.linkId)}>
                    <option value="none" disabled>-select an option-</option>
                    {item.option.map((choice, cIndex) => {
                        return <option key={cIndex} value={choice.valueCoding.code}>{choice.valueCoding.display}</option>
                    })}
                </select>
            case 'date':
                return <input type="date" name={item.linkId} onChange={(e) => this.onInputChange(e, item.linkId)}/>
            case 'string':
                return <input type="text" name={item.linkId} onChange={(e) => this.onInputChange(e, item.linkId)}/>
            default:
            return null;
        }
    }
    onInputChange(e, id){
        let newValues = {...this.state.formValues}
        newValues[id] =  e.target.value;
        this.setState({formValues: newValues})
    }
    submitQuestionnaire(e){
        e.preventDefault()
        let hasErrors = false;
        Object.keys(this.state.formValues).forEach(val => {
            if(this.state.formValues[val] === ""){
                document.getElementById(val).classList.add("error")
                hasErrors = true;
            }
            else{
                document.getElementById(val).classList.remove("error")
            }
        })
        if(hasErrors === false){
            let responseJSON ={
            "resourceType" : "QuestionnaireResponse",
            "identifier" : `J-${questionJSON.id}`, 
            "questionnaire": questionJSON.id, 
            "status" : "completed", 
            "subject" : questionJSON.subjectType,
            "authored": `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`, 
            "author" : "James MacDonald", 
            "source" : "SmileCDR Evaluator",
            "item": questionJSON.item.map(it => {
                return {
                    linkId: it.linkId,
                    text: it.text,
                    answer: [{
                        [`value${it.type.charAt(0).toUpperCase() + it.type.slice(1)}`] :  this.state.formValues[it.linkId],
                    }]
                }
            })
        }
            this.setState({ displayValues: { ...this.state.formValues }, responseJSON: JSON.stringify(responseJSON, undefined, 4)})
        }
    }
    displayJSON(){
        document.getElementById("JSONDisplay").classList.add('visible')
    }
    render(){        
        return(
            <main className="question_view">
                <form className="question_form" onSubmit={(e) => this.submitQuestionnaire(e)}>
                {this.state.formElements}
                    <button>Submit Questionnaire</button>
                </form>
                {Object.keys(this.state.displayValues).length > 0 ? 
                <div className="results_display">
                    <h4>Thank you, your submitted values are:</h4>
                    {Object.keys(this.state.displayValues).map((val, valKey) =>{
                        return <div className="result_group">
                            <span> {questionJSON.item[val - 1].text}</span>
                            <span>{this.state.displayValues[val]}</span>
                        </div>
                    })}
                    <button onClick={() => this.displayJSON()}>Display QuestionnaireResponse JSON</button>
                    <pre id="JSONDisplay">
                            {this.state.responseJSON}
                    </pre>
                </div>
                :
                null}
            </main>
        )
    }
}

export default QuestionnaireView