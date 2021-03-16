import { Line } from 'react-chartjs-2';
import React, { Component } from 'react';

import './graphicDrawer.css'

export default class GraphicDrawer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {
            labels: [], // date
            datasets: [{
                label: this.props.toolName,
                data: [], // cost
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                },],
            },
        }
          
      }
         
    }
    componentWillReceiveProps(nextProps) {
        this.setState({  
            data: {
                labels: Array.from(this.dataMapping().get(nextProps.toolName).keys()), // date
                datasets: [{
                    label: nextProps.toolName,
                    data: Array.from(this.dataMapping().get(nextProps.toolName).values())  , // cost
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },],
            }
      });

    }
    
    componentDidMount() {
        this.setState({  
            data: {
                labels: Array.from(this.dataMapping().get(this.props.toolName).keys()), // date
                datasets: [{
                    label: this.props.toolName,
                    data: Array.from(this.dataMapping().get(this.props.toolName).values())  , // cost
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },],
            }
      });
       
    }



    dataMapping() {
        let mapTool = new Map();        // Key - Tool, value - array maps date and cost
        let toolNameSet = new Set();    // Set of tool names
            
        this.props.records.forEach(item => {
            toolNameSet.add(item.tool);
        });



        toolNameSet.forEach(item => {
            mapTool.set(item, new Map());
        });

        this.props.records.forEach(item => {
            mapTool.get(item.tool).set(item.date, item.cost);
        });

        //sort by date
        toolNameSet.forEach(item => {
            mapTool.set(item, new Map([...mapTool.get(item).entries()].sort()));
        });
        

        return mapTool;
    }



    

    render() {
            
        
        return(
            <div className="graphic-drawer">
                <Line data={this.state.data} options={this.state.options} />            
            </div>
        )
    }
  
}