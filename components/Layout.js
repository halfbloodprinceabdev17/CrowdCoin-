import React from 'react';
import Header from './Header';
import Head from 'next/Head';
import { Container } from 'semantic-ui-react';
import Image from 'semantic-ui-react'; 
 
 
 
export default (props) =>{
    const myStyle={
        backgroundImage: 
 "url('https://mdbcdn.b-cdn.net/img/new/fluid/nature/015.webp')",
        height:'120vh',
        marginTop:'-70px',
        fontSize:'10px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
 
    return (
        <div style={myStyle}>
        <Container  >
        <Head><link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/></Head>
        <Header/>
        {props.children}
        </Container>
     </div>
    );
};
