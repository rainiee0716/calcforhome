import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateConcrete,
  calculateConcreteBags,
  calculateFencePostConcrete,
  calculateGravel,
  calculateFootingDepth,
} from '../dist-test/calculations.js';
import { AFI_TABLE, FROST_REGIONS, designFrostDepthFromAfi } from '../dist-test/frost.js';

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

test('footing depth adds a bearing layer and picks the right tube', () => {
  // Minnesota Zone II: 42 in of frost becomes a 48 in dig, and a 4 ft tube is
  // exactly long enough — no more.
  const mn = calculateFootingDepth({
    frostDepthIn: 42,
    holeDiameterIn: 12,
    count: 4,
    postWidthIn: 3.5,
    postThicknessIn: 3.5,
    wastePercent: 10,
  });
  assert.equal(mn.digDepthIn, 48);
  assert.equal(mn.tubeLengthFt, 4);
  assert.equal(mn.concretePerFootingCubicFeet.toFixed(2), '3.08');
  assert.equal(mn.bagsPerFooting, 6);
  assert.equal(mn.totalEightyPoundBags, 21);

  // 48 in of frost digs 54, which no longer fits a 4 ft tube.
  const ma = calculateFootingDepth({ frostDepthIn: 48, holeDiameterIn: 12, count: 1 });
  assert.equal(ma.digDepthIn, 54);
  assert.equal(ma.tubeLengthFt, 6);
});

test('a solid footing fills the whole hole', () => {
  // No post to subtract: 12 in hole, 18 in deep is a plain cylinder.
  const solid = calculateFootingDepth({ frostDepthIn: 12, holeDiameterIn: 12, count: 1 });
  assert.equal(solid.digDepthIn, 18);
  assert.equal(solid.concretePerFootingCubicFeet.toFixed(2), '1.18');
  assert.equal(solid.bagsPerFooting, 2);
});

test('air freezing index maps to the published design frost depth', () => {
  assert.equal(designFrostDepthFromAfi(0), 3);
  assert.equal(designFrostDepthFromAfi(400), 16);
  assert.equal(designFrostDepthFromAfi(3500), 57);
  assert.equal(designFrostDepthFromAfi(4000), 62);
  // Above the last row the table stops at 65 rather than extrapolating.
  assert.equal(designFrostDepthFromAfi(9000), 65);
});

test('frost region table is internally consistent', () => {
  const ids = FROST_REGIONS.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length, 'region ids must be unique');
  for (const region of FROST_REGIONS) {
    assert.ok(region.depth > 0 && region.depth <= 120, `${region.state} depth out of range`);
    assert.ok(region.basis.length > 0, `${region.state} needs a code basis`);
  }
  // Every state appears once at minimum, and no state is split more than twice.
  const counts = new Map();
  for (const region of FROST_REGIONS) {
    counts.set(region.state, (counts.get(region.state) ?? 0) + 1);
  }
  assert.equal(counts.size, 51, '50 states plus DC');
  for (const [state, count] of counts) {
    assert.ok(count <= 2, `${state} has ${count} zones`);
  }
  // The AFI table must stay sorted, since the lookup walks it in order.
  for (let i = 1; i < AFI_TABLE.length; i += 1) {
    assert.ok(AFI_TABLE[i].afi > AFI_TABLE[i - 1].afi, 'AFI table must ascend');
  }
});
