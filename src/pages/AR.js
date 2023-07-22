import React, { useEffect } from 'react';
//import { Entity, Scene } from 'aframe-react';

const AR = () => {
  useEffect(() => {
    const updateBuildingEntity = async (latitude, longitude) => {
      const west = longitude - 0.001;
      const east = longitude + 0.001;
      const south = latitude - 0.001;
      const north = latitude + 0.001;
      const response = await fetch(`https://ar-building-hk-be.ap-east-1.elasticbeanstalk.com/api/map?bbox=${west},${south},${east},${north}`);
      const pois = await response.json();
      console.log(pois.data.buildings.length);
      const ac = document.querySelector("a-scene");
      pois.data.buildings.forEach((building) => {
        console.log(building.latitude);
        console.log(building.longitude);
        let template = document.createElement('template');
        let existingAtext = document.getElementById(`#${building.id}`);
        if (existingAtext) {
          existingAtext.remove();
        }

        console.log("get the name",building.id,building.building_name_en);
        const html = `<a-entity id="${building.id}" gps-entity-place="latitude: ${building.latitude}; longitude: ${building.longitude};">
          <a-text value="${building.building_name_en}" look-at="[gps-camera]" scale="75 75 75" align="center"></a-text></a-entity>`;
        template.innerHTML = html;
        const node = template.content.firstChild;
        ac.appendChild(node);
      });
      ac.flushToDOM(true);
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser");
      }
    };

    const showPosition = async (position) => {
      console.log("Latitude: " + position.coords.latitude);
      console.log("Longitude: " + position.coords.longitude);
      await updateBuildingEntity(position.coords.latitude, position.coords.longitude);
    };

    const onSceneLoaded = async () => {
      await getLocation();
    };

    onSceneLoaded();

    const el = document.querySelector("[gps-camera]");
    el.addEventListener("gps-camera-update-position", async (e) => {
      await updateBuildingEntity(e.detail.position.latitude, e.detail.position.longitude);
    });

    return () => {
      el.removeEventListener("gps-camera-update-position", async (e) => {
        await updateBuildingEntity(e.detail.position.latitude, e.detail.position.longitude);
      });
    };
  }, []);

  return (
    <div>
      <h1>AR View</h1>
      <a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
    <a-camera gps-camera='gpsMinDistance: 10' look-controls-enabled='false' look-at="[gps-camera]" arjs-look-controls='smoothingFactor: 0.1' rotation-reader></a-camera>
  </a-scene>
    </div>
  );
};

export default AR;