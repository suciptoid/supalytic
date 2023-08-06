<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  onMount(() => {
    const width = 320;
    const height = 320;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    const renderContainer = document.getElementById('renderContainer');
    renderContainer?.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0x0f0f0f);

    const geometry = new THREE.SphereGeometry(5, 16, 10);
    // const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.HemisphereLight(0x1ca5f5, 0x22C55E, 1);
    scene.add(light);

    const frontLight = new THREE.DirectionalLight(0x22C55E, 1);
    frontLight.position.set(3000, 300, 3000).normalize(); // just a direction. you can normalize
    scene.add(frontLight);

    camera.position.z = 9;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.002;
      cube.rotation.y += 0.003;

      renderer.render(scene, camera);
    }

    animate();
  });
</script>

<div id="renderContainer" class="flex justify-center" />
