const marks = [78, 92, 85, 67, 90];
let highest = marks[0];

for(let mark of marks) {
  if(mark > highest) highest = mark;
}

console.log(`Highest mark: ${highest}`);
