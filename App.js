import './App.css';
import React,{Component} from 'react';
import './sai.css';
import BarChart from './BarChart'
import CopyText from './CopyText'


class App extends Component {  
    
    constructor(){
        super();
        this.state = {
                       page:1,
                       pagesize:30,
                       datefrom:'2021-01-01',
                       dateto:'2021-03-08',
                       charts: {
                          labels: [],
                          datasets: [
                            {
                              label: 'Language vs Count',
                              backgroundColor: 'black',
                              borderColor: 'rgba(0,0,0,1)',
                              borderWidth: 2,
                              data: []
                            }
                          ]
                        }
                };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
     componentDidMount() {
         fetch('https://api.stackexchange.com/2.2/tags?pagesize=30&order=desc&sort=popular&site=stackoverflow')
        .then(res => res.json())
        .then(data => this.FillingData(data))
        .catch(console.log)
      }
    
    FillingData(data)
    {
                var dataset = data.items.map(item =>{
                                                const container = {};

                                                container.count = item.count;
                                                container.name = item.name;

                                                return container;
                                            });
        
              
                  var names= dataset.map(item=>item.name);
                  var counts = dataset.map(item=>item.count);
        
                  var modifiedCharts={...this.state.charts};
                  modifiedCharts.labels = names;
                  
                  var datasetsModified = modifiedCharts.datasets;
                  datasetsModified[0].data = counts;
                  var newdataset= [datasetsModified[0]];
        
                   modifiedCharts.datasets= newdataset;
                  this.setState({charts:modifiedCharts});
                 
                  
        
    }
    
    
  
   
     handleChange(event) {
          var name = event.target.name;
          var value = event.target.value;
        // console.log(name+" " +value);
         this.setState({[name]:value});
    }

    handleSubmit(event) {
        
        
        let api =   'https://api.stackexchange.com/2.2/tags?';
         api    = api+ 'page='+ this.state.page +'&';
         api    = api+ 'pagesize='+ this.state.pagesize +'&';
         api    = api+ 'fromdate='+ Date.parse(this.state.datefrom)/1000+'&';
        api     = api+ 'todate='+ Date.parse(this.state.dateto)/1000+'&';
        api     = api + 'order=desc&sort=popular&site=stackoverflow';
        
        
        //console.log(api);
        
         fetch(api)
        .then(res => res.json())
        .then(data => this.FillingData(data))
        .catch(console.log)
        
        event.preventDefault();
    }
    
     render(){ 
      
      return(
                 
               <div class="box-wrapper"> 
                <div class="box1"> 
                    <BarChart data={this.state.charts}/>
                </div> 

               <div class = "box2">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                          Page: 
                          <input type="number" value= {this.state.page } name="page" onChange={this.handleChange}/>
                        </label>

                        <label>
                          PageSize: 
                          <input type="number"  value ={this.state.pagesize} name="pagesize" onChange={this.handleChange}/>
                        </label>

                        <label>
                          DateFrom: 
                          <input type= "date"  value ={this.state.datefrom} name="datefrom" onChange={this.handleChange}/>
                        </label>

                         <label>
                          DateTo: 
                          <input type= "date" value ={this.state.dateto} name="dateto"   onChange={this.handleChange}/>
                        </label>

                        <input type="submit" value="Submit" />
                      </form>

                     <CopyText/>  
                </div>
                   
                
                         
                 
           </div>


          )
         }
}

export default App;
