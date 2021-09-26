import React from 'react';
import { Map } from '../map';

export default {
  title: 'Components/Chart/Map',
  component: Map,
};

export const MapStory = () => (
  <Map
    chartKey="Story-Map"
    mainKey="live"
    tooltipKeys={['live', 'magnitude']}
    dataSource={[
      {
        date: '1902/12/16',
        location: 'Andijon (Andizhan), Uzbekistan (Turkestan, Russia)',
        lat: '40.8',
        lng: '72.3',
        live: 4700,
        magnitude: '6.4',
      },
      {
        date: '1905/04/04',
        location: 'Kangra, India',
        lat: '33.0',
        lng: '76.0',
        live: 19000,
        magnitude: '7.5',
      },
    ]}
    height={500}
  />
);
