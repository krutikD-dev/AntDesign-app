import React from 'react'
import './Footer.css'
import {Input, Button} from 'antd'
import logo from "../../public/logo2.svg";


function Footer() {
  return (
    <>
    <div className="footer">
        <div className="col">
            <div className="row">
                <img src={logo} alt="" />
                <span className='brandName'>ShopSwift</span>
            </div>
            <div className="brandLine">
                <span>Your shift to better.</span>
            </div>
        </div>
        <div className="col">
            <ul>
                <h3>About Us</h3>
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
            </ul>
        </div>
        <div className="col"><ul>
                <h3>Help And Support</h3>
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
            </ul></div>
        <div className="col"><ul>
                <h3>Legal</h3>
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
            </ul></div>
        <div className="col"><ul>
                <h3>Stay Connected</h3>
                <li>Subxscribe to our newsLetter for Latest Updates.</li>
                <div className="row">
                    <Input type="email" placeholder='Enter Email' className='email-input '/>
                    <Button type="primary">Subscribe</Button>
                </div>
                
            </ul></div>
    </div>
            <div className='bottom-footer' >
          ShopSwift ©{new Date().getFullYear()} Created by ShopSwift
        </div>

    </>
  )
}

export default Footer