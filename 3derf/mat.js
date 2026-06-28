//todo use this instead of conveient mere cam rots
function crm(axis, angle) {
  let c = cos(angle);
  let s = sin(angle);
  let t = 1 - c;

  let x = axis.x;
  let y = axis.y;
  let z = axis.z;

  return [
    [t * x * x + c, t * x * y - s * z, t * x * z + s * y],
    [t * x * y + s * z, t * y * y + c, t * y * z - s * x],
    [t * x * z - s * y, t * y * z + s * x, t * z * z + c]
  ];
}//crm()
 
function multiplyMatrix(matrix, vector) {
  let result = [];
  for (let i = 0; i < matrix.length; i++) {
    let sum = 0;
    for (let j = 0; j < vector.length; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result.push(sum);
  }
  return createVector(result[0], result[1], result[2]);
}//mm()

function invertMatrix(matrix) {
  // Check if the matrix is square
  // if (matrix.length !== matrix[0].length) {
  //   throw new Error("Matrix must be square");
  // }

  // Create a new matrix to store the inverse
  const inverse = new Array(matrix.length);
  for (let i = 0; i < matrix.length; i++) {
    inverse[i] = new Array(matrix[0].length);
  }

  // Calculate the determinant of the matrix
  const determinant = matrixDeterminant(matrix);
  if (determinant === 0) {
    throw new Error("Matrix is not invertible");
  }

  // Calculate the adjoint of the matrix
  const adjoint = matrixAdjoint(matrix);

  // Scale the adjoint by the determinant
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      inverse[i][j] = adjoint[i][j] / determinant;
    }
  }

  // Return the inverse matrix
  return inverse;
}