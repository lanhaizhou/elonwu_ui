import React, { useRef, useCallback, useMemo } from 'react';

import { ThreeCanvas, loadGLTFModel, ThreeModelCanvas } from '../src';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export default {
  title: 'Components/ThreeCanvas',
  component: ThreeCanvas,
};

const MiniTokyoCanvas = () => {
  const orbitControlsRef = useRef([]);
  const dragControlsRef = useRef([]);

  const mixerRef = useRef();
  const modelRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  const setupScene = useCallback(({ scene, renderer }) => {
    // scene.background = new THREE.Color(0xbfe3dd); // 有色背景

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04,
    ).texture;
  }, []);

  const setupOrbitControl = useCallback(({ renderer, camera }) => {
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0.5, 0);
    orbitControls.enablePan = false;
    orbitControls.enableDamping = true;
    orbitControls.update();

    orbitControlsRef.current = orbitControls;
  }, []);

  const setModelGui = ({ gui, model, camera }) => {
    // 调整 model
    const modelFolder = gui.addFolder('Model');
    modelFolder.add(model.rotation, 'x', 0, Math.PI * 2);
    modelFolder.add(model.rotation, 'y', 0, Math.PI * 2);
    modelFolder.add(model.rotation, 'z', 0, Math.PI * 2);
    modelFolder.open();

    // 调整相机
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(camera.position, 'x', 0, 10);
    cameraFolder.add(camera.position, 'y', 0, 10);
    cameraFolder.add(camera.position, 'z', 0, 10);
    cameraFolder.open();
  };

  const onGLTFLoad = useCallback(({ gltf, scene, renderer, camera, gui }) => {
    const model = gltf.scene;

    // 配置 model 初始化参数
    model.position.set(1, 1, 0);
    model.scale.set(0.01, 0.01, 0.01);

    modelRef.current = model;

    setModelGui({ gui, model, camera });

    // const dragControls = new DragControls(
    //   model.children,
    //   camera,
    //   renderer.domElement,
    // );
    // dragControls.addEventListener('hoveron', function () {
    //   orbitControlsRef.current.enabled = false;
    // });
    // dragControlsRef.current = dragControls;

    // 获取 model 的动画
    const mixer = new THREE.AnimationMixer(model);
    if (gltf.animations?.length > 0) {
      mixer.clipAction(gltf.animations[0]).play();
      mixerRef.current = mixer;
    }
  }, []);

  const init = useCallback(({ scene, renderer, camera, gui }) => {
    setupScene({ scene, renderer, camera });
    setupOrbitControl({ renderer, camera });

    loadGLTFModel({
      asset:
        // 'http://127.0.0.1:8080/models/hover_bike_the_rocket/scene.gltf',
        // 'http://127.0.0.1:8080/models/lord_inquisitor_servo_skull/scene.gltf',
        'http://127.0.0.1:8080/models/tokyo.glb',
      // 'http://127.0.0.1:8080/models/buster_drone/scene.gltf',
      // 'http://127.0.0.1:8080/models/security_cyborg/scene.gltf',
      scene,
      onSuccess: (gltf) => onGLTFLoad({ gltf, scene, renderer, camera, gui }),
      onError: (error) => console.dir(error),
    });
  }, []);

  const updateMixer = () => {
    const mixer = mixerRef.current;
    if (!mixer) return;

    const clock = clockRef.current;
    const delta = clock.getDelta();
    mixer.update(delta);
  };

  const updateControl = useCallback(() => {
    const orbitControls = orbitControlsRef.current;
    const dragControls = dragControlsRef.current;

    orbitControls?.update?.();
    dragControls?.update?.();
  }, []);

  const animate = useCallback(({ scene, renderer, camera }) => {
    updateControl();
    updateMixer();
  }, []);

  const onWheel = (e) => {
    console.log(e);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeContent: 'stretch',
        placeItems: 'center',
        background: '#404040',
      }}
    >
      <ThreeCanvas
        init={init}
        animate={animate}
        events={{ wheel: onWheel }}
        style={{ width: '80%', height: '80%' }}
      />
    </div>
  );
};

const CubeCanvas = () => {
  const planeRef = useRef();
  const mouseLightRef = useRef();
  const cubeRef = useRef([]);

  const setupCamera = (camera) => {
    camera.position.set(0, 0, 5);
    camera.updateProjectionMatrix();
  };

  const setupPlane = ({ scene }) => {
    const geometry = new THREE.PlaneGeometry(3, 3, 8, 8);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      flatShading: THREE.FlatShading,
    });
    const plane = new THREE.Mesh(geometry, material);

    const dots = plane?.geometry?.attributes?.position?.array;

    for (let i = 0; i < dots.length - 2; i += 3) {
      dots[i + 2] += Math.random() * 0.5 - 1;
    }

    scene.add(plane);
    planeRef.current = plane;
  };

  const setupCube = ({ scene }) => {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    cubeRef.current = cube;
  };

  const setupLight = ({ scene }) => {
    const lightFront = new THREE.DirectionalLight(0xffffff, 0.2);
    const lightBack = new THREE.DirectionalLight(0xffffff, 0.2);

    const mouseLight = new THREE.DirectionalLight(0x00ff00, 0);

    mouseLightRef.current = mouseLight;

    lightFront.position.set(0, 0, 1);
    lightBack.position.set(0, 0, -1);

    scene.add(lightFront);
    scene.add(lightBack);
    scene.add(mouseLight);
  };

  const setupOrbitControl = useCallback(({ renderer, camera }) => {
    const control = new OrbitControls(camera, renderer.domElement);
    control.target.set(0, 0.5, 0);
    control.enablePan = false;
    control.enableDamping = true;
    control.update();
  }, []);

  const init = useCallback(({ scene, renderer, camera, gui }) => {
    setupCamera(camera);
    setupPlane({ scene });

    setupCube({ scene });

    setupLight({ scene });
    setupOrbitControl({ scene, renderer, camera });

    var axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);
  }, []);

  const animate = useCallback(({ scene, renderer, camera }) => {}, []);

  const onMouseMove = (e, pos) => {
    cubeRef.current.position.x = pos.x;
    cubeRef.current.position.y = pos.y;

    mouseLightRef.current.intensity = 1;
    mouseLightRef.current.position.set(pos.x, pos.y, 1);
  };

  return (
    <div
      style={{
        width: '60vw',
        height: '60vh',
        display: 'grid',
        placeContent: 'stretch',
        placeItems: 'center',
        background: '#404040',
      }}
    >
      <ThreeCanvas
        init={init}
        animate={animate}
        events={{
          mousemove: onMouseMove,
        }}
      />
    </div>
  );
};

export const MiniTokyo = () => <MiniTokyoCanvas />;

export const Cube = () => <CubeCanvas />;

export const ModelCnanvas = () => {
  const src = useMemo(() => {
    const modelBaseUrl = 'http://127.0.0.1:8080/models';

    const assets = [
      '/buster_drone/scene.gltf',
      '/hover_bike_the_rocket/scene.gltf',
      '/lord_inquisitor_servo_skull/scene.gltf',
      '/security_cyborg/scene.gltf',
      '/tokyo.glb',
    ];

    return `${modelBaseUrl}${assets[2]}`;
  }, []);

  return (
    <ThreeModelCanvas
      src={src}
      style={{
        width: 400,
        height: 400,
        borderRadius: '50%',
        overflow: 'hidden',
        background: `
        radial-gradient(ellipse at top, #666465, transparent),
        radial-gradient(ellipse at bottom, #436451, transparent)
        `,
      }}
      decoderpath={'http://127.0.0.1:8080/decoder'}
      canvasStyle={{ width: '100%', height: '100%' }}
      options={{
        position: { x: 1, y: 1, z: 0 },
        scale: { x: 0.04, y: 0.04, z: 0.04 },
      }}
      cameraOptions={{
        position: { x: 10, y: 0, z: 0 },
      }}
    />
  );
};
