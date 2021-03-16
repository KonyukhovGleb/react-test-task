import React, { Component } from 'react';

import Table from '../components/table/table';
import ModalWindow from '../components/modalWindow/modalWindow'
import GraphicDrawer from '../components/graphicDrawing/graphicDrawer';

import './container.css'

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,

      modalWindowActive: false,

      toolNames: [],
      selectedToolName: null, 
      
      records: [],

      addRecord: {
        id: null,
        date: null,
        tool: null,
        cost: null
      }
    };

    this.addRecordFromModalWindow = this.addRecordFromModalWindow.bind(this)
    this.getChangeRecors = this.getChangeRecors.bind(this) 
    this.setModalActive = this.setModalActive.bind(this)
    this.getToolNames = this.getToolNames.bind(this)

    this.handleDate = this.handleDate.bind(this)
    this.handleTool = this.handleTool.bind(this)
    this.handleCost = this.handleCost.bind(this)
    this.handleSelelect = this.handleSelelect.bind(this)
  }
    
    
  componentDidMount() {
    fetch("http://localhost:8080/records/all")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          records: result,
          selectedToolName: this.getToolNames(result)[0],
          toolNames: this.getToolNames(result)
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )

    console.log(this.state)
  }

  postRequest = (data) => {
    fetch("http://localhost:8080/records/add", {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  putRequest = (data) => {
    fetch(`http://localhost:8080/records/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  getToolNames(records) {
    let toolNames = new Set()
    console.log(records)

    records.forEach(record => {
      toolNames.add(record.tool);
    })
    return [...toolNames]
  }
  findRecordById(id, array) {
    for(let i = 0; i < array.length; i++) {
     
        if(array[i].id === id) {
      
          return array[i];      
      
        }  
    }
    return false;
  }

  getChangeRecors(records) {

    let cloneState = this.state.records;

    cloneState.forEach(recordState => {
      
      let editRecord = this.findRecordById(recordState.id, records);
      
      if(editRecord !== false) {
      
        Object.keys(editRecord).forEach(key => {
          recordState[key] = editRecord[key];
        })
      
      }

    });
    let arrayIdEditRecords = [];
    records.forEach((record) => {
      arrayIdEditRecords.push(record.id)
    }) 

    arrayIdEditRecords.forEach((id) => {
      this.putRequest(this.findRecordById(id ,this.state.records))
    })
    

    this.setState({
      records: cloneState
    });     
  }


  setModalActive (active) {
    
    this.setState({
      modalWindowActive: active
    })
    
    console.log(this.state.modalWindowActive)

  }
  
  addRecordFromModalWindow() {
    //get new id for new record
    let lastId = this.state.records[this.state.records.length - 1].id + 1
    
    let cloneAddRecord = this.state.addRecord
    cloneAddRecord.id = lastId;
    
    let cloneRecords = this.state.records;
    cloneRecords.push(cloneAddRecord)
    
    this.setState({
      modalWindowActive: false,
      records: cloneRecords
    })

    this.postRequest(cloneAddRecord);
  }

  handleDate(e) {
    let cloneAddrecord = this.state.addRecord;
    cloneAddrecord.date = e.target.value 
    this.setState({
      addRecord: cloneAddrecord
    })
  }
  handleTool(e) {
    let cloneAddrecord = this.state.addRecord;
    cloneAddrecord.tool = e.target.value 
    this.setState({
      addRecord: cloneAddrecord
    })
  }
  handleCost(e) {
    let cloneAddrecord = this.state.addRecord;
    cloneAddrecord.cost = e.target.value 
    this.setState({

      addRecord: cloneAddrecord
    })
  }

  handleSelelect(e) {
    this.setState({
      selectedToolName: e.target.value
    })
    console.log(this.state.selectedToolName)
    
  }
  
  render() {
    
    const { error, isLoaded, records, 
          selectedToolName, toolNames, 
    } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="container">
          <div className="table-container"> 
            <Table 
              records={records} 
              getChangeRecors={this.getChangeRecors}
              setModalActive={this.setModalActive}
            ></Table>
          </div>
          <div className="graphic-drawer-container">
            <select value={selectedToolName} onChange={this.handleSelelect}>
              {toolNames.map(toolName => (
                <option key={toolName} value={toolName}>{toolName}</option>
              ))}
            </select>
            <GraphicDrawer
              records={records} 
              toolName={selectedToolName}
            ></GraphicDrawer>
             
            <ModalWindow
              active={this.state.modalWindowActive}
              setActive={this.setModalActive}
            > 
              <div className="modal-container">
                <h1>Filled form</h1>
                <div>
                  <span>Date</span>
                  <input onChange={this.handleDate}/>
                </div> 
                <div>
                  <span>Tool</span>
                  <input onChange={this.handleTool}/>
                </div>
                <div>
                  <span>Cost</span>
                  <input onChange={this.handleCost}/>
                </div>
                <button onClick={this.addRecordFromModalWindow}>Save</button>
                <button onClick={() => this.setModalActive(false)}>Close</button>
              </div>

            </ModalWindow>
          </div>
        </div>
      );
    }
  }
}