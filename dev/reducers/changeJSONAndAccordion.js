import { setAccordionItems } from './../helpers';
import jsonData from './../data/EmptyJSON';
import { removeArrayElement } from './../helpers';
import jsonpath from './../jp';

const timestamp = + new Date(),
	  keyOne = 'grp_1_' + timestamp.toString(),
	  keyTwo = 'grp_2_' + timestamp.toString(),
	  fieldKey = 'fld_' + timestamp.toString();

jsonData.groups[0].key = keyOne;
jsonData.groups[0].groups[0].key = keyTwo;
jsonData.fields[0].group = keyOne + '|' + keyTwo;
jsonData.fields[0].key = fieldKey;	

const jsonDataCopy = {...jsonData};

let	accordion = setAccordionItems(jsonDataCopy),
	groupsLevelOneToCopy = [],
	groupsLevelTwoToCopy = [],
	fieldToEdit = {},
	groupOneToEdit = {},
	groupTwoToEdit = {},
	fieldsToCopy = [];

const changeJSONAndAccordion = (state = {jsonData, accordion, fieldToEdit, groupOneToEdit, groupTwoToEdit, groupsLevelOneToCopy, groupsLevelTwoToCopy, fieldsToCopy}, action) => {	
	switch(action.type){
		case "CHANGE_JSON_ON_LOADING": {
			const timestamp = + new Date();
			let {jsonData} = action,
				accordion = [...state.accordion],
				help;

			jsonData.groups.map((groupOne, i) => {
				const oldKeyOne = groupOne.key;

				groupOne.key = 'grp_1_' + (timestamp + i).toString();
				groupOne.groups.map((groupTwo, j) => {
					const oldKeyTwo = groupTwo.key;

					groupTwo.key = 'grp_2_' + (timestamp + i + j + 1).toString();
					jsonData.fields.map((field, k) => {
						if(field.group === oldKeyOne + '|' + oldKeyTwo) {
							field.group = groupOne.key + '|' + groupTwo.key;
						}
					});
				});
			});

			jsonData.fields.map((field, i) => {
				field.key = 'fld_' + (timestamp + i).toString();
			});
			
			accordion = setAccordionItems(jsonData);

			state = {...state, jsonData, accordion};
			break;
		}

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

		case "CHANGE_GROUP_ONE_TO_EDIT": {
			const {groupOneToEdit} = action;
	
			state = {...state, groupOneToEdit};
			break;
		}

		case "CHANGE_GROUP_TWO_TO_EDIT": {
			const {groupTwoToEdit} = action;
	
			state = {...state, groupTwoToEdit};
			break;
		}

		case "CHANGE_FIELD": {
			const {field} = action;
			let accordion = [...state.accordion],
				jsonData = {...state.jsonData},
				fieldIndex;

			fieldIndex = jsonData.fields.map((elem, i) => {
    			return elem.key;
  			}).indexOf(field.key);
			
			jsonData.fields[fieldIndex] = field;
			accordion = setAccordionItems(jsonData);			
	
			state = {...state, jsonData, accordion};
			break;
		}

		case "CHANGE_GROUP_ONE": {
			const {groupOne} = action;
			let accordion = [...state.accordion],
				jsonData = {...state.jsonData},
				groupOneIndex;

			groupOneIndex = jsonData.groups.map((elem, i) => {
    			return elem.key;
  			}).indexOf(groupOne.key);
			
			jsonData.groups[groupOneIndex] = groupOne;
			accordion = setAccordionItems(jsonData);			
	
			state = {...state, jsonData, accordion};
			break;
		}

		case "CHANGE_GROUP_TWO": {
			const {groupTwo, groupOneKey} = action;
			let accordion = [...state.accordion],
				jsonData = {...state.jsonData},
				groupOneIndex,
				groupTwoIndex;

			groupOneIndex = jsonData.groups.map((elem, i) => {
    			return elem.key;
  			}).indexOf(groupOneKey);

			groupTwoIndex = jsonData.groups[groupOneIndex].groups.map((group, i) => {
    			return group.key;
  			}).indexOf(groupTwo.key);
			
			jsonData.groups[groupOneIndex].groups[groupTwoIndex] = groupTwo;
			accordion = setAccordionItems(jsonData);			
	
			state = {...state, jsonData, accordion};
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
			
			accordion[indexSubAccordion].open = true;
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
					//jsonData.groups[i].key = 'grp_1_' + keyString;
					break;
				}
				i++;
			}

		/*	for(let j = 0; j < jsonData.fields.length; j++) {
				let groupKeys = jsonData.fields[j].group.split('|'),
					groupOneKey = groupKeys[0];

				if(groupOneKey === gOneKey) {
					jsonData.fields[j].group = "grp_1_" + keyString + '|' + groupKeys[1];
				}
			}*/

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
			//jsonData.groups[indexSubAccordion].groups[indexAccordionSection].key = 'grp_2_' + keyString;

			/*for(let j = 0; j < jsonData.fields.length; j++) {
				let groupKeys = jsonData.fields[j].group.split('|'),
					groupTwoKey = groupKeys[1];
					
				if(groupTwoKey === gTwoKey) {
					jsonData.fields[j].group = groupKeys[0] + '|' + "grp_2_" + keyString;
				}
			}*/

			accordion = setAccordionItems(jsonData);
			accordion[indexSubAccordion].open = true;

			state = {...state, jsonData, accordion};
			break;
		}

		case "CHANGE_MAIN_TITLE": {
			const {mainTitle} = action;
			let	jsonData = {...state.jsonData};

			console.log('mainTitle', mainTitle);
			jsonData.title = mainTitle;

			console.log('jsonData', jsonData);

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