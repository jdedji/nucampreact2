import React, { Component } from 'react'; //Component is revoved because class compo no longuer exist
import { Card, CardImg, CardText, CardBody,Modal,ModalHeader,ModalBody, Label, Col, CardTitle, Breadcrumb, Button,BreadcrumbItem, ModalFooter } from 'reactstrap';
import {CAMPSITES} from '../shared/campsites';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const validName= val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function RenderCampsite({campsite}) {
    return(
        <div className="col-md-5 m-1">
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    </div>
    );
    }
 function RenderComments({comments, postComment, campsiteId})  { 
if(comments){
return(<div className ="col-md-5 m-1">
<h4>Comments</h4>
                <Stagger in>
                    {comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                                <div>
                                    <p>{comment.text}<br />
                                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </div>
                            </Fade>
                        );
                    })}
                </Stagger>
<CommentForm campsiteId={campsiteId} postComment={postComment} />
</div> 
        ); 
        } 
        
      else{
          return(<div></div>
          

          )
      }
     
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
    
 
        return (
            <div className="container">
             <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
           
              <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                    comments={props.comments}  
                    postComment={props.addComment}
                    campsiteId={props.campsite.id}
                    />
               </div>
               </div>
        );
    }
    
    return <div />;
        }
class CommentForm extends Component{
    constructor(props){
        super(props);
         this.state = {
             Modal: false,
             className: "className"
         }

         this.toggleModal = this.toggleModal.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
        }

         render(){
             return(
                 <div className = "container">
                 <Button type = "outline" onClick= {this.toggleModal}><i className='fa fa-pencil fa-lg' /> Submit Comment</Button>
                 

                 <Modal isOpen={this.state.Modal} toggle={this.toggleModal} className={this.state.className}>
                 <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                 <ModalBody>
                  <LocalForm onSubmit={values => this.handleSubmit(values)}> 
                      <div className="form-group">
                      <Col md= {(4)}>
                          <Label htmlFor="rating">Rating</Label> <br/> 
                          <Control.select model=".rating"  id="rating">
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                       </Control.select>
                       </Col>
                       </div>
                       
                       <div className="form-group">
                          
                       <Label htmlFor="rating">Your name</Label> <br/> 
                       <Control.text model=".author"  id="author" Name="author"placeholder="Your Name"
                       
                       validators={{
                                            required,
                                            validName, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}

                        />
                              <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            validName: 'Invalid Name',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                      />
                       </div>
                       <div className="form-group">
                       <Label htmlFor="rating">Comment</Label> <br/> 
                       <Control.textarea model=".text"  id="text"></Control.textarea>
                       </div>
                      
                       <Button color="primary" onClick={this.toggleModal}>Submit</Button>
                     
                   </LocalForm>
               </ModalBody>
             
              </Modal>
             
             </div>
             )
         }
    
         toggleModal(){
           this.setState(Modal)
                
           
          function Modal(prev){
              return (
                {Modal: !prev.Modal}
              )
             
          }
           }
           handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        }
         
    
}

export default CampsiteInfo;


{/* class CampsiteInfo extends Component {
    constructor(props){
        super(props);
        this.state={};
    }

    renderCampsite(props){
        console.log(props);
        return(
            <div className ="col-md-5 m-1">
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
           
       

renderComments(comments) {
    if(comments){
        
        return(<div className ="col-md-5 m-1">
            <h4>Comments</h4>
{comments.map(comment =>{
    return(
<div key = {comment.id}>
<p>{comment.text} <br/>
,{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 
'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
</div>
    )

})}

</div> 
        ); 
        } 
        
      else{
          return(<div></div>
          

          )
      }
     
}
render(){
     if(this.props.campsite){
        return(<div className="Row">
            <div className = "container">
            <this.renderCampsite campsite = {this.props.campsite}/>
             {this.renderComments (this.props.campsite.comments)}
             </div>
        </div>)
    }
    else{
        return(<div>No campsite selected</div>)
    }
}
*/}
  