import React, { Component } from 'react';
import './record.css'
export default class Record extends Component {
  constructor(props) {
    super(props);
    
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTool = this.handleChangeTool.bind(this);
    this.handleChangeCost = this.handleChangeCost.bind(this);
    
  }

  handleChangeDate(e) {
    this.props.getEditDate({id: this.props.record.id, date: e.target.value})
  }

  handleChangeTool(e) {
    this.props.getEditTool({id: this.props.record.id, tool: e.target.value})
  }

  handleChangeCost(e) {
    this.props.getEditCost({id: this.props.record.id, cost: e.target.value})
  }

    render() {
      if(this.props.editMode){
        return (
            <tr className="record">
              <td><input defaultValue={this.props.record.date} onBlur={this.handleChangeDate}/></td>
              <td><input defaultValue={this.props.record.tool} onBlur={this.handleChangeTool}/></td>
              <td><input defaultValue={this.props.record.cost} onBlur={this.handleChangeCost}/></td>
            </tr>
        )
      }
      return(
          <tr className="record">
            <td><span>{this.props.record.date}</span></td>
            <td><span>{this.props.record.tool}</span></td>
            <td><span>{this.props.record.cost}</span></td>
          </tr>                            
      )
    }
}