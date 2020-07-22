import Carousel from 'react-bootstrap/Carousel'
import React from "react";
import '../../stylesheets/carousel.css'
//import { FaSteamSymbol } from 'react-icons/fa';

class Slider extends React.Component {
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
            {/* <Carousel.Item>
            <div className="carousel__slide carousel__slide--3"></div>
            <Carousel.Caption>
               <h3>Third slide label</h3>
               <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
            </Carousel.Item> */}
         </Carousel>
        );
    }
}

export default Slider;