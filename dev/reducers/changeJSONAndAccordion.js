import { setAccordionItems } from './../helpers.js';
import jsonData from './../data/EmptyJSON';
import { removeArrayElement } from './../helpers';
import jsonpath from './../jp';

let accordion = setAccordionItems(jsonData),
	groupsLevelOneToCopy = [],
	groupsLevelTwoToCopy = [],
	fieldToEdit = {},
	fieldsToCopy = [];

const changeJSONAndAccordion = (state = {jsonData, accordion, fieldToEdit, groupsLevelOneToCopy, groupsLevelTwoToCopy, fieldsToCopy}, action) => {	
	switch(action.type){
		case "CHANGE_JSON": {
			const {jsonData} = action;
			let accordion = [...state.accordion];

			accordion = setAccordionItems(jsonData);

			state = {...state, jsonData, accordion};
			break;
		}

		case "CHANGE_FIELD_TO_EDIT": {
			const {fieldToEdit} = action;
	
			state = {...state, fieldToEdit};
			break;
		}

		case "SET_SUBACCORDION_TO_OPEN": {
			const {groupKeys} = action;
			let accordion = [...state.accordion],
				indexSubAccordion,
				indexAccordionSection;

			indexSubAccordion = accordion.map((subAccordion, i) => {
    			return subAccordion.key;
  			}).indexOf(groupKeys[0]);

  			indexAccordionSection = accordion[indexSubAccordion].content.map((section, i) => {
    			return section.key;
  			}).indexOf(groupKeys[1]);

			accordion[indexSubAccordion].content[indexAccordionSection].open = true;
				
			state = {...state, accordion};
			break;
		}

		case "CHANGE_GROUP_LEVEL_ONE_TITLE": {
			const {gOneTitle, gOneKey} = action;
			let accordion = [...state.accordion],
				jsonData = {...state.jsonData},
				keyString = gOneTitle.split(' ').join('_'),
				i = 0;

			while(i < jsonData.groups.length) {
				if(jsonData.groups[i].key === gOneKey) {
					jsonData.groups[i].title = gOneTitle;
					jsonData.groups[i].key = 'grp_1_' + keyString;
					break;
				}
				i++;
			}

			for(let j = 0; j < jsonData.fields.length; j++) {
				let groupKeys = jsonData.fields[j].group.split('|'),
					groupOneKey = groupKeys[0];

				if(groupOneKey === gOneKey) {
					jsonData.fields[j].group = "grp_1_" + keyString + '|' + groupKeys[1];
				}
			}

			accordion = setAccordionItems(jsonData);

			state = {...state, jsonData, accordion};
			break;
		}

		case "CHANGE_GROUP_LEVEL_TWO_TITLE": {
			const {gTwoTitle, gTwoKey, gOneKey} = action;
			let accordion = [...state.accordion],
				jsonData = {...state.jsonData},
				keyString = gTwoTitle.split(' ').join('_'),
				indexSubAccordion,
				indexAccordionSection;

			indexSubAccordion = accordion.map((subAccordion, i) => {
    			return subAccordion.key;
  			}).indexOf(gOneKey);

  			indexAccordionSection = accordion[indexSubAccordion].content.map((section, i) => {
    			return section.key;
  			}).indexOf(gTwoKey);

			jsonData.groups[indexSubAccordion].groups[indexAccordionSection].title = gTwoTitle;
			jsonData.groups[indexSubAccordion].groups[indexAccordionSection].key = 'grp_2_' + keyString;

			for(let j = 0; j < jsonData.fields.length; j++) {
				let groupKeys = jsonData.fields[j].group.split('|'),
					groupTwoKey = groupKeys[1];
					
				if(groupTwoKey === gTwoKey) {
					jsonData.fields[j].group = groupKeys[0] + '|' + "grp_2_" + keyString;
				}
			}

			accordion = setAccordionItems(jsonData);
			accordion[indexSubAccordion].open = true;

			state = {...state, jsonData, accordion};
			break;
		}

		case "CHANGE_MAIN_TITLE": {
			const {mainTitle} = action;
			let	jsonData = {...state.jsonData};

			jsonData.title = mainTitle;

			state = {...state, jsonData}
			break;
		}

		case "CHANGE_START_DATE": {
			const {startDate} = action;
			let	accordion = [...state.accordion],
				jsonData = {...state.jsonData};



			jsonData.valid_from = startDate;

			state = {...state, jsonData, accordion}
			break;
		}

		case "CHANGE_END_DATE": {
			const {endDate} = action;
			let	accordion = [...state.accordion],
				jsonData = {...state.jsonData};

			jsonData.valid_to = endDate;

			state = {...state, jsonData, accordion}
			break;
		}

		case "INITIALIZE_JSON": {
			let accordion = [...state.accordion];

			accordion = setAccordionItems(jsonData);

			state = {...state, jsonData, accordion}
			break;
		}

		case "CHANGE_FULL_ACCORDION": {
			state = {...state, accordion: action.accordion}
			break;
		}

		case "DELETE_GROUP_L1": {
			const {element, index} = action,
		          buttonId = 'btn_group_level_one_mark_' + element.key;
		    let {groupsLevelOneToCopy} = action,
		    	accordion = [...state.accordion],
		    	indexForElementToRemove;

		    if (accordion.length > 1) {
		        accordion = removeArrayElement(accordion, index);
		        if (element.marked) {
			    	$('#' + buttonId).removeClass('marked');

			     	indexForElementToRemove = groupsLevelOneToCopy.map((key, i) => {
	        			return key;
	      			}).indexOf(element.key);

	      			groupsLevelOneToCopy = removeArrayElement(groupsLevelOneToCopy, indexForElementToRemove);
			    }

			    // delete group and field to copy!

		    }

			state = {...state, accordion, groupsLevelOneToCopy};
			return state;
			break;
		}

		case "DELETE_GROUP_L2": {
			const {groupLevelOneKey, element, index} = action,
		          buttonId = 'btn_group_level_two_mark_' + element.key;
		    let {subAccordionItems, groupsLevelTwoToCopy} = action,
		    	accordion = [...state.accordion],
		    	indexForElementToRemove,
		    	indexSubAccordion;

		    if (subAccordionItems.length > 1) {
		        subAccordionItems = removeArrayElement(subAccordionItems, index);
		        if (element.marked) {
			    	$('#' + buttonId).removeClass('marked');

			     	indexForElementToRemove = groupsLevelTwoToCopy.map((key, i) => {
	        			return key;
	      			}).indexOf(element.key);

	      			groupsLevelTwoToCopy = removeArrayElement(groupsLevelTwoToCopy, indexForElementToRemove);
			    }

			    //delete field to copy!

			    indexSubAccordion = accordion.map((subAccordion, i) => {
	    			return subAccordion.key;
	  			}).indexOf(groupLevelOneKey);

				accordion[indexSubAccordion].content = removeArrayElement(accordion[indexSubAccordion].content, index);
		    }
		
			state = {...state, accordion, groupsLevelTwoToCopy};
			return state;
			break;
		}

		case "DELETE_FIELD": {
			const {groupLevelOneKey, groupLevelTwoKey, element, index} = action,
				  buttonId = "btn_field_" + element.key;
			let {fields, fieldsToCopy} = action,
				accordion = [...state.accordion],
				indexForElementToRemove,
				indexSubAccordion,
				indexAccordionSection;

			indexSubAccordion = accordion.map((subAccordion, i) => {
    			return subAccordion.key;
  			}).indexOf(groupLevelOneKey);

  			indexAccordionSection = accordion[indexSubAccordion].content.map((section, i) => {
    			return section.key;
  			}).indexOf(groupLevelTwoKey);		

			if (fields.length > 1) {
				if (element.marked) {
			        $('#' + buttonId).removeClass('marked');

			        indexForElementToRemove = fieldsToCopy.map((key, i) => {
			            return key;
			        }).indexOf(element.key);

			        fieldsToCopy = removeArrayElement(fieldsToCopy, indexForElementToRemove);
			    }

	  			accordion[indexSubAccordion].content[indexAccordionSection].fields = removeArrayElement(accordion[indexSubAccordion].content[indexAccordionSection].fields, index);			
			}		

	  		accordion[indexSubAccordion].content[indexAccordionSection].open = true;
					
			state = {...state, accordion, fieldsToCopy};
		    return state;
		    break;
		}

		case "MARK_GROUP_L1": {
			const {element, index} = action,
		          buttonId = 'btn_group_level_one_mark_' + element.key;
		    let {groupsLevelOneToCopy} = action,
		    	accordion = [...state.accordion],
		    	indexForElementToRemove;

		    if (element.marked) {
		        indexForElementToRemove = groupsLevelOneToCopy.map((key, i) => {
		            return key;
		        }).indexOf(element.key);

		        groupsLevelOneToCopy = removeArrayElement(groupsLevelOneToCopy, indexForElementToRemove);
		        accordion[index].marked = false;
		    } else {
		        accordion[index].marked = true;    
		        groupsLevelOneToCopy.push(accordion[index].key);
		    }

		    state = {...state, groupsLevelOneToCopy};
		    return state;
		    break;
		}

		case "MARK_GROUP_L2": {
			const {groupLevelOneKey, element, index} = action,
				  buttonId = 'btn_group_level_two_mark_' + element.key;
		    let {subAccordionItems, groupsLevelTwoToCopy} = action,
		    	accordion = [...state.accordion],
		        indexForElementToRemove,
		        indexSubAccordion;

		    indexSubAccordion = accordion.map((subAccordion, i) => {
    			return subAccordion.key;
  			}).indexOf(groupLevelOneKey);

		    if (element.marked) {
		      indexForElementToRemove = groupsLevelTwoToCopy.map((key, i) => {
		        return key;
		      }).indexOf(element.key);

		      accordion[indexSubAccordion].content[index].marked = false;
		      groupsLevelTwoToCopy = removeArrayElement(groupsLevelTwoToCopy, indexForElementToRemove);
		   
		    } else {
		      accordion[indexSubAccordion].content[index].marked = true;    
		      groupsLevelTwoToCopy.push(subAccordionItems[index].key);	
		    }

		    accordion[indexSubAccordion].content[index]['open'] = false;


			state = {...state, accordion, groupsLevelTwoToCopy};
		    return state;
		    break;
		}

		case "MARK_FIELD": {
			const {groupLevelOneKey, groupLevelTwoKey, element, index} = action,
				  buttonId = "btn_field_" + element.key;
			let {fields, fieldsToCopy} = action,
				accordion = [...state.accordion],
				field,
				indexForElementToRemove,
				indexSubAccordion,
				indexAccordionSection;

			indexSubAccordion = accordion.map((subAccordion, i) => {
    			return subAccordion.key;
  			}).indexOf(groupLevelOneKey);

  			indexAccordionSection = accordion[indexSubAccordion].content.map((section, i) => {
    			return section.key;
  			}).indexOf(groupLevelTwoKey);

		    if (element.marked) {
		        indexForElementToRemove = fieldsToCopy.map((key, i) => {
		            return key;
		        }).indexOf(element.key);

		        fieldsToCopy = removeArrayElement(fieldsToCopy, indexForElementToRemove);
		        accordion[indexSubAccordion].content[indexAccordionSection].fields[index].marked = false;
		        $('#' + buttonId).removeClass('marked');

		    } else {
		        accordion[indexSubAccordion].content[indexAccordionSection].fields[index].marked = true;
		        fieldsToCopy.push(fields[index].key);
		        $('#' + buttonId).addClass('marked');      
		    }

		    accordion[indexSubAccordion].content[indexAccordionSection]['open'] = true;

			state = {...state, accordion, fieldsToCopy};
		    return state;
		    break;
		}

		default:
			return state; 
	}
	return state;
}

export default changeJSONAndAccordion;