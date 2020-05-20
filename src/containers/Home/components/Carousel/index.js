import React from 'react';
import {Carousel} from 'antd-mobile'
import A from './images/4.jpg'
import B from './images/5.jpg'
import C from './images/6.jpg'
import './index.less'

const adverArr =  [A, B, C]
function CarouselIndex() {
    return (
        <div className="home-page-carousel">
               <Carousel
                autoplay={false}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
            >
                {adverArr.map(val => (
                    <span
                        key={val}
                        style={{ display: 'inline-block', width: '100%' }}
                    >
                        <img
                            src={val}
                            alt=""
                            style={{touchAction:'none', width: '100%', verticalAlign: 'top' }}
                            onLoad={(e) => {
                                e.preventDefault()
                                window.dispatchEvent(new Event('resize'));
                            }}
                        />
                    </span>
                ))}
            </Carousel>
        </div>
    )
}

export default CarouselIndex;
