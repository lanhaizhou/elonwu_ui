import React, {
  useMemo,
  useCallback,
  useEffect,
  useRef,
  MutableRefObject,
  LegacyRef,
  CSSProperties,
  EventHandler,
} from 'react';

import * as THREE from 'three';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AnimationMixer,
  Clock,
} from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import { useResize } from '@elonwu/hooks';

export interface ThreeCbOptions {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  gui: GUI;
}

export const loadGLTFModel = ({
  asset,
  scene,
  onSuccess,
  onProcess,
  onError,

  decoderPath = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/gltf/',
}: {
  asset: string;
  scene: Scene;
  decoderPath?: string;
  onSuccess?: (gltf: GLTF) => void;
  onProcess?: (e: ProgressEvent) => void;
  onError?: (err: ErrorEvent) => void;
}) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(decoderPath);
  loader.setDRACOLoader(dracoLoader);

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
};

const useThree = function <T extends HTMLElement>(
  init?: (options: ThreeCbOptions) => void,
  animate?: (options: ThreeCbOptions) => void,
): MutableRefObject<T | undefined> {
  // dom 容器
  const containerRef = useRef<T>();
  // 渲染信息
  const statsRef = useRef<Stats>(Stats());
  // 场景
  const sceneRef = useRef<Scene>(new THREE.Scene());
  // gui
  const guiRef = useRef<GUI>(new GUI());
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
    const gui = guiRef.current;

    const options: ThreeCbOptions = { scene, renderer, camera, gui };

    // 默认相机配置
    camera.position.set(2, 5, 8);
    camera.updateProjectionMatrix();

    // 默认渲染器配置
    // scene.background = new THREE.Color(0xbfe3dd); // 有色背景
    renderer.setClearColor(0xffffff, 0); // 透明背景

    init && init(options);

    const renderByFrame = () => {
      requestAnimationFrame(renderByFrame);

      // 执行自定义动画
      animate && animate(options);
      stats.update();
      renderer.render(sceneRef.current, cameraRef.current);
    };

    renderByFrame();

    return () => {
      gui.destroy();
    };
  }, [init, animate]);

  return containerRef;
};

export const ThreeCanvas = ({
  init,
  animate,
  events = {},
  style = {},
}: {
  init?: (options: ThreeCbOptions) => void;
  animate?: (options: ThreeCbOptions) => void;
  events: { [key in keyof HTMLElementEventMap]?: EventHandler<any> };
  style?: CSSProperties;
}) => {
  const ref = useThree<HTMLDivElement>(init, animate);

  const wrapEvents = useMemo(() => {
    const wrapEvents = {};

    Object.keys(events).forEach((key) => {
      const cb = events[key];

      wrapEvents[key] = (e: EventHandler<any>) => {
        const pos = { x: 0, y: 0 };

        const rect = ref.current?.getBoundingClientRect();

        console.log(rect, {
          // @ts-ignore
          clientX: e.clientX,
          // @ts-ignore
          offsetX: e.offsetX,
          // @ts-ignore
          pageX: e.pageX,
        });

        if (rect) {
          // // @ts-ignore
          // pos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          // // @ts-ignore
          // pos.y = 1 - ((e.clientY - rect.top) / rect.height) * 2;

          // @ts-ignore
          pos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          // @ts-ignore
          pos.y = 1 - ((e.clientY - rect.top) / rect.height) * 2;
        }

        cb(e, pos);
      };
    });

    return wrapEvents;
  }, [events]);

  useEffect(() => {
    for (let [key, cb] of Object.entries(wrapEvents)) {
      // @ts-ignore
      ref.current?.addEventListener(key, cb);
    }

    return () => {
      for (let [key, cb] of Object.entries(wrapEvents)) {
        // @ts-ignore
        ref.current?.removeEventListener(key, cb);
      }
    };
  }, [wrapEvents]);

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

export const ThreeModelCanvas = ({
  src,
  style,
  canvasStyle,
  options,
  cameraOptions,
  decoderPath,
}: {
  src: string;
  decoderPath?: string;
  style?: CSSProperties;
  canvasStyle?: CSSProperties;
  options: {
    scale: { x: number; y: number; z: number };
    position: { x: number; y: number; z: number };
  };
  cameraOptions: {
    scale: { x: number; y: number; z: number };
    position: { x: number; y: number; z: number };
  };
}) => {
  const orbitControlsRef = useRef<OrbitControls>();
  const dragControlsRef = useRef<DragControls>();

  const mixerRef = useRef<AnimationMixer>();
  const modelRef = useRef();
  const clockRef = useRef<Clock>(new THREE.Clock());

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

  const setModelGui = ({
    gui,
    model,
    camera,
  }: {
    gui: GUI;
    model: Scene;
    camera: PerspectiveCamera;
  }) => {
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
    const position = options?.position || { x: 1, y: 1, z: 0 };
    const scale = options?.scale || { x: 0.01, y: 0.01, z: 0.01 };

    model.position.set(position.x, position.y, position.z);
    model.scale.set(scale.x, scale.y, scale.z);

    modelRef.current = model;

    setModelGui({ gui, model, camera });

    // 获取 model 的动画
    const mixer = new THREE.AnimationMixer(model);
    if (gltf.animations?.length > 0) {
      mixer.clipAction(gltf.animations[0]).play();
      mixerRef.current = mixer;
    }
  }, []);

  const setupCamera = useCallback((camera: PerspectiveCamera) => {
    const position = cameraOptions?.position || { x: 2, y: 5, z: 8 };
    camera.position.set(position.x, position.y, position.z);
  }, []);

  const init = useCallback(({ scene, renderer, camera, gui }) => {
    setupCamera(camera);
    setupScene({ scene, renderer, camera });
    setupOrbitControl({ renderer, camera });

    loadGLTFModel({
      asset: src,
      scene,
      onSuccess: (gltf) => onGLTFLoad({ gltf, scene, renderer, camera, gui }),
      onError: (error) => console.dir(error),
      decoderPath,
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
    orbitControls?.update?.();
  }, []);

  const animate = useCallback(({ scene, renderer, camera }) => {
    updateControl();
    updateMixer();
  }, []);

  const onWheel = (e: WheelEvent) => {
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
        ...style,
      }}
    >
      <ThreeCanvas
        init={init}
        animate={animate}
        events={{ wheel: onWheel }}
        style={{ width: '80%', height: '80%', ...canvasStyle }}
      />
    </div>
  );
};
