# Algorithm Visualizer

**A React + Vite-based project implementing two divide-and-conquer algorithms with visualization: Closest Pair of Points and Integer Multiplication.**

This project allows you to explore two important algorithms—**Closest Pair of Points** and **Integer Multiplication**—through a step-by-step breakdown of the process. The algorithms are visualized with clear, static representations to help you understand each phase of the computation.

## Features

### 1. Closest Pair of Points Algorithm

The **Closest Pair of Points** problem is solved using the **divide-and-conquer** strategy. The algorithm finds the two closest points in a set of points on a 2D plane.

**Steps:**
- **Step 1:** **Sort and Plot the Points**  
  The points are first plotted on a 2D graph and sorted by their x-coordinates.

- **Step 2:** **Divide into Two Groups (Left and Right)**  
  The points are divided into two groups, left and right, at the midpoint of the x-coordinates.

- **Step 3:** **Find Closest Pair in the Left Group**  
  The closest pair of points in the left group is calculated recursively.

- **Step 4:** **Find Closest Pair in the Right Group**  
  Similarly, the closest pair of points in the right group is calculated recursively.

- **Step 5:** **Find Closest Pair Across the Dividing Line**  
  Points near the dividing line (within a strip defined by the smallest distance found in the left or right group) are checked to find the closest pair across the dividing line.

- **Step 6:** **Final Closest Pair**  
  The closest pair from the left group, right group, and across the dividing line are compared, and the final closest pair is selected.

Each step is clearly displayed with a visual representation of the points, showing how the groups are divided and how the closest pair is found.

### 2. Integer Multiplication Algorithm (Karatsuba)

The **Karatsuba algorithm** is a fast multiplication algorithm that divides the numbers into high and low parts and multiplies them recursively. The visualization breaks down the process into three major stages.

**Steps:**
- **Step 1:** **Split the Numbers into High and Low Parts**  
  The numbers are split into high and low parts. For example, if you’re multiplying 1234 and 5678, the numbers would be split into (12, 34) and (56, 78).

- **Step 2:** **Recursive Multiplication of High and Low Parts**  
  Three multiplications are performed:
  - High * High (mulHigh)
  - Low * Low (mulLow)
  - Mixed multiplication (mulMixed) where the sum of high and low parts of both numbers are multiplied together.

- **Step 3:** **Combine the Results**  
  The results of the three multiplications are combined using the formula:
  \[
  \text{{Result}} = mulHigh \times 10^{2m} + (mulMixed - mulHigh - mulLow) \times 10^m + mulLow
  \]
  The final result is computed and displayed.

---

## Tech Stack

- **React** for the frontend UI
- **Vite** as the build tool and development server for faster build and live reloads
- **CSS** for styling the components and layout

---

## How to Run the Project

1. **Clone the repository**  
   ```bash
   git clone https://github.com/SFizzaR/Algorithm-visualizer.git
   ```

2. **Navigate to the project directory**  
   ```bash
   cd algorithm-visualizer
   ```

3. **Install dependencies**  
   ```bash
   npm install
   ```

4. **Start the development server**  
   ```bash
   npm run dev
   ```

5. **Visit the application in your browser**  
   Open your browser and go to `http://localhost:3000`.

---

## Future Enhancements

- **Interactive Visualization:** Add more interactivity to the visualizations (e.g., the ability to adjust the number of points or the numbers for multiplication).
- **Step-by-Step Walkthrough:** Add functionality to let users go through the algorithm steps one by one with explanations.
- **Add More Algorithms:** Extend the project by adding other algorithms, such as sorting algorithms, search algorithms, or dynamic programming algorithms.
