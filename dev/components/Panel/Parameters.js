import React, { Component } from 'react';
import { render } from 'react-dom';
import { isInRange } from './../../helpers';
import {ModalContainer, ModalDialog} from 'react-modal-dialog'; 

class Parameters extends Component {

	constructor(props) {
	    super(props);

	    this.generateModalElements = this.generateModalElements.bind(this);
	    this.addElements = this.addElements.bind(this);
	    this.removeElements = this.removeElements.bind(this);
	    this.handleClick = this.handleClick.bind(this);
	    this.handleClose = this.handleClose.bind(this);

	    this.state = {
	      jsonData: this.props.store.database.jsonData,
	      fieldToEdit: this.props.store.database.fieldToEdit,
	      elementsForModal: 1,
	      fieldType: this.props.store.database.fieldType,
	      isShowingModal: false
	    };
	}

	handleWidthChange(event) {
	    let number = Number(event.target.value);

	    if(!isInRange(number, 1001)) {
	      $('#idTextWidth').val('');
	    }
	}

	handleClick(event) {
		this.setState({
			isShowingModal: true
		});
	}

	handleClose() {
		this.setState({
			isShowingModal: false
		});
	}

    componentWillReceiveProps(nextProps) {
        let newJsonData = nextProps.store.database.jsonData,
        	fieldType = nextProps.store.database.fieldType,
            jsonData = {...this.state.jsonData};

	    jsonData = newJsonData;

	    this.setState({
	        jsonData,
	        fieldType
	    });

	    this.generateModalElements(this.state.elementsForModal, fieldType);
    }

	generateModalElements(elementsForModal, fieldType) {
		let modalElements = "",
			self = this;

	    for (var i = 1; i <= elementsForModal; i++) {
	    	let id = 'cube_' + fieldType + '_' + i.toString();
	        modalElements += '<span class="span-margin cube-element">' +
				          			'<i class="fa fa-cube" aria-hidden="true" id=' + id + '></i>' +
				          	  '</span>';
	    }
	    $('#modalAnchor').empty();
	    $('#modalAnchor').append(modalElements);
	    $('.cube-element').on('click', (event) => {
	    	self.handleClick(event);
	    });
	}

	addElements(event) {
		event.preventDefault();

		let elementsForModal = this.state.elementsForModal;

		elementsForModal++;

		this.setState({
			elementsForModal
		});

		this.generateModalElements(elementsForModal, this.state.fieldType);	
	}

	removeElements(event) {
		event.preventDefault();

		let elementsForModal = this.state.elementsForModal;

		if (elementsForModal > 1) {
			elementsForModal--;
		}

		this.setState({
			elementsForModal
		});

		this.generateModalElements(elementsForModal, this.state.fieldType);	
	}

	componentDidMount() {
		this.generateModalElements(this.state.elementsForModal, this.props.store.database.fieldType);
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
			          <div id="modalEntry" className="div-margin">
			          		<div className="div-margin">Elemente für options:</div>
			          		<div id="modalAnchor"></div>
			          		<a onClick={(e) => this.removeElements(e)} className="div-margin btn  btn-danger btn-sm btn-add br-right" href="#">
  								<i className="fa fa-minus fa-plus-extra" aria-hidden="true"></i>
							</a>
							<a onClick={(e) => this.addElements(e)} className="div-margin btn  btn-success btn-sm btn-add br-left" href="#">
  								<i className="fa fa-plus fa-plus-extra" aria-hidden="true"></i>
							</a>
							{
						        this.state.isShowingModal &&
						        <ModalContainer onClose={this.handleClose}>
						            <ModalDialog onClose={this.handleClose}>
						            	<h1>Options</h1>     	
					            		<div className="input-group param-input-margin">
								            <span className="input-group-addon">title</span>
								            <input id="modalTitle" type="text" className="form-control input-sm"
								                   name="modalTitle" placeholder="Titel" />            
								        </div>
								        <div className="input-group param-input-margin">
								            <span className="input-group-addon">value</span>
								            <input id="modalValue" type="text" className="form-control input-sm"
								                   name="modalValue" placeholder="Wert" />            
								        </div>		            	
						            </ModalDialog>
						        </ModalContainer>
						    }
			          </div>
			     </div>
			</div>
	    )
	}
}

export default Parameters;