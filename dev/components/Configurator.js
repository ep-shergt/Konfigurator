import React, { Component } from 'react';
import { render } from 'react-dom';
import Accordion from './Accordion';
import { removeArrayElement } from './../helpers';
import StandardPanelInput from './Panel/StandardPanelInput';
import OptionalPanelInput from './Panel/OptionalPanelInput';
import Parameters from './Panel/Parameters';

class Configurator extends Component {

	constructor(props) {
	    super(props);

	    this.handleFieldData = this.handleFieldData.bind(this);
	    this.sticky_relocate = this.sticky_relocate.bind(this);
	    
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
    	      cols = $('#colSelect').val();
		let newJsonData = {...this.state.jsonData},
			newGroupOneToEdit = {...this.state.groupOneToEdit},
			newGroupTwoToEdit = {...this.state.groupTwoToEdit},
			newFieldToEdit = {...this.state.fieldToEdit};

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
    			}

    			this.props.changeField(newFieldToEdit);
    			this.props.setSubAccordionToOpen(groupKeys);
    			break;
		}

    	$('.config-wrapper').addClass('display-hidden');
    	$('#panelWrapper').removeAttr('configtype');
    	$('#dateMainTitle').removeAttr('required');
    	$('#endDateMainTitle').removeAttr('required');
    	$('#inputExportKey').removeAttr('required');
    }

    componentWillMount() {
    	this.props.changeJSON(this.state.jsonData);
    }

    componentDidMount() {
    	const exportKey = this.state.fieldToEdit.exportKey;
    	var self = this;

        $("input").keypress( function(e) {
		    let chr = String.fromCharCode(e.which);
		    if (!("_".indexOf(chr) < 0))
		        return false;
		});

		$('#dateMainTitle').val(this.state.jsonData.valid_from);
		$('#endDateMainTitle').val(this.state.jsonData.valid_to);
		if (exportKey !== undefined && exportKey !== "") {
			$('#inputExportKey').val(this.state.fieldToEdit.exportKey);
		} else {
			$('#inputExportKey').val('exportKey');
		}

		$(function() {
	    	$(window).scroll(self.sticky_relocate);
	    	self.sticky_relocate();
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

	    $(function() {
	    	$(window).scroll(self.sticky_relocate);
	    	self.sticky_relocate();
		});
	}

	componentDidUpdate() {
		const exportKey = this.state.fieldToEdit.exportKey;

		$('#dateMainTitle').val(this.state.jsonData.valid_from);
		$('#endDateMainTitle').val(this.state.jsonData.valid_to);
		if (exportKey !== undefined && exportKey !== "") {
			$('#inputExportKey').val(this.state.fieldToEdit.exportKey);
		} else {
			$('#inputExportKey').val('exportKey');
		}
	}

	sticky_relocate() {
	    /*var window_top = $(window).scrollTop();
	    var div_top = $('#sticky-anchor').offset().top;
	    
	    if (window_top > div_top) {
	        $('#sticky').addClass('stick');
	        $('#sticky-anchor').height($('#sticky').outerHeight());
	    } else {
	        $('#sticky').removeClass('stick');
	        $('#sticky-anchor').height(0);
	    }*/
	}

    render() {
    	return (
    		<div id="configuratorWrapper">
				<div className="col-md-8">
					<Accordion {...this.props}/>
				</div>
				<div className="col-md-4 editor-panel">
					<div id="sticky-anchor"></div>
					<div id="sticky">
						<h2>Konfigurationspanel</h2>
						<div id="panelWrapper">
							<form onSubmit={(e) => this.handleFieldData(e)}>
								<StandardPanelInput {...this.props} />
								<br/>
								<OptionalPanelInput {...this.props} />
								<br/>
								<Parameters {...this.props} />
								<div id="submitButtonWrapper" className="config-wrapper display-hidden">
									<button type="submit" className="btn btn-primary btn-field-confirm">Bestätigen</button>
								</div> 
							</form>
						</div>
					</div>
				</div>
			</div>
		);
    }
}

export default Configurator;