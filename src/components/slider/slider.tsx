import Carousel from 'react-bootstrap/Carousel'
import React from "react";
import '../../stylesheets/carousel.css'
//import { FaSteamSymbol } from 'react-icons/fa';

interface Props{
   clearp(): void
}

class Slider extends React.Component<Props>{
   componentDidMount(){
      // setTimeout(() => {
      //    this.props.clearp()
      // }, 10000);
      window.addEventListener('load', this.props.clearp);
   }

    render() {
        return(
         <Carousel className="carousel-main">
            <Carousel.Item>
            <div className="carousel__slide carousel__slide--1"></div>
            <Carousel.Caption>
               <h3>Legendary Maniac</h3>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <div className="carousel__slide carousel__slide--2"></div>
            <Carousel.Caption>
               <h3>Лучшее комьюнити</h3>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <div className="carousel__slide carousel__slide--3"></div>
            <Carousel.Caption>
               <h3>Частые розыгрыши</h3>
            </Carousel.Caption>
            </Carousel.Item>
         </Carousel>
        );
    }
}

export default Slider;