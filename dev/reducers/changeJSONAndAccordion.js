import { setAccordionItems } from './../helpers';
import jsonData from './../data/EmptyJSON';
import { removeArrayElement } from './../helpers';
import { insertArrayElement } from './../helpers';
import { getRandomInt } from './../helpers';

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
	fieldType = 'code',
	initialState = {
		jsonData,
		accordion,
		fieldToEdit,
		groupOneToEdit,
		groupTwoToEdit, 
		groupsLevelOneToCopy, 
		groupsLevelTwoToCopy, 
		fieldsToCopy, 
		fieldType
	}

const changeJSONAndAccordion = (state = initialState, action) => {
	switch(action.type){
		case "SHIFT_GROUP_ONE": {
			const { groupIndexInJson, groupOneKey } = action;

			let accordion = [...state.accordion],
		    	jsonData = {...state.jsonData},
		    	groupsLevelOneToCopy = [...state.groupsLevelOneToCopy],
		    	groupsLevelTwoToCopy = [...state.groupsLevelTwoToCopy],
		    	fieldsToCopy = [...state.fieldsToCopy],
		    	groupObjects = [],
		    	newTargetIndex = [],
		    	jsonKeys = [];

		    jsonData.groups.forEach((group) => {
		    	jsonKeys.push((group.key));
		    });

		    groupsLevelOneToCopy = jsonKeys.filter(v => groupsLevelOneToCopy.includes(v));

		    groupsLevelOneToCopy.forEach((key) =>{
		    	jsonData.groups.map((group, index) => {
		    		if (key === group.key) {
		    			groupObjects.push(group);
		    			jsonData.groups = removeArrayElement(jsonData.groups, index);
		    		}
		    	});
		    });

			newTargetIndex = jsonData.groups.map((groupOne, i) => {
				return groupOne.key;
			}).indexOf(groupOneKey);

			for (var i = 0; i < groupObjects.length; i++) {
				jsonData.groups = insertArrayElement(jsonData.groups, groupObjects[i], newTargetIndex + i);
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

		case "SHIFT_GROUP_TWO": {
			const { groupOneKey, groupTwoKey, groupOneIndex, indexInGroupOne } = action;

			let accordion = [...state.accordion],
		    	jsonData = {...state.jsonData},
		    	groupsLevelOneToCopy = [...state.groupsLevelOneToCopy],
		    	groupsLevelTwoToCopy = [...state.groupsLevelTwoToCopy],
		    	fieldsToCopy = [...state.fieldsToCopy],
		    	groupObjects = [],
		    	target,
		    	newTargetIndex,
		    	jsonKeys = [],
		    	// must have same length as groupObjects, needed for new groupkey for fields
		    	groupKeys = [];

		    target = jsonData.groups[groupOneIndex].groups[indexInGroupOne];

		    jsonData.groups.forEach((groupOne) => {
		    	groupOne.groups.forEach((groupTwo) => {
					jsonKeys.push(groupTwo.key);
		    	});
			});

			groupsLevelTwoToCopy = jsonKeys.filter(v => groupsLevelTwoToCopy.includes(v));

		    groupsLevelTwoToCopy.map((key, index) => {
		    	jsonData.groups.map((groupOne, i) => {
		    		let groupTwoIndex,
		    			groupTwoInJson;

    				groupTwoIndex = groupOne.groups.map((groupTwo, j) => {
    					return groupTwo.key;
    				}).indexOf(key);

    				if (groupTwoIndex >= 0) {
    					let fieldGroups = groupOne.key + '|' + key;

	    				groupTwoInJson = jsonData.groups[i].groups[groupTwoIndex];
	    				jsonData.groups[i].groups = removeArrayElement(jsonData.groups[i].groups, groupTwoIndex);
						groupObjects.push(groupTwoInJson);
						groupKeys.push(fieldGroups);
    				}
  				});
		    });

		    newTargetIndex = jsonData.groups[groupOneIndex].groups.map((groupTwo, i) => {
				return groupTwo.key;
			}).indexOf(target.key);

			for (var i = 0; i < groupObjects.length; i++) {
				jsonData.groups[groupOneIndex].groups = insertArrayElement(jsonData.groups[groupOneIndex].groups, groupObjects[i], newTargetIndex + i);
			}

		    groupKeys.forEach((key) => {
		    	jsonData.fields.forEach((field) => {
		    		if (field.group === key) {
		    			let groupTwo = field.group.split('|')[1];
		    			field.group = jsonData.groups[groupOneIndex].key + '|' + groupTwo;
		    		}
		    	});
		    });

			jsonData.groups.forEach((groupOne) => {
				groupOne.marked = false;
				groupOne.groups.forEach((groupTwo) => {
					groupTwo.marked = false;
				});
			});

			jsonData.fields.forEach((field) => {
				field.marked = false;
			});

			jsonData.groups.forEach((groupOne) => {
				if (groupOne.groups.length === 0) {
					let groupTwoToCreate = {  
						   key: "",
						   title : "Neue Gruppe Level 2",
						   type : "group",
						   marked: false,
						   validation: {}    
						},
						fieldToCreate = {
						   key: "",
						   title: 'Neues Feld',
						   type: 'code',
						   group: "",
						   cols: "",
						   clearBefore: false,
						   clearAfter: false,
						   marked: false,
						   edited: false,
						   parameters: {
						      css: "",
						      html: "",
						      js: ""
						   }
						},
						newTimestamp = + new Date(),
						groupTwoNewKey = 'grp_2_' + (newTimestamp + getRandomInt(1, 1000)).toString();

					groupTwoToCreate.key = groupTwoNewKey;

					fieldToCreate.key = 'fld_' + (newTimestamp + getRandomInt(1, 1000)).toString();
					fieldToCreate.group = groupOne.key + '|' + groupTwoNewKey;

					groupOne.groups = insertArrayElement(groupOne.groups, groupTwoToCreate, 0);
					jsonData.fields.push(fieldToCreate);
				}
			});

			accordion = setAccordionItems(jsonData);
			groupsLevelOneToCopy.length = [];
			groupsLevelTwoToCopy.length = [];
			fieldsToCopy.length = [];

			state = {...state, jsonData, accordion, groupsLevelOneToCopy, groupsLevelTwoToCopy, fieldsToCopy};
			return state;
			break;
		}

		case "SHIFT_FIELDS": {
			const {fieldIndexInJson} = action,
				  jsonKeys = [];

			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				fieldsToCopy = [...state.fieldsToCopy],
				fieldObjects = [],
				target,
				newTargetIndex;

			jsonData.fields.forEach((i) => {
				jsonKeys.push(i.key);
			});

			fieldsToCopy = jsonKeys.filter(v => fieldsToCopy.includes(v));

			target = jsonData.fields[fieldIndexInJson];

			fieldsToCopy.forEach((key) => {
				let fieldIndex,
					fieldInJson;

				fieldIndex = jsonData.fields.map((elem, i) => {
    				return elem.key;
  				}).indexOf(key);

				fieldInJson = jsonData.fields[fieldIndex];
				jsonData.fields = removeArrayElement(jsonData.fields, fieldIndex);
				fieldObjects.push(fieldInJson);
			});

			newTargetIndex = jsonData.fields.map((elem, i) => {
				return elem.key;
			}).indexOf(target.key);

			fieldObjects.forEach((field) => {
				field.group = target.group;
			});

			for (var i = 0; i < fieldObjects.length; i++) {
				jsonData.fields = insertArrayElement(jsonData.fields, fieldObjects[i], newTargetIndex + i);
			}
		
			jsonData.fields.forEach((field) => {
				field.marked = false;
			});

			accordion = setAccordionItems(jsonData);
			fieldsToCopy.length = [];

			state = {...state, jsonData, accordion, fieldsToCopy};
			return state;
			break;
		}

		case "CREATE_FIELD": {
			const {fieldIndex, groupKeys, randomInt} = action;

			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				fieldToCreate = {
				   key: "",
				   title: 'Neues Feld',
				   type: 'code',
				   group: "",
				   cols: "",
				   clearBefore: false,
				   clearAfter: false,
				   marked: false,
				   edited: false,
				   parameters: {
				      css: "",
				      html: "",
				      js: ""
				   }
				},
				newTimestamp = + new Date();
			
			fieldToCreate.key = 'fld_' + (newTimestamp + randomInt).toString();
			fieldToCreate.group = groupKeys;

			jsonData.fields = insertArrayElement(jsonData.fields, fieldToCreate, fieldIndex);
			accordion = setAccordionItems(jsonData);

			state = {...state, jsonData, accordion};

			break;
		}

		case "CREATE_GROUP_ONE": {
			const {groupOneIndexInJson, randomInt} = action;
			
			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				groupOneToCreate = {
				   key: "",
				   title: "Neue Gruppe Level 1",
				   type: "group",
				   marked: false,
				   validation: {},
				   groups: [
				      {
				         key: "",
				         title : "Neue Gruppe Level 2",
				         type : "group",
				         marked: false,
				         validation: {}
				      }
				   ],
				   validation: {}
				},				
				fieldToCreate = {
				   key: "",
				   title: 'Neues Feld',
				   type: 'code',
				   group: "",
				   cols: "",
				   clearBefore: false,
				   clearAfter: false,
				   marked: false,
				   edited: false,
				   parameters: {
				      css: "",
				      html: "",
				      js: ""
				   }
				},
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
			state = {...state, jsonData, accordion};

			break;
		}

		case "CREATE_GROUP_TWO": {
			const {groupOneKey, indexInGroupOne, randomInt} = action;
			
			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				groupTwoToCreate = {  
				   key: "",
				   title : "Neue Gruppe Level 2",
				   type : "group",
				   marked: false, 
				   validation: {}    
				},
				fieldToCreate = {
				   key: "",
				   title: 'Neues Feld',
				   type: 'code',
				   group: "",
				   cols: "",
				   clearBefore: false,
				   clearAfter: false,
				   marked: false,
				   edited: false,
				   parameters: {
				      css: "",
				      html: "",
				      js: ""
				   }
				},
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
			state = {...state, jsonData, accordion};

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

		case "CHANGE_FIELD_TYPE": {
			const {fieldType} = action;

			state = {...state, fieldType};
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
				fieldToEdit = {...state.fieldToEdit},
				fieldIndex;

			fieldIndex = jsonData.fields.map((elem, i) => {
    			return elem.key;
  			}).indexOf(field.key);
			
			jsonData.fields[fieldIndex] = field;
			accordion = setAccordionItems(jsonData);

			fieldToEdit = {};			
	
			state = {...state, jsonData, accordion, fieldToEdit};
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
			const {jsonData} = action;
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
		    } else {
		    	console.log('%c Löschen nicht möglich, da mindestens eine Gruppe vorhanden sein muss!', 'color: red; font-weight: bold');
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
		    } else {
		    	console.log('%c Löschen nicht möglich, da mindestens eine Untergruppe vorhanden sein muss!', 'color: red; font-weight: bold');
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
			const {element, indexInJson, fieldsLength} = action,
				  buttonId = "btn_field_" + element.key;
			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				fieldsToCopy = [...state.fieldsToCopy];
		
			if (fieldsLength > 1) {
				jsonData.fields = removeArrayElement(jsonData.fields, indexInJson);
			} else {
				console.log('%c Löschen des Feldes nicht möglich, da mindestens ein Feld vorhanden sein muss!', 'color: red; font-weight: bold');
			}

			jsonData.fields.forEach((field) => {
				field.marked = false;
			});

			accordion = setAccordionItems(jsonData);
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
				jsonDataCopy = Object.assign({}, jsonData),
				jsonDataCopy2 = Object.assign({}, jsonData),
				accordion = [...state.accordion],
				groupsLevelOneToCopy = [...state.groupsLevelOneToCopy],
				groupsLevelTwoToCopy = [...state.groupsLevelTwoToCopy],
				fieldsToCopy = [...state.fieldsToCopy],
				groupObjects = [],
				fieldObjects = [],
				groupKeys = [],
				jsonKeys = [];

			jsonData.groups.forEach((group) => {
		    	jsonKeys.push((group.key));
		    });

		    groupsLevelOneToCopy = jsonKeys.filter(v => groupsLevelOneToCopy.includes(v));

		    groupsLevelOneToCopy.forEach((key) =>{
		    	jsonDataCopy2.groups.map((group, index) => {
		    		if (key === group.key) {
		    			let groupCopy = {
							    key: "",
							    title: "",
							    type: "group",
							    marked: false,
							    groups: [],
							    validation: {}
							},
		    				newTimestamp = + new Date();

		    			groupCopy.key = 'grp_1_' + (newTimestamp + getRandomInt(1, 1000)).toString();
		    			groupCopy.title = group.title;
		    			group.groups.forEach((subGroup) => {
		    				let newSubGroup = {  
								   key: "",
								   title : "",
								   type : "group",
								   marked: false,
								   validation: {}  
								},
								newTimestamp2 = + new Date(),
								subArray = [],
		    					oldFieldGroup,
		    					newFieldGroup;

		    				oldFieldGroup = key + '|' + subGroup.key;
		    				newSubGroup.key = 'grp_2_' + (newTimestamp2 + getRandomInt(1, 1000)).toString();
		    				newSubGroup.title = subGroup.title;
		    				newFieldGroup = groupCopy.key + '|' + newSubGroup.key;
		    				subArray.push(oldFieldGroup);
		    				subArray.push(newFieldGroup);
		    				groupKeys.push(subArray);
		    				groupCopy.groups.push(newSubGroup);

		    			});

		    			groupObjects.push(groupCopy);
		    		}
		    	});
		    });

		    groupKeys.forEach((keys) => {
		    	jsonDataCopy.fields.forEach((field) => {
		    		if (field.group === keys[0]) {
		    			let fieldCopy = Object.assign({}, field),
		    				newTimestamp3 = + new Date();

		    			fieldCopy.group = keys[1];
		    			fieldCopy.key = 'fld_' + (newTimestamp3 + getRandomInt(1, 1000)).toString();
		    			jsonData.fields.push(fieldCopy);
		    		}
		    	});	
		    });

			for (var i = 0; i < groupObjects.length; i++) {
				jsonData.groups = insertArrayElement(jsonData.groups, groupObjects[i], groupOneIndex + i);
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
			break;
		}

		case "INSERT_GROUP_TWO": {
			const {groupOneKey, groupTwoKey, groupOneIndex, indexInGroupOne} = action;
			let jsonData = {...state.jsonData},
				jsonDataCopy = {}, 
				accordion = [...state.accordion],
				groupsLevelOneToCopy = [...state.groupsLevelOneToCopy],
				groupsLevelTwoToCopy = [...state.groupsLevelTwoToCopy],
				fieldsToCopy = [...state.fieldsToCopy],
		    	groupObjects = [],
		    	fieldObjects = [],
		    	target,
		    	jsonKeys = [],
		    	// must have same length as groupObjects, needed for new groupkey for fields
		    	groupKeys = [];

		    target = jsonData.groups[groupOneIndex].groups[indexInGroupOne];

		    jsonData.groups.forEach((groupOne) => {
		    	groupOne.groups.forEach((groupTwo) => {
					jsonKeys.push(groupTwo.key);
		    	});
			});

			groupsLevelTwoToCopy = jsonKeys.filter(v => groupsLevelTwoToCopy.includes(v));

		    groupsLevelTwoToCopy.map((key, index) => {
		    	jsonData.groups.map((groupOne, i) => {
		    		let groupTwoIndex,
		    			groupTwoInJson;

    				groupTwoIndex = groupOne.groups.map((groupTwo, j) => {
    					return groupTwo.key;
    				}).indexOf(key);

    				if (groupTwoIndex >= 0) {
    					let fieldGroups = groupOne.key + '|' + key,
    						fieldGroupsCopy = "",
    						subArray = [fieldGroups],
    						newTimestamp = + new Date();

	    				groupTwoInJson = Object.assign({},jsonData.groups[i].groups[groupTwoIndex]);
						groupTwoInJson.key = 'grp_2_' + (newTimestamp + getRandomInt(1, 1000)).toString();
						subArray.push(groupTwoInJson.key);
						groupObjects.push(groupTwoInJson);
						groupKeys.push(subArray);
    				}
  				});
		    });

			for (var i = 0; i < groupObjects.length; i++) {
				jsonData.groups[groupOneIndex].groups = insertArrayElement(jsonData.groups[groupOneIndex].groups, groupObjects[i], indexInGroupOne + i);
			}

			jsonDataCopy = Object.assign({}, jsonData);

		    groupKeys.forEach((subArray) => {
		    	jsonDataCopy.fields.map((field, index) => {
		    		if (field.group === subArray[0]) {
		    			let fieldCopy = Object.assign({}, field),
		    				newTimestamp = + new Date();

		    			fieldCopy.key = 'fld_' + (newTimestamp + getRandomInt(1, 1000)).toString();
		    			fieldCopy.group = jsonData.groups[groupOneIndex].key + '|' + subArray[1];
		    			jsonData.fields.push(fieldCopy);
		    		}	
		    	});
		    });

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

		case "INSERT_FIELDS": {
			const {field, fieldIndexInJson} = action;
			let jsonData = {...state.jsonData},
				accordion = [...state.accordion],
				fieldsToCopy = [...state.fieldsToCopy],
				fieldObjects = [],
				jsonKeys = [];

			jsonData.fields.forEach((i) => {
				jsonKeys.push(i.key);
			});

			fieldsToCopy = jsonKeys.filter(v => fieldsToCopy.includes(v));

			fieldsToCopy.forEach((key) => {
				let fieldIndex,
					fieldInJson;

				fieldIndex = jsonData.fields.map((elem, i) => {
    				return elem.key;
  				}).indexOf(key);

				fieldInJson = Object.assign({},jsonData.fields[fieldIndex]);
				fieldObjects.push(fieldInJson);
			});


			fieldObjects.forEach((elem) => {
				let newTimestamp = + new Date();

				elem.key = 'fld_' + (newTimestamp + getRandomInt(1, 1000)).toString();
				elem.group = field.group;
			});

			for (var i = 0; i < fieldObjects.length; i++) {
				jsonData.fields = insertArrayElement(jsonData.fields, fieldObjects[i], fieldIndexInJson + i);
			}

			jsonData.fields.forEach((field) => {
				field.marked = false;
			});

			accordion = setAccordionItems(jsonData);
			fieldsToCopy.length = [];

			state = {...state, jsonData, accordion, groupsLevelOneToCopy, groupsLevelTwoToCopy, fieldsToCopy};
			break;
		}

		default:
			return state; 
	}
	return state;
}

export default changeJSONAndAccordion;