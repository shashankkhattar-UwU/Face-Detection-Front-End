import React from 'react';
import './App.css';
import Logo from './Components/Logo/Logo';
import UrlEntry from './Components/UrlEntry/UrlEntry';
import Particles from 'react-tsparticles';
import { Component } from 'react/cjs/react.production.min';
import ImageDisplay from './Components/ImageDisplay/ImageDisplay';
import configData from './config.json';             //Api key, userId, and appId are to be in the config.json file, which, along the indexing shown in lines 36, 37 and 54


const particlesInit = (main) => {
};

const particlesLoaded = (container) => {
  // console.log(container);
};
class App extends Component{
  constructor(){
    super();
    this.state={
      input: '',
      imageURL: '',
      box: []
    }
  }
  onInputChange = (event)=>{
    this.setState({input: event.target.value});
  }
  onSubmit = () =>{
    this.setState({imageURL: this.state.input});
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": configData["clarifai"]["UserId"],
        "app_id": configData["clarifai"]["AppId"]
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input
            }
          }
        }
      ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': configData["clarifai"]["AuthKey"]
      },
      body: raw
    };
    fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs", requestOptions)
      .then(response => response.json())
      // .then(response => {
      //   console.log(response);
      //   return response;
      // })
      .then(result=>result.outputs[0].data.regions) //[0].region_info.bounding_box
      .then(result=>this.displayBoxes(this.calculateFaceLocation(result)))
      .catch(error => console.log('error, No face found!'));
  }
  calculateFaceLocation = (data) =>{
    var ans=[];
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    ans=data.map(x=>{
      const faceBox=x.region_info.bounding_box;
      return{
      leftCol: faceBox.left_col * width,
      topRow: faceBox.top_row * height,
      rightCol: width - (faceBox.right_col * width),
      bottomRow: height - (faceBox.bottom_row * height),
      }
    });
    // console.log(ans);
    return ans;
  }
  displayBoxes=(box)=>{
    this.setState({box: box});
  }
  render(){
    return (
      <div className="App">
        <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0d47a0.5",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 2,
            },
          },
          detectRetina: true,
        }}
      />
        
            <div>
              <Logo />
              <UrlEntry onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <ImageDisplay box={this.state.box} imageURL={this.state.imageURL} />
            </div>
      </div>
    );}
}

export default App;
