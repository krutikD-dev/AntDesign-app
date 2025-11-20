import React, {} from 'react'
import { Row, Col, Button,Spin} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import './Cards.css'


import './Card.css'
import Card from './Card';


function Cards({products}) {
    return (
        <>
            <Row gutter={[24, 24]}>
                {products.map((item,index) => (
                    <Card key={index} item={item}/>
                ))}
            </Row>
        </>
    )
}

export default Cards