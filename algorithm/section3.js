function section3(l, t) {
  const result = [];

  function backtrack(start, combination, sum) {
    if (combination.length === l && sum === t) {
      result.push([...combination]);
      return;
    }

    if (combination.length > l || sum > t) {
      return;
    }

    for (let i = start; i <= 9; i++) {
      combination.push(i);
      backtrack(i + 1, combination, sum + i);
      combination.pop();
    }
  }

  backtrack(1, [], 0);
  return result;
}

console.log(section3(3, 6));
