import React from 'react';
import user from '../images/user.png';

const ContactCard = (props) => {
    const {name, email, id } = props.contact;
    <img className="ui avatar image" src={user} alt="user" />
    return (
        <div className="item">
                <div className="content">
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </div>
                <i 
                 className="trash alternate outline icon"
                 style={{color:"red", marginTop:"7px"}}
                 onClick={() => props.clickHandler(id)}
                ></i>
            </div>
    );
};
export default ContactCard;