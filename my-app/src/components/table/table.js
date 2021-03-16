import React, { Component } from 'react';
import Record from '../record/record';

import './table.css'

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      
    };
    
    this.getEditDate = this.getEditDate.bind(this);
    this.getEditTool = this.getEditTool.bind(this);
    this.getEditCost = this.getEditCost.bind(this);

  }
  editRecords = [];
        
  componentDidMount() {}

  changeModeEdit = () => {
    
    this.setState({
      editMode: true
    })
  
  }
  
  changeModeSave = () => {
    
    this.setState({
      editMode: false,
    })
    
    this.props.getChangeRecors(this.editRecords)
  
  }

  addEditRecord(editField) {
    
    this.editRecords.push(editField)

  }

  changeFieldRecord(editField, field) {
    
      this.editRecords.forEach(item => {
      
      if(item.id === editField.id){
        
        switch(field) {
        
          case 'date':  
            item.date = editField.date;
            break;
        
          case 'tool':  
            item.tool = editField.tool;
            break;
        
          case 'cost':
            item.cost = editField.cost;
            break;
          
          default:
            break;
       
        }
      } 
    });
  }

  findRecordById(id) {
    for(let i = 0; i < this.editRecords.length; i++) {
     
        if(this.editRecords[i].id === id) {
      
          return true;      
      
        }  
    }
    return false;
  }

  getEditDate(date) {

    let findResult = this.findRecordById(date.id)

    if(findResult === true) {

      this.changeFieldRecord(date, "date")

    } else {      

      this.addEditRecord(date);    

    }
  }  
  
  getEditTool(tool) {
    
    let findResult = this.findRecordById(tool.id)

    if(findResult === true) {

      this.changeFieldRecord(tool, "tool")

    } else {      

      this.addEditRecord(tool);    

    }
  }

  getEditCost(cost) {
    
    let findResult = this.findRecordById(cost.id)

    if(findResult === true) {

      this.changeFieldRecord(cost, "cost")

    } else {      

      this.addEditRecord(cost);    

    }
  }

  render() {
      return (
        <div className="table">
          <div className="record-list">
            <table className="record-list">
              <tr className="name-space">
                <td><span>Date</span></td>
                <td><span>Tool</span></td>
                <td><span>Cost</span></td>
              </tr>
              {this.props.records.map(record => (
                <Record key={record.id} 
                        record={record} 
                        editMode={this.state.editMode}
                        getEditDate={this.getEditDate}
                        getEditTool={this.getEditTool}
                        getEditCost={this.getEditCost}
                ></Record>
              ))}
            </table>
          </div>
          <div className="button-bar">
            <button onClick={() => this.props.setModalActive(true)}>Add</button>
            <button onClick={this.changeModeEdit}>Edit</button>    
            <button onClick={this.changeModeSave}>Save</button>    
          </div>
        </div>
        
      );
    
  }
}