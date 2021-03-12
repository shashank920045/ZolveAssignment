import React,{Component} from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component{
    
    render(){
      return(
          
          <Bar
              data={this.props.data}
              width={100}
              height={50}
              options={{ maintainAspectRatio: false }}
            />
          )
    }
}

export default BarChart;