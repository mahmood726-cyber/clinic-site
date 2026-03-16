/* London Cardiology Clinic — Three.js Heart-Shaped Spider Diagram */

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

(function () {
  var container = document.getElementById('spider-container');
  if (!container) return;

  /* Respect reduced motion */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Conditions data ── */
  var conditions = [
    { label: 'Palpitations', sub: 'Assessment & ECG', angle: Math.PI / 2, anchor: '#conditions' },
    { label: 'ECG Review', sub: 'Interpretation', angle: Math.PI / 2 + Math.PI * 2 / 5, anchor: '#conditions' },
    { label: 'Blood Pressure', sub: 'Hypertension', angle: Math.PI / 2 + 2 * Math.PI * 2 / 5, anchor: '#conditions' },
    { label: 'Breathlessness', sub: 'Cardiac assessment', angle: Math.PI / 2 + 3 * Math.PI * 2 / 5, anchor: '#conditions' },
    { label: 'Heart Murmurs', sub: 'Auscultation', angle: Math.PI / 2 + 4 * Math.PI * 2 / 5, anchor: '#conditions' }
  ];

  /* ── Heart shape function ── */
  function heartPoint(angle, scale) {
    /* Parametric heart: x = 16sin^3(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t) */
    var t = angle;
    var x = 16 * Math.pow(Math.sin(t), 3);
    var y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return new THREE.Vector2(x * scale, y * scale);
  }

  /* ── Create heart curve ── */
  function heartCurve(scale, segments) {
    var points = [];
    for (var i = 0; i <= segments; i++) {
      var t = (i / segments) * Math.PI * 2;
      var p = heartPoint(t, scale);
      points.push(new THREE.Vector3(p.x, p.y, 0));
    }
    return points;
  }

  /* ── Scene setup ── */
  var width = container.clientWidth;
  var height = container.clientHeight || 400;
  var aspect = width / height;
  var viewSize = 50;

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(
    -viewSize * aspect / 2, viewSize * aspect / 2,
    viewSize / 2, -viewSize / 2, 0.1, 100
  );
  camera.position.z = 10;

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  /* ── Heart outlines (3 concentric) ── */
  var scales = [1.2, 0.9, 0.6];
  var opacities = [0.12, 0.08, 0.05];
  scales.forEach(function (s, i) {
    var pts = heartCurve(s, 100);
    var geo = new THREE.BufferGeometry().setFromPoints(pts);
    var mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: opacities[i] });
    scene.add(new THREE.Line(geo, mat));
  });

  /* ── Filled heart area ── */
  var heartShape = new THREE.Shape();
  var fillPts = heartCurve(1.15, 100);
  heartShape.moveTo(fillPts[0].x, fillPts[0].y);
  fillPts.forEach(function (p) { heartShape.lineTo(p.x, p.y); });
  var fillGeo = new THREE.ShapeGeometry(heartShape);
  var fillMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 });
  scene.add(new THREE.Mesh(fillGeo, fillMat));

  /* ── Axis lines from center to condition points ── */
  var conditionPositions = [];
  conditions.forEach(function (c) {
    var p = heartPoint(c.angle, 1.2);
    var pos = new THREE.Vector3(p.x, p.y, 0);
    conditionPositions.push(pos);

    var lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0), pos
    ]);
    var lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
    scene.add(new THREE.Line(lineGeo, lineMat));
  });

  /* ── Condition dots ── */
  var dotMeshes = [];
  var dotGeo = new THREE.CircleGeometry(0.8, 16);
  conditionPositions.forEach(function (pos) {
    var mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
    var dot = new THREE.Mesh(dotGeo, mat);
    dot.position.copy(pos);
    dot.position.z = 0.1;
    scene.add(dot);
    dotMeshes.push(dot);
  });

  /* ── CSS overlay labels ── */
  var labelContainer = document.createElement('div');
  labelContainer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;';
  container.style.position = 'relative';
  container.appendChild(labelContainer);

  var labels = [];
  conditions.forEach(function (c, i) {
    var el = document.createElement('div');
    el.style.cssText = 'position:absolute;font-family:Inter,sans-serif;font-size:12px;font-weight:600;color:#fff;white-space:nowrap;transform:translate(-50%,-50%);pointer-events:auto;cursor:pointer;transition:opacity 0.3s;';
    el.textContent = c.label;
    el.addEventListener('click', function () {
      var target = document.querySelector(c.anchor);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    labelContainer.appendChild(el);
    labels.push(el);
  });

  /* Centre label */
  var centreLabel = document.createElement('div');
  centreLabel.style.cssText = 'position:absolute;font-family:Libre Baskerville,serif;font-size:12px;font-style:italic;color:rgba(255,255,255,0.45);white-space:nowrap;transform:translate(-50%,-50%);';
  centreLabel.textContent = 'What we assess';
  labelContainer.appendChild(centreLabel);

  /* ── Tooltip ── */
  var tooltip = document.createElement('div');
  tooltip.style.cssText = 'position:absolute;background:rgba(255,255,255,0.95);color:#2c2c2c;padding:8px 14px;border-radius:8px;font-family:Inter,sans-serif;font-size:12px;font-weight:500;box-shadow:0 4px 16px rgba(0,0,0,0.1);pointer-events:none;opacity:0;transition:opacity 0.2s;z-index:10;transform:translate(-50%,-100%);margin-top:-12px;';
  labelContainer.appendChild(tooltip);

  /* ── Project 3D to 2D ── */
  function project(pos3d) {
    var v = pos3d.clone().project(camera);
    return {
      x: (v.x * 0.5 + 0.5) * width,
      y: (-v.y * 0.5 + 0.5) * height
    };
  }

  /* ── Raycaster for hover ── */
  var raycaster = new THREE.Raycaster();
  raycaster.params.Points = { threshold: 2 };
  var mouse = new THREE.Vector2();
  var hoveredIndex = -1;

  container.addEventListener('mousemove', function (e) {
    var rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;
  });

  container.addEventListener('click', function () {
    if (hoveredIndex >= 0) {
      var target = document.querySelector(conditions[hoveredIndex].anchor);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* ── Animation loop ── */
  var pulseTime = 0;
  function animate() {
    requestAnimationFrame(animate);
    pulseTime += 0.02;

    /* Subtle pulse on dots */
    if (!prefersReduced) {
      dotMeshes.forEach(function (dot, i) {
        var s = 1 + 0.15 * Math.sin(pulseTime + i * 1.2);
        dot.scale.set(s, s, 1);
      });
    }

    /* Raycaster hover check */
    raycaster.setFromCamera(mouse, camera);
    var newHovered = -1;
    for (var i = 0; i < dotMeshes.length; i++) {
      var d = raycaster.ray.distanceToPoint(dotMeshes[i].position);
      if (d < 2) { newHovered = i; break; }
    }

    if (newHovered !== hoveredIndex) {
      hoveredIndex = newHovered;
      if (hoveredIndex >= 0) {
        var c = conditions[hoveredIndex];
        tooltip.textContent = c.label + ' — ' + c.sub;
        var p2d = project(conditionPositions[hoveredIndex]);
        tooltip.style.left = p2d.x + 'px';
        tooltip.style.top = p2d.y + 'px';
        tooltip.style.opacity = '1';
        container.style.cursor = 'pointer';
      } else {
        tooltip.style.opacity = '0';
        container.style.cursor = 'default';
      }
    }

    /* Update label positions */
    conditionPositions.forEach(function (pos, i) {
      var p2d = project(pos);
      var offsetY = pos.y > 0 ? -18 : 18;
      labels[i].style.left = p2d.x + 'px';
      labels[i].style.top = (p2d.y + offsetY) + 'px';
    });

    /* Centre label */
    var c2d = project(new THREE.Vector3(0, 0, 0));
    centreLabel.style.left = c2d.x + 'px';
    centreLabel.style.top = c2d.y + 'px';

    renderer.render(scene, camera);
  }

  animate();

  /* ── Resize handling ── */
  window.addEventListener('resize', function () {
    width = container.clientWidth;
    height = container.clientHeight || 400;
    var newAspect = width / height;
    camera.left = -viewSize * newAspect / 2;
    camera.right = viewSize * newAspect / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
})();
