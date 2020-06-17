import React from 'react';
import Particles from 'react-particles-js';
// style
import './PageContent.css';

const ParticleParams = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
      size: {
        value: 3,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
    },
  },
};

export default function PageContent(props) {
  const styles = {
    backgroundColor: 'gray',
    height: '130vh',
    width: '100vw',
  };
  return (
    <div style={styles}>
      {props.children}
      <Particles className="particles" params={ParticleParams} />
    </div>
  );
}
