import React, { useRef, useCallback } from 'react';

import { ThreeCanvas, loadGLTFModel } from '../src';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import tokyo from './assets/tokyo.glb';

export default {
  title: 'Components/ThreeCanvas',
  component: ThreeCanvas,
};

const MiniTokyoCanvas = () => {
  const modelsRef = useRef([]);
  const controlsRef = useRef([]);

  const mixerRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  const setUpCamera = useCallback((camera) => {
    camera.position.set(2, 5, 8);
    camera.updateProjectionMatrix();
  }, []);

  const setUpScene = useCallback(({ scene, renderer }) => {
    // scene.background = new THREE.Color(0xbfe3dd); // 有色背景
    renderer.setClearColor(0xffffff, 0); // 透明背景

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04,
    ).texture;
  }, []);

  const setUpDragControl = useCallback(({ renderer, camera }) => {
    controlsRef.current = controlsRef.current.concat(
      new DragControls(modelsRef.current, camera, renderer.domElement),
    );
  }, []);

  const setUpOrbitControl = useCallback(({ renderer, camera }) => {
    const control = new OrbitControls(camera, renderer.domElement);
    control.target.set(0, 0.5, 0);
    control.enablePan = false;
    control.enableDamping = true;
    control.update();

    controlsRef.current = controlsRef.current.concat(control);
  }, []);

  const onGLTFLoad = useCallback(({ gltf, scene, renderer, camera }) => {
    const model = gltf.scene;

    // 配置 model 初始化参数
    model.position.set(1, 1, 0);
    model.scale.set(0.01, 0.01, 0.01);

    model.traverse((child) => {
      // modelsRef.current = modelsRef.current.concat(child);
      setUpDragControl({ objects: [child], renderer, camera });
    });

    // 获取 model 的动画
    const mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();
    mixerRef.current = mixer;
  }, []);

  const init = useCallback(({ scene, renderer, camera }) => {
    setUpScene({ scene, renderer, camera });

    setUpOrbitControl({ renderer, camera });
    setUpCamera(camera);
    loadGLTFModel({
      assets: [tokyo],
      scene,
      onSuccess: (gltf) => onGLTFLoad({ gltf, scene, renderer, camera }),
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
    const controls = controlsRef.current;
    controls.forEach((control) => control?.update?.());
  }, []);

  const animate = useCallback(({ scene, renderer, camera }) => {
    updateControl();
    updateMixer();
  }, []);

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
      <ThreeCanvas init={init} animate={animate} />
    </div>
  );
};

export const MiniTokyo = () => <MiniTokyoCanvas />;
