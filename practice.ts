type HasName<T> = T extends { name: string } ? T : never;

function greet<T>(obj: T): void {
  // greet if it has only name
  // console.log(`Hello ${obj.name}`);
}

greet({ name: "salah" });

// is?
// const ROLES = ['admin', 'user', 'operator'] as const
// type Role = (typeof ROLES)[number]

// union vs array of unions
const arrayOfUnions: (string | number)[] = [1, "salah", 2, "ahmed"];
const unionOfArrays: string[] | number[] = Math.random() > 0.5 ? [1, 2, 3] : ["salah", "ahmed"];

// intersection = & - combine types
type A = { name: string };
type B = { age: number };
type C = A & B; // { name: string, age: number }
   // note: if there are same keys, we can't combine them even if they have different types

// readonly arrays = arrays that can't be modified
const names: readonly string[] = ["salah", "ahmed"];
// names.push("mohamed") // error
// passing mutable array to readonly array is allowed
function printNames(arr: readonly number[]): number {
  let sum = 0;
  for (const n of arr) {
    sum += n;
  }
  return sum;
}  
printNames([1, 2, 3]);


// tuple = fixed length array with specific types
let tuple: [string, number, boolean] = ["salah", 30, true]; 
// tuple = [30, "salah", true] // error
// tuple.push(100) // allowed but not recommended
console.log(tuple[0]); // "salah"
// other methods
type Tuple = [status: number, message?: string];
const response1: Tuple = [200, "OK"];
const response2: Tuple = [404];
// we can also use tuple with readoly
const readonlyTuple: readonly [string, number] = ["salah", 30];
// readonlyTuple[0] = "ahmed" // error






// vitest snippet
// we don't test logic, we test behavior: rendering and user interaction
// tests folder
// ByRole preferred