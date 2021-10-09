import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as actions from "../../state/patients/actions"

class PatientTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            invalidInputs: '',
            values:[]
        }
    }
    componentDidMount(){
        this.props.getPatients()
    }
    searchInputChange(key, e){
        let newValues = [...this.state.values]
        let newInvalid = ''
        const letterRegex = /[A-Za-z]/;
        
        if (e.target.value === "" || letterRegex.test(e.target.value) === true){
            e.target.classList.remove('invalid')
            if(document.getElementsByClassName('invalud').length === 0){
                newInvalid = ""
            }
        }
        else {
            newInvalid = "Values must be comprised of letter characters only"
            e.target.classList.add('invalid')
        }
        newValues[key] = e.target.value
        this.setState({ values: newValues, invalidInputs: newInvalid})
        
    }   
    submitSearchNames(e){
        e.preventDefault()        
        const letterRegex = /[A-Za-z]/;
        this.state.values.forEach(val => {
            if (letterRegex.test(val) === false) {
                this.setState({ invalidInputs: "Values must be comprised of letter characters only" })
            }
        })
        let filterVals = this.state.values.filter(val => !!val)
        if(filterVals.length > 0){
            // submit search if at least one value exists
            this.props.searchPatients(this.state.values)
        }
        else{
            this.setState({invalidInputs: "There must be at least one value to submit a search"})
        }
        

    }
    render(){
        return(
            <main className="patient_view">
                <table className="patient_table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Birth Date</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* only display rows if they exist */}
                        {!!this.props.patients.patientTotal ? this.props.patients.patientList.map((patient, pIndex) => {
                            return <tr key={pIndex}>
                                {/* Middle name is displayed as it is relevant to the search results */}
                                <td>{`${patient.resource.name[0].given[0]} 
                                ${!!patient.resource.name[0].given[1] ? `(${patient.resource.name[0].given[1]})`: ''}`}</td>
                                <td>{patient.resource.name[0].family}</td>
                                <td>{!!patient.resource.birthDate ? patient.resource.birthDate : "-"}</td>
                                <td>{!!patient.resource.address ? patient.resource.address[0].line[0] : "-"}</td>

                                <td>{!!patient.resource.gender ? patient.resource.gender : "-"}</td>
                                <td>{!!patient.resource.telecom ? patient.resource.telecom[0].value : "-"}</td>
                            </tr>
                        })
                        :
                        null}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <span>Request Time</span>
                            </td>
                            <td> {this.props.patients.requestLength.toFixed(2)} milliseconds.</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <form className="search_input_form" onSubmit={(e) => this.submitSearchNames(e)}>
                    <span className={`error_message ${this.state.invalidInputs === '' ? '' : 'visible'}`} id="input_error">{this.state.invalidInputs}</span>
                    <label htmlFor="first_name">First Name</label>
                    <input className="first_name" name="first_name" key="0" onChange={(e) => this.searchInputChange("0",e)} type="text"/>
                    <label htmlFor="last_name">Last Name</label>
                    <input className="last_name" name="last_name" key="1" onChange={(e) => this.searchInputChange("1",e)} type="text"/>
                    <button >Search Patients</button>
                </form>
                {this.props.patients.searchResults.length > 0 ? 
                    <table className="search_table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Birth Date</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!this.props.patients.searchTotal ? this.props.patients.searchResults.map((res, rIndex) => {
                                return <tr key={rIndex}>
                                    {/* Middle name is displayed as it is picked up when searching via 'given' */}
                                    <td>{`${res.resource.name[0].given[0]} ${!!res.resource.name[0].given[1] ? `(${res.resource.name[0].given[1]})` : ''}`}</td>
                                    <td>{res.resource.name[0].family}</td>
                                    <td>{!!res.resource.birthDate ? res.resource.birthDate : "-"}</td>
                                    <td>{!!res.resource.address ? res.resource.address[0].line[0] : "-"}</td>

                                    <td>{!!res.resource.gender ? res.resource.gender : "-"}</td>
                                    <td>{!!res.resource.telecom ? res.resource.telecom[0].value : "-"}</td>
                                </tr>
                            })
                            :
                            null}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    Request Time
                                </td>
                                <td>
                                    {this.props.patients.searchLength.toFixed(2)} milliseconds.
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><button onClick={() => this.props.clearSearch()}>Clear Table</button></td>
                            </tr>
                        </tfoot>
                    </table>
                    :
                    this.props.patients.searchLength > 0 ?

                    <div className="no_results">
                        <span>No results available for that search term</span>
                    </div> 
                    : null
                    
                }
            </main>
        )
    }
}

const mapStateToProps = state => {    
    return{
        patients: state.patients
    }
}
const mapDispatchToProps = dispatch => {
    return{
        getPatients(){
            dispatch(actions.getPatients())
        },
        searchPatients(vals){
            dispatch(actions.searchPatients(vals))
        },
        clearSearch(){
            dispatch(actions.clearSearch())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PatientTable);