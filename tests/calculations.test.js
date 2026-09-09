import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateConcrete,
  calculateConcreteBags,
  calculateFencePostConcrete,
  calculateGravel,
} from '../dist-test/calculations.js';

test('concrete calculator applies waste and rounds bags up', () => {
  const result = calculateConcrete({
    lengthFt: 10,
    widthFt: 10,
    thicknessIn: 4,
    wastePercent: 10,
  });

  assert.equal(result.cubicFeet.toFixed(2), '33.33');
  assert.equal(result.volumeWithWaste.toFixed(2), '36.67');
  assert.equal(result.cubicYards.toFixed(2), '1.36');
  assert.equal(result.eightyPoundBags, 62);
});

test('concrete bags calculator supports alternate bag sizes', () => {
  const result = calculateConcreteBags({
    lengthFt: 4,
    widthFt: 4,
    thicknessIn: 4,
    wastePercent: 0,
    bagYieldCubicFeet: 0.45,
  });

  assert.equal(result.selectedBagCount, 12);
  assert.equal(result.eightyPoundBags, 9);
});

test('gravel calculator converts volume to tons', () => {
  const result = calculateGravel({
    lengthFt: 10,
    widthFt: 10,
    depthIn: 4,
    thicknessIn: 4,
    wastePercent: 0,
    densityTonsPerCubicYard: 1.4,
  });

  assert.equal(result.cubicYards.toFixed(3), '1.235');
  assert.equal(result.tons.toFixed(3), '1.728');
});

test('fence post calculator subtracts the buried post volume', () => {
  const result = calculateFencePostConcrete({
    postCount: 10,
    holeDiameterIn: 12,
    holeDepthIn: 30,
    postShape: 'square',
    postWidthIn: 3.5,
    postThicknessIn: 3.5,
    postBuriedDepthIn: 30,
    wastePercent: 0,
  });

  assert.ok(result.concretePerPostCubicFeet > 0);
  assert.equal(result.concretePerPostCubicFeet.toFixed(3), '1.751');
  assert.equal(result.totalConcreteCubicFeet.toFixed(2), '17.51');
  assert.equal(result.bagsPerPost, 3);
  assert.equal(result.totalEightyPoundBags, 30);
});

test('calculators reject invalid dimensions', () => {
  assert.throws(() => calculateConcrete({ lengthFt: 0, widthFt: 10, thicknessIn: 4 }), RangeError);
  assert.throws(
    () =>
      calculateFencePostConcrete({
        postCount: 1,
        holeDiameterIn: 6,
        holeDepthIn: 24,
        postWidthIn: 5.5,
        postThicknessIn: 5.5,
        postBuriedDepthIn: 24,
      }),
    RangeError,
  );
});
