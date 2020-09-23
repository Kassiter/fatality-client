import React from 'react';
import init from './init';

export default class WebGL extends React.Component{

   componentDidMount(){
      init('webgl')
   }

   render(){
      return <canvas id="webgl" width="20px" height="20px" style={{ border: '1pt solid black'}}></canvas>
   }
}