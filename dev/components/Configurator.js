import React, { Component } from 'react';
import { render } from 'react-dom';
import Accordion from './Accordion';
import { removeArrayElement } from './../helpers';
import { completeValidation } from './../helpers';
import StandardInput from './Panel/StandardInput';
import OptionalInput from './Panel/OptionalInput';
import Parameters from './Panel/Parameters';

class Configurator extends Component {

	constructor(props) {
	    super(props);

	    this.handleFieldData = this.handleFieldData.bind(this);
	    
	    this.state = {
	  		jsonData: this.props.store.database.jsonData,
	  		groupOneToEdit: this.props.store.database.groupOneToEdit,
	  		groupTwoToEdit: this.props.store.database.groupTwoToEdit,
	  		fieldToEdit: this.props.store.database.fieldToEdit
	    };
    }

    handleFieldData(event) {
    	event.preventDefault();

    	const configType = document.getElementById("panelWrapper").getAttribute("configtype"),
    		  groupOneKey = document.getElementById("panelWrapper").getAttribute("grouponekey"),
        	  optionsLength = $(".options-inputs").toArray().length,
    	      cols = $('#colSelect').val();

		let newJsonData = {...this.state.jsonData},
			newGroupOneToEdit = {...this.state.groupOneToEdit},
			newGroupTwoToEdit = {...this.state.groupTwoToEdit},
			newFieldToEdit = {...this.state.fieldToEdit},
            validationValue = JSON.parse(JSON.stringify(eval("(" + $('#validationTextArea').val() + ")"))),
            validationRequired = $('#idValRequired').is(":checked") ? true : false,
            access = JSON.parse(JSON.stringify(eval("(" + $('#accessTextArea').val() + ")")));

		switch(configType) {
			case 'main':
				newJsonData.title = $('#inputTitle').val();
    			newJsonData.valid_from = $('#dateMainTitle').val();
    			newJsonData.valid_to = $('#endDateMainTitle').val();

    			this.props.changeJSON(newJsonData);
    			break;

    		case 'groupOne':
    			newGroupOneToEdit.title = $('#inputTitle').val();
    			newGroupOneToEdit.clearBefore = $("#idClearBefore").is(":checked") ? true : false;
			    newGroupOneToEdit.clearAfter = $("#idClearAfter").is(":checked") ? true : false;
			    newGroupOneToEdit.collapse = $("#idCollapse").is(":checked") ? true : false;
			    newGroupOneToEdit.autocollapse = $("#idAutoCollapse").is(":checked") ? true : false;
                newGroupOneToEdit.validation = completeValidation(validationRequired, validationValue);

    			if (cols !== "") {
    				newGroupOneToEdit.cols = Number($('#colSelect').val());
    			}

    			this.props.changeGroupOne(newGroupOneToEdit);
    			break;

    		case 'groupTwo':
    			newGroupTwoToEdit.title = $('#inputTitle').val();
    			newGroupTwoToEdit.clearBefore = $("#idClearBefore").is(":checked") ? true : false;
			    newGroupTwoToEdit.clearAfter = $("#idClearAfter").is(":checked") ? true : false;
			    newGroupTwoToEdit.collapse = $("#idCollapse").is(":checked") ? true : false;
			    newGroupTwoToEdit.autocollapse = $("#idAutoCollapse").is(":checked") ? true : false;
                newGroupTwoToEdit.validation = $('#validationTextArea').val();
                newGroupTwoToEdit.validation = completeValidation(validationRequired, validationValue);

    			if (cols !== "") {
    				newGroupTwoToEdit.cols = Number($('#colSelect').val());
    			}

    			this.props.changeGroupTwo(newGroupTwoToEdit, groupOneKey);
    			this.props.setAccordionToOpen(groupOneKey);
    			break;

    		case 'field':
    			let groupKeys = newFieldToEdit.group.split('|'),
    				fieldType = $('#fieldType').val();

    			newFieldToEdit['parameters'] = {};

    			if (cols !== "") {
    				newFieldToEdit.cols = Number($('#colSelect').val());
    			}

    			newFieldToEdit.title = $('#inputTitle').val();
    			newFieldToEdit.type = fieldType;
    			newFieldToEdit.exportKey = $('#inputExportKey').val();
    			newFieldToEdit.tooltip = $('#inputTooltip').val();
    			newFieldToEdit.clearBefore = $("#idClearBefore").is(":checked");
    			newFieldToEdit.clearAfter = $("#idClearAfter").is(":checked");
                newFieldToEdit.validation = completeValidation(validationRequired, validationValue);
                newFieldToEdit.access = access;
    			newFieldToEdit.edited = true;

    			switch(fieldType) {
    				case 'code':
    					newFieldToEdit.parameters.css = $('#cssParam').val();
        				newFieldToEdit.parameters.html = $('#htmlParam').val();
        				newFieldToEdit.parameters.js = $('#jsParam').val();
    					break;

    				case 'text':
    					newFieldToEdit.parameters.class = $('#idTextClass').val();
        				newFieldToEdit.parameters.placeholder = $('#idTextPlaceholder').val();
        				newFieldToEdit.parameters.width = $('#idTextWidth').val();
    					break;

    				case 'textarea':
    					newFieldToEdit.parameters.class = $('#idTextClass').val();
        				newFieldToEdit.parameters.placeholder = $('#idTextPlaceholder').val();
        				newFieldToEdit.parameters.width = $('#idTextWidth').val();

        			case 'check':
    					newFieldToEdit.parameters.inline = $("#idInline").is(":checked") ? true : false;
        				newFieldToEdit.parameters.inlineBreak = $("#idInlineBreak").is(":checked") ? true : false;
        				newFieldToEdit.parameters.options = [];

        				for (var i = 0; i < optionsLength; i++) {
        					let obj = {
        						title: $('#modalTitle_' + i.toString()).val(),
        						value: $('#modalValue_' + i.toString()).val(),
        						score: $('#modalScore_' + i.toString()).val(),
        						default: $('#modalDefault_' + i.toString()).is(":checked") ? true : false
        					}

        					newFieldToEdit.parameters.options.push(obj);
        				}        				
        				break;

        			case 'radio':
    					newFieldToEdit.parameters.inline = $("#idInline").is(":checked") ? true : false;
        				newFieldToEdit.parameters.inlineBreak = $("#idInlineBreak").is(":checked") ? true : false;
        				newFieldToEdit.parameters.options = [];

        				for (var i = 0; i < optionsLength; i++) {
        					let obj = {
        						title: $('#modalTitle_' + i.toString()).val(),
        						value: $('#modalValue_' + i.toString()).val(),
        						score: $('#modalScore_' + i.toString()).val(),
        						default: $('#modalDefault_' + i.toString()).is(":checked") ? true : false
        					}

        					newFieldToEdit.parameters.options.push(obj);
        				}        				
        				break;

        			case 'select':
        				newFieldToEdit.parameters.multiple = $("#idMultiple").is(":checked") ? true : false;
        				newFieldToEdit.parameters.container = JSON.parse(JSON.stringify(eval("(" + $('#textAreaContainer').val() + ")")));
        				newFieldToEdit.parameters.options = [];

        				for (var i = 0; i < optionsLength; i++) {
        					let obj = {
        						title: $('#modalTitle_' + i.toString()).val(),
        						value: $('#modalValue_' + i.toString()).val(),
        						score: $('#modalScore_' + i.toString()).val(),
        						default: $('#modalDefault_' + i.toString()).is(":checked") ? true : false
        					}

        					newFieldToEdit.parameters.options.push(obj);
        				}        				
        				break;

    			}

    			this.props.changeField(newFieldToEdit);
    			this.props.changeFieldToEdit(newFieldToEdit);
    			this.props.setSubAccordionToOpen(groupKeys);
    			break;
		}

    	$('.config-wrapper').addClass('display-hidden');
    	$('#panelWrapper').removeAttr('configtype');
    	$('#dateMainTitle').removeAttr('required');
    	$('#endDateMainTitle').removeAttr('required');
    	$('#inputExportKey').removeAttr('required');

    	localStorage.setItem('jsonData', JSON.stringify(newJsonData, null, 2));
    }

    componentWillMount() {
    	this.props.changeJSON(this.state.jsonData);
    }

    componentDidMount() {
    	var self = this;

        $("input").keypress( function(e) {
		    let chr = String.fromCharCode(e.which);
		    if (!("_".indexOf(chr) < 0))
		        return false;
		});

		$('#dateMainTitle').val(this.state.jsonData.valid_from);
		$('#endDateMainTitle').val(this.state.jsonData.valid_to);
  	}

  	componentWillReceiveProps(nextProps) {
	    let newJsonData = nextProps.store.database.jsonData,
	    	newFieldToEdit = nextProps.store.database.fieldToEdit,
	    	newGroupOneToEdit = nextProps.store.database.groupOneToEdit,
	    	newGroupTwoToEdit = nextProps.store.database.groupTwoToEdit,
	        jsonData = {...this.state.jsonData},
	        fieldToEdit = {...this.state.fieldToEdit},
	        groupOneToEdit = {...this.state.groupOneToEdit},
	        groupTwoToEdit = {...this.state.groupTwoToEdit};

	    var self = this;

	    jsonData = newJsonData;
	    fieldToEdit = newFieldToEdit;
	    groupOneToEdit = newGroupOneToEdit;
	    groupTwoToEdit = newGroupTwoToEdit;

	    this.setState({
	        jsonData,
	        fieldToEdit,
	        groupOneToEdit,
	        groupTwoToEdit
	    });
	}

	componentDidUpdate() {
		$('#dateMainTitle').val(this.state.jsonData.valid_from);
		$('#endDateMainTitle').val(this.state.jsonData.valid_to);
	}

    render() {
    	return (
    		<div id="configuratorWrapper">
				<div id="idAccWrapper" className="col-md-8">
					<Accordion {...this.props}/>
				</div>
				<div className="col-md-4 editor-panel">
					<h2>Konfigurationspanel</h2>
					<div id="panelWrapper">
						<form onSubmit={(e) => this.handleFieldData(e)}>
							<StandardInput {...this.props} />
							<br/>
							<OptionalInput {...this.props} />
							<br/>
							<Parameters {...this.props} />
                            <div className="config-wrapper val-access-wrapper">
								<div id="idValidationWrapper" className="div-margin display-hidden">
									<p className="heading-parameter">Validation (Eingabe des JSON-Objekts)</p>
									<textarea className="div-margin form-control textarea-container" rows="5" id="validationTextArea" placeholder='{"property": "", ...}'></textarea>
									<div className="row vertical-align">
							     		<div id="fillerValLeft" className="input-group col-xs-5"></div>
							            <div id="idValRequiredWrapper" className="input-group col-xs-2">
							                <label className="label-check"><input id="idValRequired" type="checkbox" value="valRequired" />  required</label>
							            </div>
							            <div id="fillerValRight" className="input-group col-xs-5"></div>
							        </div>
								</div>
								<div id="idAccessWrapper" className="div-margin display-hidden config-wrapper">
									<p className="heading-parameter">Access (Eingabe des JSON-Objekts)</p>
									<textarea className="div-margin form-control textarea-container" rows="5" placeholder='{"property": "", ...}' id="accessTextArea"></textarea>
								</div> 
                            </div>
                            <div id="submitButtonWrapper" className="config-wrapper display-hidden">
                                <button type="submit" className="btn btn-primary btn-field-confirm">Bestätigen</button>
                            </div>
						</form>
					</div>
				</div>
			</div>
		);
    }
}

export default Configurator;