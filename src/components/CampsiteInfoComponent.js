import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import {CAMPSITES} from '../shared/campsites'
class CampsiteInfo extends Component {
    constructor(props){
        super(props);
        this.state={};
    }

    renderCampsite(props){
        console.log(props);
        return(
            <div className="col-md-5 m-1">
                 <Card>
                    <CardImg top src={props.campsite.image} alt={props.campsite.name} />
                    <CardBody>
                        <CardTitle>{props.campsite.name}</CardTitle>
                        <CardText>{props.campsite.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        }
           
        render(){
            console.log(this.prop)
            if(this.props.campsite){
                return(<div className="Row">
                    <this.renderCampsite campsite= {this.props.campsite}/>
                </div>)
            }
            else{
                return(<div>No campsite selected</div>)
            }
        
    }

renderComments(props) {
    console.log(props);
     if(props.comments){
        
        return(<div className ="col-md-5 m-1">
            <h4>Comments</h4>
{props.campsites.map(comments => 
<div>{props.comments.text}
,{props.comments.author},{props.comments.date}</div>)}

        </div>)  
      } 
      else{
          return(
          
<div></div>
          )
      }

    }
  

    }

 



export default CampsiteInfo;

  
       
       
      
    

