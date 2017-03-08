import React, { Component } from 'react';
import { render } from 'react-dom';
import Accordion from './Accordion';
import { removeArrayElement } from './../helpers';
import MainTitleConfig from './MainTitleConfig';
import GroupOneConfig from './GroupOneConfig';
import GroupTwoConfig from './GroupTwoConfig';
import FieldConfig from './FieldConfig';
import StandardPanelInput from './Panel/StandardPanelInput';
import OptionalPanelInput from './Panel/OptionalPanelInput';

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

    	const configType = document.getElementById("panelWrapper").getAttribute("configtype");
		let newJsonData = {...this.state.jsonData},
			newGroupOneToEdit = {...this.state.groupOneToEdit},
			newGroupTwoToEdit = {...this.state.groupTwoToEdit},
			fieldToEdit = {...this.state.fieldToEdit};

		switch(configType) {
			case 'main':
				newJsonData.title = $('#inputTitle').val();
    			newJsonData.valid_from = $('#dateMainTitle').val();
    			newJsonData.valid_to = $('#endDateMainTitle').val();

    			this.props.changeJSON(newJsonData);
    			break;

    		case 'groupOne':
    			const cols = $('#colSelect').val();

    			newGroupOneToEdit.title = $('#inputTitle').val();
    			newGroupOneToEdit.clearBefore = $("#idClearBefore").is(":checked") ? true : false;
			    newGroupOneToEdit.clearAfter = $("#idClearAfter").is(":checked") ? true : false;
			    newGroupOneToEdit.collapse = $("#idCollapse").is(":checked") ? true : false;
			    newGroupOneToEdit.autocollapse = $("#idAutoCollapse").is(":checked") ? true : false;

    			if (cols !== "") {
    				newGroupOneToEdit.cols = Number($('#colSelect').val());
    			}

    			this.props.changeGroupOne(newGroupOneToEdit);
    			break;
		}

    	$('.config-wrapper').addClass('display-hidden');
    	$('#panelWrapper').removeAttr('configtype');
    	$('#dateMainTitle').removeAttr('required');
    	$('#endDateMainTitle').removeAttr('required');
    }

    componentWillMount() {
    	this.props.changeJSON(this.state.jsonData);
    }

    componentDidMount() {
        $("input").keypress( function(e) {
		    let chr = String.fromCharCode(e.which);
		    if (!("_".indexOf(chr) < 0))
		        return false;
		});
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

    render() {
    	return (
    		<div id="configuratorWrapper">
				<div className="col-md-8">
					<Accordion {...this.props}/>
				</div>
				<div className="col-md-4 editor-panel">
					<h2>Konfigurationspanel</h2>
					<div id="panelWrapper">
						<form onSubmit={(e) => this.handleFieldData(e)}>
							<StandardPanelInput {...this.props} />
							<br/>
							<OptionalPanelInput {...this.props} />
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