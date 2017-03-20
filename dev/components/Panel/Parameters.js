import React, { Component } from 'react';
import { render } from 'react-dom';
import { isInRange } from './../../helpers';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { removeArrayElement } from './../../helpers';
import { insertArrayElement } from './../../helpers';

class Parameters extends Component {

	constructor(props) {
	    super(props);

	    this.addElements = this.addElements.bind(this);
	    this.updateFieldToEdit = this.updateFieldToEdit.bind(this);
	    this.generateElements = this.generateElements.bind(this);
	    this.removeElement = this.removeElement.bind(this);

	    this.state = {
		    jsonData: this.props.store.database.jsonData,
		    fieldToEdit: this.props.store.database.fieldToEdit,
		    fieldType: this.props.store.database.fieldType
	    };
	}

	handleWidthChange(event) {
	    let number = Number(event.target.value);

	    if(!isInRange(number, 1001)) {
	      $('#idTextWidth').val('');
	    }
	}

	updateFieldToEdit(newFieldToEdit) {
	    let fieldToEdit = {...this.state.fieldToEdit};

	    fieldToEdit = newFieldToEdit;

	    this.setState({ 
	      fieldToEdit
	    });
	}

    componentWillReceiveProps(nextProps) {
        let newJsonData = nextProps.store.database.jsonData,
        	fieldType = nextProps.store.database.fieldType,
        	newFieldToEdit = nextProps.store.database.fieldToEdit,
            jsonData = {...this.state.jsonData},
            fieldToEdit = {...this.state.fieldToEdit};

	    jsonData = newJsonData;
	    fieldToEdit = newFieldToEdit;

	    this.setState({
	        jsonData,
	        fieldType,
	        fieldToEdit,
	    });

	    if (fieldType === 'check' || fieldType === 'radio' || fieldType === 'select') {
			this.generateElements(fieldToEdit.parameters.options);
		}
    }

	addElements(event) {
		event.preventDefault();

		let fieldToEdit = {...this.state.fieldToEdit},
			obj = {
				title: "",
				value: "",
				score: "",
				default: false 
			};

		fieldToEdit.parameters.options.map((obj, i) => {
			obj.title = $('#modalTitle_' + i.toString()).val();
			obj.value = $('#modalValue_' + i.toString()).val();
			obj.score = $('#modalScore_' + i.toString()).val();
			obj.default = $('#modalDefault_' + i.toString()).is(":checked") ? true : false;
		});

		fieldToEdit.parameters.options.push(obj);

		this.setState({
			fieldToEdit
		});

		this.generateElements(fieldToEdit.parameters.options);
	}

	removeElement(event) {
		let fieldToEdit = {...this.state.fieldToEdit},
			indexForRemove = Number(event.target.id.split('_')[1]),
			self = this;

		fieldToEdit.parameters.options.map((obj, i) => {
			obj.title = $('#modalTitle_' + i.toString()).val();
			obj.value = $('#modalValue_' + i.toString()).val();
			obj.score = $('#modalScore_' + i.toString()).val();
			obj.default = $('#modalDefault_' + i.toString()).is(":checked") ? true : false;
		});

		fieldToEdit.parameters.options = removeArrayElement(fieldToEdit.parameters.options, indexForRemove);

		this.setState({
			fieldToEdit
		});

		$('#' + fieldToEdit.type + '_' + indexForRemove.toString()).animate({height: "0px"}, 300);
		setTimeout(() => {
			self.generateElements(fieldToEdit.parameters.options);
		}, 301);
	}

	generateElements(options) {
		let elemHtml = "",
			fieldType = this.state.fieldType,
			self = this,
			newOptions = options !== undefined ? options : [],
			elemArray;

		if (newOptions.length >= 0) {
			for (var i = 0; i < newOptions.length; i++) {
				let addon = '_' + i.toString(),
					id = fieldType + addon;

				elemHtml += '<div class="space-between options-inputs" id=' + id + '>' +
							    '<div class="delete-markup added">' +
							    	'<i id="delete' + addon + '" class="fa fa-times fa-2x times-style" aria-hidden="true"></i>' +
							    '</div>' +
								'<div class="div-margin dyn-elem">' +
									'<div class="qu-margin">' +
										'<div class="input-group param-input-margin">' +
								            '<span class="input-group-addon">Title</span>' +
								            '<input required id="modalTitle' + addon + '" type="text" class="form-control input-sm"' +
								                    'name="modalTitle' + addon + '" placeholder="Titel" />' +            
								        '</div>' +
								        '<div class="input-group param-input-margin">' +
								            '<span class="input-group-addon">Value</span>' +
								            '<input required id="modalValue' + addon + '" type="text" class="form-control input-sm"' +
								                   'name="modalValue' + addon + '" placeholder="Wert" />' +       
								        '</div>' +
								        '<div class="input-group param-input-margin">' + 
								            '<span class="input-group-addon">Score</span>' +
								            '<input id="modalScore' + addon + '" type="text" class="form-control input-sm"' + 
								                   'name="modalScore' + addon + '" placeholder="Score" />' +             
								        '</div>' + 
								        '<div class="param-input-margin align-center">' +
								        	'<label><input id="modalDefault' + addon + '" type="checkbox" value="default" />  Default</label>' +		            	
								        '</div>' +
							        '</div>' +
						    	'</div>' +
						    '</div>';
			}

			$('#elementsAnchor').empty();
		    $('#elementsAnchor').append(elemHtml);
		    $('.added').on('click', (event) => {
		    	self.removeElement(event);
		    });

		    elemArray = $('.options-inputs').toArray();
		    for (var j = 0; j < elemArray.length; j++) {
		    	$('#modalTitle_' + j.toString()).val(newOptions[j].title);
		    	$('#modalValue_' + j.toString()).val(newOptions[j].value);
		    	$('#modalScore_' + j.toString()).val(newOptions[j].score);
		    	$('#modalDefault_' + j.toString()).prop("checked", newOptions[j].default);
		    }
		}	
	}

	componentDidMount() {
		let type = this.state.fieldType,
			fieldToEdit = {...this.state.fieldToEdit};

		if (type === 'check' || type === 'radio' || type === 'select') {
			this.generateElements(fieldToEdit.parameters.options);
		}
	}

	render() {
	    return (
	    	<div id="idParamsWrapperForAll" className="display-hidden config-wrapper">
		      	<p id="idParamsHeader" className="heading-parameter">Typabhängige Parameter</p>
				<div id="codeParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
					<table>
						<thead>
							<tr>
								<th className="align-center">Art</th>
								<th className="align-center">Wert</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>css</th>
								<th className="th-param"><textarea className="form-control textarea-param" rows="5" id="cssParam"></textarea></th>
							</tr>
							<tr>
								<th>html</th>
								<th className="th-param"><textarea className="form-control textarea-param" rows="5" id="htmlParam"></textarea></th>
							</tr>
							<tr>
								<th>js</th>
								<th className="th-param"><textarea className="form-control textarea-param" rows="5" id="jsParam"></textarea></th>
							</tr>
						</tbody>
					</table>
				</div>
				<div id="textParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
			        <div className="input-group param-input-margin">
			            <span className="input-group-addon">Class</span>
			            <input id="idTextClass" type="text" className="form-control input-sm"
			                   name="inputTextParams" placeholder="Klasseneingabe" />            
			        </div>
			        <div className="input-group param-input-margin">
			          <span className="input-group-addon">Placeholder</span>
			          <input id="idTextPlaceholder" type="text" className="form-control input-sm"
			                 name="inputTextPHParams" placeholder="Platzhalter für Textfeld" />            
			        </div>
			        <div className="input-group param-input-margin">
			          <span className="input-group-addon">Width</span>
			          <input id="idTextWidth" type="text" className="form-control input-sm"
			                 name="inputTextWidthParams" placeholder="Breite in Pixel" onChange={this.handleWidthChange.bind(this)}/>            
			        </div>
			    </div>
			    <div id="selectParamsWrapper" className="col-xs-12 display-hidden param-wrapper">
			     	<div className="row vertical-align">
			            <div className="input-group col-xs-4">
			                <label className="label-check"><input id="idInline" type="checkbox" value="inline" />  inline</label>
			            </div>
			            <div id="fillerDiv" className="input-group col-xs-4 display-hidden param-wrapper"></div>
			            <div id="idSelectMultiple" className="input-group col-xs-4 display-hidden param-wrapper">
			                <label className="label-check"><input id="idMultiple" type="checkbox" value="multiple" />  multiple</label>
			            </div>
			            <div className="input-group col-xs-4">
			                <label className="label-check"><input id="idInlineBreak" type="checkbox" value="inlineBreak" />  inlineBreak</label>
			            </div>
			         </div>
					<div id="elementsAnchor" className="div-margin">

					</div>
	          		<span className="div-margin span-margin">Element anlegen</span>
	          		<a onClick={(e) => this.addElements(e)} className="div-margin btn  btn-success btn-sm btn-add" href="#">
						<i className="fa fa-plus fa-plus-extra" aria-hidden="true"></i>
					</a>
					<div id="idSelectContainer" className="param-wrapper div-margin">
						<span>Container</span>
						<textarea className="div-margin form-control textarea-container" rows="5" id="textAreaContainer"></textarea>
					</div>
			    </div>
			</div>
	    )
	}
}

export default Parameters;