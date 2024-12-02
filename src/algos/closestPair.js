export const parsePointsFile = async (file) => {
    const text = await file.text();
    const points = text
      .split('\n')
      .map(line => {
        const [x, y] = line.split(',');
        // Only include points where both x and y are defined and valid numbers
        if (!x || !y || isNaN(Number(x)) || isNaN(Number(y))) {
          return null;
        }
        return { x: Number(x), y: Number(y) };
      })
      .filter(point => point !== null); // Filter out invalid points
  
    // Sort points before dividing
    return sortPoints(points);
  };
  
  // Divide points into two equal groups
  export const dividePointsIntoGroups = (points) => {
    const midIndex = Math.floor(points.length / 2);
    const group1 = points.slice(0, midIndex); // Corrected slice
    const group2 = points.slice(midIndex);
    return [group1, group2];
  };
  
  // Sort points by x (and y if x's are the same)
  export const sortPoints = (points) => {
    return points.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
  };
  // Main function to find the closest pair of points in the entire dataset
  export const findClosestPair = (points) => {
    // Sort points by x-coordinate before starting the recursion
    const sortedPoints = sortPoints(points);
    return findClosestPairRecursive(sortedPoints);
  };
  
  //Recursive function to find the closest pair of points
const findClosestPairRecursive = (points) => {
  // Base case: use brute force for small datasets
  if (points.length <= 3) {
    return bruteForceClosestPair(points);
  }

  // Divide the points into left and right halves
  const midIndex = Math.floor(points.length / 2);
  const leftPoints = points.slice(0, midIndex);
  const rightPoints = points.slice(midIndex);

  // Step 3 & 4: Find the closest pairs in each half
  const leftClosest = findClosestPairRecursive(leftPoints);
  const rightClosest = findClosestPairRecursive(rightPoints);

  // Determine the minimum distance (delta) from the closest pairs in both halves
  const delta = Math.min(leftClosest.distance, rightClosest.distance);

  // Step 5: Check cross-pairs near the dividing line
  const crossClosest = findCrossClosestPair(points, delta);

  // Select the closest pair among left, right, and cross pairs
  let closestPair = leftClosest.distance < rightClosest.distance ? leftClosest : rightClosest;
  closestPair = crossClosest.distance < closestPair.distance ? crossClosest : closestPair;

  return closestPair;
};

  
  // Brute force method to find the closest pair of points in small datasets
  const bruteForceClosestPair = (points) => {
    let minDist = Infinity;
    let closestPair = null;
  
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = calculateDistance(points[i], points[j]);
        if (dist < minDist) {
          minDist = dist;
          closestPair = { point1: points[i], point2: points[j], distance: dist };
        }
      }
    }
  
    return closestPair;
  };
  
  // Cross pair check method to find the closest pair across the dividing line
  const findCrossClosestPair = (points, delta) => {
    const midX = points[Math.floor(points.length / 2)].x;
    const strip = points.filter(point => Math.abs(point.x - midX) < delta);
  
    let minDist = delta;
    let closestPair = null;
  
    // Sort the strip points by y-coordinate
    strip.sort((a, b) => a.y - b.y);
  
    for (let i = 0; i < strip.length; i++) {
      for (let j = i + 1; j < strip.length && (strip[j].y - strip[i].y) < minDist; j++) {
        const dist = calculateDistance(strip[i], strip[j]);
        if (dist < minDist) {
          minDist = dist;
          closestPair = { point1: strip[i], point2: strip[j], distance: dist };
        }
      }
    }
  
    return closestPair || { distance: delta };
  };
  
  
  const calculateDistance = (point1, point2) => {
    if (point1.x == null || point1.y == null || point2.x == null || point2.y == null) {
      return Infinity;
    }
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };