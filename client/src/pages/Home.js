import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import ParticlesBg from 'particles-bg'

import RegisterCard from '../components/RegisterCard';
import LoginCard from '../components/LoginCard';


let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    // body: "./img/icon.png", // Whether to render pictures
    rotate: [0, 20],
    alpha: [0.6, 0],
    scale: [1, 0.1],
    position: "center", // all or center or {x:1,y:1,width:100,height:100}
    color: ["random", "#ff0000"],
    cross: "dead", // cross or bround
    random: 15,  // or null,
    g: 3,    // gravity
    // f: [2, -1], // force
    onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
    }
  };
let config2 = {
        num: [4, 7],
        rps: 0.2,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-20, 20],
        alpha: [0.6, 0],
        scale: [.1, 0.4],
        position: "all",
        color: ["random", "#ff0000"],
        cross: "dead",
        // emitter: "follow",
        random: 15,
  };

const Home = () => {
    const [ locContext, setLocContext ] = useState('login');
    const state = useSelector((state) => state, shallowEqual);
    const { context } = useSelector((state) => state.app, shallowEqual);

    useEffect(() => {
        console.log('state:', state)
    }, [state])
    
    useEffect(() => {
        console.log("context, locContext:", context, locContext)
        if (context) {
            console.log("setting locContext to :", context)
            setLocContext(context);
        }
    }, [AudioContext])

    if (Math.random() > 0.85) {
        config = Object.assign(config, {
          onParticleUpdate: (ctx, particle) => {
            ctx.beginPath();
            ctx.rect(
              particle.p.x,
              particle.p.y,
              particle.radius * 2,
              particle.radius * 2
            );
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();
          }
        });
    }

    return (
        <div className='app-body'>
            <ParticlesBg type="circles" config={config} bg={{
                position: "absolute",
                zIndex: 999,
                width: 1400
              }} />
              <div className='login-container'>
                {context === 'login' && <LoginCard />}
                {context === 'register' && <RegisterCard />}
              </div>
        </div>
    );
};

export default Home;

// bg={true}