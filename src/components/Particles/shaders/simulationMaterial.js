import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro';

const ParticlePositions = (density, modelA) => {
  var len = density * density * 4;
  var data = new Float32Array(len);

  for (let i = 0; i < data.length; i++) {
    const geometryStride = i * 3
    const stride = i * 4;

    data[stride] = modelA[geometryStride];
    data[stride + 1] = modelA[geometryStride+1];
    data[stride + 2] = modelA[geometryStride+2];
    data[stride + 3] = 1.0;
  }

  return data;
};



class SimulationMaterial extends THREE.ShaderMaterial {
  constructor(modelA, modelB, progress) {
    const positionsTextureA = new THREE.DataTexture(ParticlePositions(512, modelA), 512, 512, THREE.RGBAFormat, THREE.FloatType)
    positionsTextureA.needsUpdate = true

    const positionsTextureB = new THREE.DataTexture(ParticlePositions(512, modelB), 512, 512, THREE.RGBAFormat, THREE.FloatType)
    positionsTextureB.needsUpdate = true

    super({
      vertexShader: `varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: glsl`
      uniform sampler2D positionsA;
      uniform sampler2D positionsB;

      uniform float uProgress;
     
      uniform float uTime;
      uniform float uCurlFreq;
      varying vec2 vUv;

      #pragma glslify: curl = require(glsl-curl-noise2)
      #pragma glslify: noise = require(glsl-noise/classic/3d.glsl)  

      void main() {
        float time = sin(uTime / 200.00);

        vec3 spherePositions = texture2D(positionsA, vUv).rgb;
        vec3 boxPositions = texture2D(positionsB, vUv).rgb;
        
        vec3 pos = mix(boxPositions, spherePositions, uProgress);
        vec3 curlPos = mix(boxPositions, spherePositions, uProgress);

        curlPos += curl(curlPos * uCurlFreq) * 0.75  *  (1.0 - uProgress);;
        curlPos += curl(curlPos * uCurlFreq * 2.0) * 0.5  *  (1.0 - uProgress);;
        curlPos += curl(curlPos * uCurlFreq * 4.0) * 0.25  *  (1.0 - uProgress);;

        curlPos += curl(curlPos * uCurlFreq * 8.0) * 0.125;
        curlPos += curl(pos * uCurlFreq * 16.0) * 0.0625;
        gl_FragColor = vec4(mix(pos, curlPos, noise(pos + time)), 1.0);
      }`,
      uniforms: {
        // positions: { value: positionsTexture },
        uProgress: { value: progress.current },
        positionsA: { value: positionsTextureA },
        positionsB: { value: positionsTextureB },
        uFrequency: { value: 0.25 },
        uTime: { value: 0 },
        uCurlFreq: { value: 0.25 }
      }
    })
  }
}

extend({ SimulationMaterial })