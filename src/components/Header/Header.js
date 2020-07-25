import React from 'react';
import {Link} from 'react-router-dom';
import "./styles.css";

export default function Header(){
    return <div className="header"><Link to={'/'}>Smart House</Link></div>
}