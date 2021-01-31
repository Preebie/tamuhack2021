// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import  Firebase from "firebase";
import 'firebase/app';
import 'firebase/database'; 
import config from "./config.js";

import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
 import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const array1 = useRef([]);
  const count = useRef([0]);

  if (!Firebase.apps.length) {
    Firebase.initializeApp(config);
}
  
  let ref = Firebase.database().ref("zach");
    ref.on("value", snapshot => {
      console.log("pirr",snapshot.val());
    });

    Firebase.database().ref('/').onDisconnect().set({"zach":0})

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    const net = await cocossd.load();
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 1);
  };

  function center(obj){  
        
        const xCenter = (obj.bbox[2]/2)+ obj.bbox[0];
        const yCenter = (obj.bbox[3]/2)+ obj.bbox[1];
        var coordinates = [xCenter, yCenter];
        return coordinates;
        //console.log(xCenter,yCenter)
        //if (xCenter <  100 || xCenter >540){
          //console.log(xCenter)
          //console.log(obj)
          //console.log(array1.current.length)
        //}

        
      
  }
  //gives edge if something is close enough, else returns 'NONE'
   function checkEdges(objArray, videoWidth, videoLength, doorEdgeWord){
     //make dictionary for min and max x coordinates of objects
     var minMax = {
       "min": center(objArray[0])[0],
       "max": center(objArray[0])[0]
     }
     //find min and max objects, so the one on the sides
      for (let i = 0; i < objArray.length; i ++){
        if (minMax['max'] > center(objArray[i])[0]){
          minMax['max'] = center(objArray[i])[0]
        }
        if (center(objArray[i])[0] < minMax['min']){
          minMax['min'] = center(objArray[i])[0]
        }

      }
      var distDoor;
      var distOther;

      // assigning
      if (doorEdgeWord === 'LEFT'){
        //console.log('left')
         distDoor = minMax['min'];
         distOther = videoWidth - minMax['max'];
         
      }
      else{
        //console.log('right')
        distOther = minMax['min'];
        distDoor =  videoWidth - minMax['max'];
      }

      if (distDoor < 100  && distDoor < distOther){
        //console.log(distDoor < )
        console.log(distDoor, distOther)
        return 'going_in'
      }
      if (distOther < 100 && distOther < distDoor){
        console.log(distDoor, distOther)
        return 'going_out'
      }
      else{
        console.log(distDoor, distOther)
        return 'blip';
      }



   }

function people(objArray){
    var peopleArray = [];
    for (let i = 0; i < objArray.length; i ++){
      if (objArray[i].class === "person" || objArray[i].class === "cell phone") {
             peopleArray.push(objArray[i]);
           }
    
  }
  return peopleArray;
}
  
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      canvasRef2.current.width = videoWidth;
      canvasRef2.current.height = videoHeight;

      // 4. TODO - Make Detections
       const obj = await net.detect(video);
       //console.log(obj);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      const ctx2 = canvasRef2.current.getContext("2d");

      // 5. TODO - Update drawing utility
       drawRect(obj, ctx,ctx2)
      // let counter = 0; 
      // let foundPerson = false;
      // for (let i = 0; i < obj.length; i++) {
      //   if (obj[i].class === "person") {
      //     counter++;
      //   }
      //   if (counter === 2){
      //     foundPerson = true;
      //     console.log(obj + Date.now())
      //     break;
      //   }
      // }
      //array1.current.push(obj)


      // for (let i = 0; i < obj.length; i++){
      //   center(obj[i]);
      //   console.log( "obj"+ i);
      // }
        
      if (array1.current.length === 0){
        array1.current.push(obj);
        //console.log(0);
      }
      if (array1.current.length === 1){
        array1.current.push(obj)
        //console.log(1);
      }
      if (array1.current.length === 2){
        array1.current[0] = array1.current[1];
        array1.current[1] = obj;
        //console.log(2)
        const peoplePrev = people(array1.current[0]);
        const peopleCurr = people(array1.current[1]);
        
        if (peoplePrev.length > peopleCurr.length){
          const doorSide = 'LEFT';
          const direction = checkEdges(peoplePrev,videoWidth, videoHeight, doorSide);
          //console.log()
          const prevCount = count.current[0];
          if (direction=== "going_in" ){
            console.log(direction)

            count.current[0] = prevCount +1;
          }
          if (direction === "going_out"){
            console.log(direction)
            count.current[0] = prevCount -1 ;
          } 
          if (direction === "blip"){
            console.log(direction)
          }
          console.log(count.current[0]) 
          let ref = Firebase.database().ref("/");
          ref.update({
            "zach": count.current[0]
          })  
          
        
        }
    }


      

      


    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
            
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef2}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
