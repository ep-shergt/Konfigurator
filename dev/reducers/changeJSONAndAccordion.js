import { setAccordionItems } from './../helpers';
import jsonData from './../data/EmptyJSON';
import fieldToCreate from './../data/FieldToCreate';
import groupOneToCreate from './../data/GroupOneToCreate';
import groupTwoToCreate from './../data/groupTwoToCreate';
import { removeArrayElement } from './../helpers';
import { insertArrayElement } from './../helpers';
import { getRandomInt } from './../helpers';
import jsonpath from './../jp';

const timestamp = + new Date(),
	  keyOne = 'grp_1_' + (timestamp + getRandomInt(1, 1000)).toString(),
	  keyTwo = 'grp_2_' + (timestamp + getRandomInt(1, 1000)).toString(),
	  fieldKey = 'fld_' + (timestamp + getRandomInt(1, 1000)).toString();

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
	fieldsToCopy = [],
	initialState = {
		jsonData,
		accordion,
		fieldToEdit,
		groupOneToEdit,
		groupTwoToEdit, 
		groupsLevelOneToCopy, 
		groupsLevelTwoToCopy, 
		fieldsToCopy, 
		fieldToCreate, 
		groupOneToCreate,
		groupTwoToCreate
	}

const changeJSONAndAccordion = (state = initialState, action) => {	
	switch(action.type){
		case "CREATE_FIELD": {
			const {fieldIndex, groupKeys, randomInt} = action;

			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				fieldToCreate = {...state.fieldToCreate},
				newTimestamp = + new Date();
			
			fieldToCreate.key = 'fld_' + (newTimestamp + randomInt).toString();
			fieldToCreate.group = groupKeys;

			jsonData.fields = insertArrayElement(jsonData.fields, fieldToCreate, fieldIndex);
			accordion = setAccordionItems(jsonData);

			state = {...state, jsonData, accordion, fieldToCreate};

			break;
		}

		case "CREATE_GROUP_ONE": {
			const {groupOneIndexInJson, randomInt} = action;
			
			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				groupOneToCreate = {...state.groupOneToCreate},
				fieldToCreate = {...state.fieldToCreate},
				newTimestamp = + new Date(),
				groupOneKey = 'grp_1_' + (newTimestamp + randomInt).toString(),
				groupTwoKey = 'grp_2_' + (newTimestamp + getRandomInt(1, 1000)).toString();

			groupOneToCreate.key = groupOneKey;
			groupOneToCreate.groups[0].key = groupTwoKey;

			fieldToCreate.key = 'fld_' + (newTimestamp + getRandomInt(1, 1000)).toString();
			fieldToCreate.group = groupOneKey + '|' + groupTwoKey;

			jsonData.groups = insertArrayElement(jsonData.groups, groupOneToCreate, groupOneIndexInJson);
			jsonData.fields.push(fieldToCreate);

			accordion = setAccordionItems(jsonData);
			state = {...state, jsonData, accordion, groupOneToCreate};

			break;
		}

		case "CREATE_GROUP_TWO": {
			const {groupOneKey, indexInGroupOne, randomInt} = action;
			
			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				groupTwoToCreate = {...state.groupTwoToCreate},
				fieldToCreate = {...state.fieldToCreate},
				newTimestamp = + new Date(),
				groupTwoKey = 'grp_2_' + (newTimestamp + randomInt).toString(),
				groupOneIndex;

			groupTwoToCreate.key = groupTwoKey;

			fieldToCreate.key = 'fld_' + (newTimestamp + getRandomInt(1, 1000)).toString();
			fieldToCreate.group = groupOneKey + '|' + groupTwoKey;

			groupOneIndex = jsonData.groups.map((elem, i) => {
    			return elem.key;
  			}).indexOf(groupOneKey);

			jsonData.groups[groupOneIndex].groups = insertArrayElement(jsonData.groups[groupOneIndex].groups, groupTwoToCreate, indexInGroupOne);
			jsonData.fields.push(fieldToCreate);

			accordion = setAccordionItems(jsonData);
			state = {...state, jsonData, accordion, groupOneToCreate};

			break;
		}

		case "CHANGE_JSON_ON_LOADING": {
			const timestamp = + new Date();
			let {jsonData} = action,
				accordion = [...state.accordion];

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

		case "SET_ACCORDION_TO_OPEN": {
			const {groupOneKey} = action;
			let accordion = [...state.accordion],
				indexSubAccordion,
				indexAccordionSection;

			indexSubAccordion = accordion.map((subAccordion, i) => {
    			return subAccordion.key;
  			}).indexOf(groupOneKey);
	
			accordion[indexSubAccordion].open = true;
			accordion[indexSubAccordion].content.forEach((i) => {
				i.open = false;
			});
				
			state = {...state, accordion};
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
			const {groupOneIndex, element} = action,
		    	  buttonId = 'btn_group_level_one_mark_' + element.key;
		    let accordion = [...state.accordion],
		    	jsonData = {...state.jsonData},
		    	groupsLevelOneToCopy = [...state.groupsLevelOneToCopy],
		    	groupsLevelTwoToCopy = [...state.groupsLevelTwoToCopy],
		    	fieldsToCopy = [...state.fieldsToCopy],
		    	indexForElementToRemove,
		    	fieldIndexToRemove;


		    if (accordion.length > 1) {
		        jsonData.groups = removeArrayElement(jsonData.groups, groupOneIndex);

		        jsonData.fields.forEach((field) => {
		        	let groupKeys = field.group.split('|');

		        	if (element.key === groupKeys[0]) {
		        		fieldIndexToRemove = jsonData.fields.map((elem, i) => {
			    			return elem.group.split('|')[0];
			  			}).indexOf(element.key);

			  			jsonData.fields = removeArrayElement(jsonData.fields, fieldIndexToRemove);
		        	}
		        });
		    }

		    jsonData.groups.forEach((groupOne) => {
				groupOne.marked = false;
				groupOne.groups.forEach((groupTwo) => {
					groupTwo.marked = false;
				});
			});

			jsonData.fields.forEach((field) => {
				field.marked = false;
			});

			accordion = setAccordionItems(jsonData);
			groupsLevelOneToCopy.length = [];
			groupsLevelTwoToCopy.length = [];
			fieldsToCopy.length = [];

			state = {...state, jsonData, accordion, groupsLevelOneToCopy, groupsLevelTwoToCopy, fieldsToCopy};
			return state;
			break;
		}

		case "DELETE_GROUP_L2": {
			const {groupOneKey, element, indexInGroupOne, subAccLength} = action,
		          buttonId = 'btn_group_level_two_mark_' + element.key;
		    let accordion = [...state.accordion],
		    	jsonData = {...state.jsonData},
		    	groupsLevelOneToCopy = [...state.groupsLevelOneToCopy],
		    	groupsLevelTwoToCopy = [...state.groupsLevelTwoToCopy],
		    	fieldsToCopy = [...state.fieldsToCopy],
		    	groupOneIndex,
		    	fieldIndexToRemove,
		    	indexForElementToRemove;

		    if (subAccLength > 1) {

		        groupOneIndex = jsonData.groups.map((elem, i) => {
	    			return elem.key;
	  			}).indexOf(groupOneKey);

	  			jsonData.groups[groupOneIndex].groups = removeArrayElement(jsonData.groups[groupOneIndex].groups, indexInGroupOne);

	  			jsonData.fields.forEach((field) => {
		        	let groupKeys = field.group.split('|');

		        	if (element.key === groupKeys[1]) {
		        		fieldIndexToRemove = jsonData.fields.map((elem, i) => {
			    			return elem.group.split('|')[1];
			  			}).indexOf(element.key);

			  			jsonData.fields = removeArrayElement(jsonData.fields, fieldIndexToRemove);
		        	}
		        });
		    }
	
			jsonData.groups.forEach((groupOne) => {
				groupOne.marked = false;
				groupOne.groups.forEach((groupTwo) => {
					groupTwo.marked = false;
				});
			});

			jsonData.fields.forEach((field) => {
				field.marked = false;
			});

			accordion = setAccordionItems(jsonData);
			groupsLevelOneToCopy.length = [];
			groupsLevelTwoToCopy.length = [];
			fieldsToCopy.length = [];

			state = {...state, jsonData, accordion, groupsLevelOneToCopy, groupsLevelTwoToCopy, fieldsToCopy};
			return state;
			break;
		}

		case "DELETE_FIELD": {
			const {element, indexInJson} = action,
				  buttonId = "btn_field_" + element.key;
			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				fieldsToCopy = [...state.fieldsToCopy],
				groupsLevelOneToCopy = [...state.groupsLevelOneToCopy],
		    	groupsLevelTwoToCopy = [...state.groupsLevelTwoToCopy],
				indexForElementToRemove;
	
			if (jsonData.fields.length > 1) {
				jsonData.fields = removeArrayElement(jsonData.fields, indexInJson);
			}

			jsonData.groups.forEach((groupOne) => {
				groupOne.marked = false;
				groupOne.groups.forEach((groupTwo) => {
					groupTwo.marked = false;
				});
			});

			jsonData.fields.forEach((field) => {
				field.marked = false;
			});

			accordion = setAccordionItems(jsonData);
			groupsLevelOneToCopy.length = [];
			groupsLevelTwoToCopy.length = [];
			fieldsToCopy.length = [];

			state = {...state, jsonData, accordion, groupsLevelOneToCopy, groupsLevelTwoToCopy, fieldsToCopy};
		    return state;
		    break;
		}

		case "MARK_GROUP_L1": {
			const {element, groupIndexInJson} = action,
		          buttonId = 'btn_group_level_one_mark_' + element.key;
		    let groupsLevelOneToCopy = [...state.groupsLevelOneToCopy],
		    	jsonData = {...state.jsonData},
		    	accordion = [...state.accordion],
		    	indexForElementToRemove;

		    if (jsonData.groups[groupIndexInJson].marked) {
		        indexForElementToRemove = groupsLevelOneToCopy.map((key, i) => {
		            return key;
		        }).indexOf(element.key);

		        groupsLevelOneToCopy = removeArrayElement(groupsLevelOneToCopy, indexForElementToRemove);
		        jsonData.groups[groupIndexInJson].marked = false;
		    } else { 
		    	jsonData.groups[groupIndexInJson].marked = true;
		        groupsLevelOneToCopy.push(jsonData.groups[groupIndexInJson].key);
		    }

		    accordion = setAccordionItems(jsonData);
			state = {...state, jsonData, accordion, groupsLevelOneToCopy};
		    return state;
		    break;
		}

		case "MARK_GROUP_L2": {
			const {element, groupOneIndex, indexInGroupOne} = action;
		    let jsonData = {...state.jsonData},
		    	accordion = [...state.accordion],
		    	groupsLevelTwoToCopy = [...state.groupsLevelTwoToCopy],
		        indexForElementToRemove;

		    if (element.marked) {
		      indexForElementToRemove = groupsLevelTwoToCopy.map((key, i) => {
		        return key;
		      }).indexOf(element.key);

		      groupsLevelTwoToCopy = removeArrayElement(groupsLevelTwoToCopy, indexForElementToRemove);
		   	  jsonData.groups[groupOneIndex].groups[indexInGroupOne].marked = false;

		    } else {
		      jsonData.groups[groupOneIndex].groups[indexInGroupOne].marked = true;  
		      groupsLevelTwoToCopy.push(jsonData.groups[groupOneIndex].groups[indexInGroupOne].key);	
		    }

		    accordion = setAccordionItems(jsonData);
			state = {...state, jsonData, accordion, groupsLevelTwoToCopy};
		    return state;
		    break;
		}

		case "MARK_FIELD": {
			const {field, indexInJson} = action;
			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				fieldsToCopy = [...state.fieldsToCopy],	
				indexForElementToRemove;
			
		    if (field.marked) {
		        indexForElementToRemove = fieldsToCopy.map((key, i) => {
		            return key;
		        }).indexOf(field.key);

		        fieldsToCopy = removeArrayElement(fieldsToCopy, indexForElementToRemove);
		        jsonData.fields[indexInJson].marked = false;

		    } else {
		    	jsonData.fields[indexInJson].marked = true;
		        fieldsToCopy.push(jsonData.fields[indexInJson].key);
		    }

		    accordion = setAccordionItems(jsonData);
			state = {...state, jsonData, accordion, fieldsToCopy};
		    return state;
		    break;
		}

		case "INSERT_GROUP_ONE": {
			const {groupOneIndex} = action;
			let jsonData = {...state.jsonData},
				jsonDataCopy = {...jsonData},
				accordion = [...state.accordion],
				groupsLevelOneToCopy = [...state.groupsLevelOneToCopy],
				groupsLevelTwoToCopy = [...state.groupsLevelTwoToCopy],
				groupsToCopy = [],
				fieldsToCopy = [...state.fieldsToCopy],
				counter = 0;

			jsonData.groups.forEach((groupOne) => {
				groupOne.marked = false;
				groupOne.groups.forEach((groupTwo) => {
					groupTwo.marked = false;
				});
			});

			jsonData.fields.forEach((field) => {
				field.marked = false;
			});

			accordion = setAccordionItems(jsonData);
			groupsLevelOneToCopy.length = [];
			groupsLevelTwoToCopy.length = [];
			fieldsToCopy.length = [];

			state = {...state, jsonData, accordion, groupsLevelOneToCopy, groupsLevelTwoToCopy, fieldsToCopy};
			break;
		}

		case "INSERT_GROUP_TWO": {
			console.log('affe');
			break;
		}

		default:
			return state; 
	}
	return state;
}

export default changeJSONAndAccordion;