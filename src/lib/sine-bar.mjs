// All lengths passed to calculation functions use the same unit.
// Metric presets convert with the exact international inch: 25.4 mm.
export const PRESETS = Object.freeze([
  { id: '5', label: '5 in', inches: 5 },
  { id: '10', label: '10 in', inches: 10 },
  { id: '100mm', label: '100 mm', inches: 100 / 25.4 },
  { id: '200mm', label: '200 mm', inches: 200 / 25.4 },
]);
export function positive(value, label = 'Value') {
  if (typeof value !== 'number' && typeof value !== 'string') throw new RangeError(`${label}: enter a positive decimal number.`);
  if (typeof value === 'string' && !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.trim())) throw new RangeError(`${label}: enter a positive decimal number.`);
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) throw new RangeError(`${label}: enter a number greater than zero.`);
  return n;
}
export function stackHeight(length, degrees) {
  const l = positive(length, 'Bar size');
  const a = positive(degrees, 'Angle');
  if (a >= 90) throw new RangeError('Angle must be greater than 0° and less than 90°.');
  const h = l * Math.sin(a * Math.PI / 180);
  if (!Number.isFinite(h) || h <= 0) throw new RangeError('These values cannot produce a finite stack height.');
  return h;
}
export function angleDegrees(length, height) {
  const l = positive(length, 'Bar size');
  const h = positive(height, 'Stack height');
  if (h >= l) throw new RangeError('Stack height must be less than the roll-center distance.');
  return Math.asin(h / l) * 180 / Math.PI;
}
export function gradeAnswer(input, expected, places) {
  const n = positive(input, 'Answer');
  // Grade the requested rounded value, not an arbitrary machining tolerance.
  return n.toFixed(places) === expected.toFixed(places);
}
export function makeProblem(direction = 'height', previous = null, explore = null, random = Math.random) {
  let p;
  for (let i = 0; i < 100; i++) {
    const bar = PRESETS[Math.floor(random() * PRESETS.length) % PRESETS.length];
    const angle = 5 + Math.floor(random() * 101) / 2;
    const height = Number(stackHeight(bar.inches, angle).toFixed(4));
    p = { direction, bar: { ...bar }, angle, height };
    // Reverse questions are calculated from the rounded height actually shown.
    p.expected = direction === 'height' ? stackHeight(bar.inches, angle) : angleDegrees(bar.inches, height);
    p.places = direction === 'height' ? 4 : 2;
    const same = previous && p.bar.id === previous.bar.id && p.angle === previous.angle;
    const leaked = explore && Math.abs(p.bar.inches - explore.length) < 1e-10 && Math.abs(p.angle - explore.angle) < 1e-10;
    if (!same && !leaked) return p;
  }
  // Deterministic fallback also avoids Explore and previous problem values.
  for (const bar of PRESETS) for (const angle of [17.5, 32.5, 47.5]) {
    if (previous?.bar.id === bar.id && previous?.angle === angle) continue;
    if (explore && Math.abs(bar.inches - explore.length) < 1e-10 && angle === explore.angle) continue;
    const height = Number(stackHeight(bar.inches, angle).toFixed(4));
    return { direction, bar: { ...bar }, angle, height, expected: direction === 'height' ? stackHeight(bar.inches, angle) : angleDegrees(bar.inches, height), places: direction === 'height' ? 4 : 2 };
  }
}
export function possibleMistake(input, problem) {
  const n = positive(input, 'Answer');
  if (problem.direction !== 'height') return 'Check that you used inverse sine and that the answer is in degrees.';
  const radiansMistake = problem.bar.inches * Math.sin(problem.angle);
  if (radiansMistake > 0 && Math.abs(n - radiansMistake) < .002) return 'This looks like a degree/radian mix-up. Check your calculator mode.';
  const sixInchMistake = 6 * Math.sin(problem.angle * Math.PI / 180);
  if (problem.bar.inches !== 6 && Math.abs(n - sixInchMistake) < .002) return 'This looks like a different bar size may have been used. Check the roll-center distance.';
  return 'Check the bar size, degree mode, and rounding. Keep extra digits until the last step.';
}
