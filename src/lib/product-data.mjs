export const allocation = {
  free: [
    'REF reference tabs',
    'Mill and lathe calculators',
    'Tool library',
    '5 triangle calculations',
    '5 saved job slots',
  ],
  kit: [
    'Unlimited live triangle calculations',
    'Unlimited saved jobs',
    'Sine bar',
    'Bolt circles',
    'Threads and measurement over wires',
    'Pins',
    'Live geometry',
  ],
};
export const kitPrice = '$17.99';
export const tasks = [
  ['01', 'See the triangle.', 'Enter two known values, including at least one side, and see the solved triangle. The Toolmaker Kit updates it as you type.'],
  ['02', 'Find your sine bar stack.', 'Use the bar size and angle to calculate the required stack height.'],
  ['03', 'Lay out a bolt circle.', 'Find the hole locations around a bolt circle.'],
  ['04', 'Keep tools and jobs together.', 'Use a tool library and saved jobs to keep the work close at hand.'],
  ['05', 'Check a thread measurement.', 'Work with threads and measurement over wires.'],
  ['06', 'Check a layout.', 'Use live geometry to lay out lines and check included angles.'],
];

export const screenshots = [
  {
    file: 'triangle.jpg',
    title: 'Right triangle',
    alt: 'CADVANTAGE TRIG screen with a 25° angle and a 7.0000 in hypotenuse. The solved sides are shown on a labeled triangle.',
    caption: 'Two known values and the solved geometry in the same view.',
  },
  {
    file: 'sine-bar.jpg',
    title: 'Sine bar',
    alt: 'CADVANTAGE sine bar screen showing a 0.8682 in gage block stack for a 5.0000 in bar at 10°.',
    caption: 'Bar size, angle, and required stack height together.',
  },
  {
    file: 'tool-roster.jpg',
    title: 'Tool roster',
    alt: 'CADVANTAGE JOB screen showing a T1 face mill, its Z offset and operation, and the crib and touch controls.',
    caption: 'A face mill on the roster with its Z offset and operation.',
  },
];
