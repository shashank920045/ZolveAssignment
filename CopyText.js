import './App.css';
import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sai.css';
import BarChart from './BarChart'
import Menu from './Menu'

class CopyText extends Component{
    
    constructor()
    {
     
        super()
        this.state = {
                label:'',
                myinput:'',
                urlinput :''
        }
        
         this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    
     handleClick(event) {
         
        
         if(event.target.name=="copyText")
         { 
              console.log(this.state.myinput);
             navigator.clipboard.writeText(this.state.myinput);
          
         }
         else if(event.target.name==="copyParams")
         {
             
             
             try {
                      var url = new URL(this.state.urlinput);
                       var c = url.searchParams.get("q");
                       if(c!==null)
                       {  
                        console.log(c); 
                           this.setState({label:c});
                         navigator.clipboard.writeText(c);

                       }
                         else
                         {
                          alert('Please enter a valid url which has params q');   
                         }
                } catch (error) {
                  alert(error); 
                }
         }
         
    }
    
    
     handleChange(event) {
          var name = event.target.name;
          var value = event.target.value;
        // console.log(name+" " +value);
         this.setState({[name]:value});
    }
    
    
  render(){
  
  return(
      
      <div>
  
         <div class ="box9">
                            
                <input type="text" placeholder="Enter Input" value={this.state.myinput} name="myinput" onChange={this.handleChange}/>

                <button name="copyText" onClick={this.handleClick} >Copy text</button>
                            
              </div>

              <div class ="box9">
                            
                <input type="text" placeholder= "Enter URL " value={this.state.urlinput} name="urlinput" onChange={this.handleChange}/>
                <button name= "copyParams" onClick={this.handleClick} >Copy Parameters</button>         
                <label> {this.state.label==''?'':('  Search Parameters: '+this.state.label)}</label>
              </div>



       </div>
  
  )
  
  }

}

export default CopyText;