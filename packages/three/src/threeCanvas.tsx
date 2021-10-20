import React, {
  useCallback,
  useEffect,
  useRef,
  MutableRefObject,
  LegacyRef,
  CSSProperties,
} from 'react';

import * as THREE from 'three';
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { useResize } from '@elonwu/hooks';

export interface ThreeCbOptions {}

export const loadGLTFModel = ({
  assets,
  scene,
  onSuccess,
  onProcess,
  onError,
}: {
  assets: any[];
  scene: Scene;
  onSuccess: (gltf: GLTF) => void;
  onProcess: (e: ProgressEvent) => void;
  onError: (err: ErrorEvent) => void;
}) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/gltf/',
  );
  loader.setDRACOLoader(dracoLoader);

  assets.forEach((asset) => {
    loader.load(
      asset,
      (gltf) => {
        onSuccess && onSuccess(gltf);
        // 加入场景
        scene.add(gltf.scene);
      },
      // 加载进度
      // function (xhr) {
      //   console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      // },
      onProcess,
      onError,
    );
  });
};

export const useThree = function <T extends HTMLElement>(
  init: (options: ThreeCbOptions) => void,
  animate: (options: ThreeCbOptions) => void,
): MutableRefObject<T | undefined> {
  // dom 容器
  const containerRef = useRef<T>();
  // 渲染信息
  const statsRef = useRef<Stats>(Stats());
  // 场景
  const sceneRef = useRef<Scene>(new THREE.Scene());
  // 渲染器
  const rendererRef = useRef<WebGLRenderer>(
    new THREE.WebGLRenderer({ antialias: true, alpha: true }),
  );
  // 相机
  const cameraRef = useRef<PerspectiveCamera>(
    new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      5000,
    ),
  );

  // 实时更新渲染画布大小
  const { width, height } = useResize(containerRef);

  useEffect(() => {
    // 设置渲染器
    const renderer = rendererRef.current;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;

    // renderer.setClearColor(0xf9f9f9);

    // 更新相机视野大小
    const camera = cameraRef.current;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }, [width, height]);

  // 将渲染器放入 dom 容器
  useEffect(() => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    const stats = statsRef.current;

    if (!container) return;

    container.appendChild(stats.dom);

    container.appendChild(renderer.domElement);

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef?.current;
    const renderer = rendererRef?.current;
    const camera = cameraRef?.current;
    const stats = statsRef.current;

    const options = { scene, renderer, camera };

    init(options);

    const renderByFrame = () => {
      requestAnimationFrame(renderByFrame);

      // 执行自定义动画
      animate && animate(options);
      stats.update();
      renderer.render(sceneRef.current, cameraRef.current);
    };

    renderByFrame();
  }, [init, animate]);

  return containerRef;
};

export const ThreeCanvas = ({
  init,
  animate,

  style = {},
}: {
  init: (options: ThreeCbOptions) => void;
  animate: (options: ThreeCbOptions) => void;
  style?: CSSProperties;
}) => {
  const ref = useThree<HTMLDivElement>(init, animate);

  return (
    <div
      ref={ref as LegacyRef<HTMLDivElement>}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        ...style,
      }}
    />
  );
};
