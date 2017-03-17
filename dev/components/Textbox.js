import React, { Component } from 'react';
import { render } from 'react-dom';
import emptyJSON from './../data/EmptyJSON';

export default class Textbox extends Component {

  constructor(props) {
    super(props);

    this.saveTextAsFile = this.saveTextAsFile.bind(this);
    this.destroyClickedElement = this.destroyClickedElement.bind(this);
    this.loadFileAsText = this.loadFileAsText.bind(this);
    this.clearJSONForExport = this.clearJSONForExport.bind(this);

    //getinitialState
    this.state = {
      jsonData: this.props.store.database.jsonData,
      jsonForExport: {}
    };
  }

  saveTextAsFile(event) {
    var textToSave = document.getElementById("mainArea").value,
        textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"}),
        textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob),
        fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value,
        downloadLink = document.createElement("a");

    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = this.destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
    this.props.initializeJSON(emptyJSON);
  }

  clearJSONForExport(event) {
    let jsonCopy = {...this.state.jsonData},
        jsonForExport = {...this.state.jsonForExport};

    jsonCopy.groups.forEach((elem) => {
        delete elem['marked'];
        delete elem['open'];
        delete elem['marked'];
      elem.groups.forEach((i) => {
        delete i['fields'];
        delete i['marked'];
        delete i['open'];
        delete i['marked'];
      });
    });

    jsonCopy.fields.forEach((field) => {
      delete field['marked'];
      delete field['edited'];
    });

    jsonForExport = jsonCopy;

    this.setState({
      jsonForExport
    });

    $('#mainArea').val(JSON.stringify(jsonForExport, null, 2));
  }
 
  destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }
 
  loadFileAsText(event) {
    if (!($('#fileError').hasClass('display-hidden'))) {
      $('#fileError').addClass('display-hidden');
    }

    try {
      var fileToLoad = document.getElementById("fileToLoad").files[0],
          fileReader = new FileReader(),
          jsonData,
          self = this;

      fileReader.onload = function(fileLoadedEvent)  {
          var textFromFileLoaded = fileLoadedEvent.target.result;

          document.getElementById("mainArea").value = textFromFileLoaded;
          jsonData = JSON.parse(JSON.stringify(eval("(" + textFromFileLoaded + ")")));

          self.setState({
            jsonData
          });
      };
      fileReader.readAsText(fileToLoad, "UTF-8");

    } catch (err) {
      console.log('%c Fehler: Keine Datei ausgewählt!', 'color: red; font-weight: bold');
      $('#fileError').removeClass('display-hidden');
    }
  }

  handleChange(event){
    let jsonData = JSON.parse(JSON.stringify(eval("(" + event.target.value + ")")));
    this.setState({
      jsonData
    });
  }

  componentDidMount() {
    let jsonCopy = {...this.state.jsonData};

    $('#mainArea').val(JSON.stringify(jsonCopy, null, 2));
  }

  componentWillReceiveProps(nextProps) {
    let newJsonData = nextProps.store.database.jsonData,
        jsonData = {...this.state.jsonData};

    jsonData = newJsonData;

    this.setState({
      jsonData
    });

    setTimeout(() => {
      $('#mainArea').val(JSON.stringify(this.state.jsonData, null, 2));
    }, 200);
  }


  render() {
    return (
      <div className="margin-around">  
        <div>Text to Save</div>
        <textarea id="mainArea" className="jsonbox" onChange={this.handleChange.bind(this)}></textarea>     
            <div>Dateinamen zum Speichern festlegen:</div>
            <input type="text" id="inputFileNameToSaveAs" />
            <input type="button" onClick={(e) => this.saveTextAsFile(e)} value="Text speichern als"/>
            <input type="button" onClick={(e) => this.clearJSONForExport(e)} value="JSON für den Export bereinigen"/>
            <div>Datei auswählen:</div>
            <input type="file" id="fileToLoad" />
            <input type="button" onClick={(e) => this.loadFileAsText(e)} value="Ausgewählte Datei laden"/>
            <div id="fileError" className="display-hidden error-style">Warnung: Keine Datei ausgewählt!</div>
            <input type="button" onClick={this.props.changeJSON.bind(null, this.state.jsonData)} value="JSON aktualisieren"/>
            <input type="button" onClick={this.props.initializeJSON.bind(null, this.state.jsonData)} value="NEU"/>     
      </div>
    );
  };
}