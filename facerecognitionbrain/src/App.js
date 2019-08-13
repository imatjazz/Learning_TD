import React, {Component} from 'react';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';



const particlesOptions = {
  particles: {
    number:{
      value: 150,
      density:{
        enable: true,
        value_area: 800
      }
    }
    // line_linked: {
    //   shadow: {
    //     enable: true,
    //     color: "#3CA9D1",
    //     blur: 5
    //   }
    // }
  }
}

const initialState = {
  input: '',
  imageUrl:'',
  box: {},
  route: '',
  isSignedIn:false,
  user:{
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: new Date()
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation = (data) =>{
    // console.log('==================================================================');
    // console.log(data);
    // console.log('==================================================================');

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    // console.log(width, height)
    // console.log('clarifaiFace',clarifaiFace)

    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) => {
    console.log('box',box);
    this.setState({box: box});
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value})
    // console.log(event.target.value);
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    // .catch(err => console.log('!!!! ' + err))
    .then(response => {
      if(response){
        console.log('>>>> '+ response);
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .catch(err => console.log('found error here 1 ' + err))
        .then(response => response.json())
        .catch(err => console.log('found error here 2 ' + err))
        .then(count => {
          // console.log('count: ' + count);
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
        .catch(err => console.log('found error here 3 ' + err))
      }
      // console.log(response);
      this.displayFaceBox(this.calculateFaceLocation(response));
    }) 
    .catch(err => console.log('ui errr ' + err));
  }

  onRouteChange = (route)=>{
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
        this.setState({isSignedIn:true})
      }      
    this.setState({route: route});
  }
 
  loadUser = (data)=>{
    this.setState({
      user:{
        // id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        // entries: data.entries,
        // joined: data.joined
      }
    })
  }

  render(){
    const {isSignedIn, box, imageUrl, route} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route=== 'home'
          ? <div>
              <Logo />
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition 
                box = {box}
                imageUrl={imageUrl} />
            </div>
          : (
              route === 'signin'
                ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
