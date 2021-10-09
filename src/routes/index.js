import React from 'react';
import PatientTable from "../views/patientView/patientTable"
import QuestionnaireView from "../views/questionnaireView/questionnaireForm"

const routes = [
    {
        path: "/patients",
        render: function(){
            return <PatientTable />
        },
        exact: true,
    },
    {
        path: "/questionnaire",
        render: function(){
            return <QuestionnaireView/>
        },
        exact: true,
    }
]
export default routes