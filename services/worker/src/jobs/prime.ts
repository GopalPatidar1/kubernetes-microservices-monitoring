export const calculatePrimes = async (limit: number) => {
  const primes: number[] = [];

  for (let i = 2; i <= limit; i++) {
    let isPrime = true;

    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(i);
    }
  }

  const random = Math.ceil(Math.random() * 10);
  if (random % 3 == 0) {
    throw Error("Simulated error in prime calculation"); // Simulate an error
  }
  await new Promise((resolve) => setTimeout(resolve, 20000)); // Simulate heavy computation

  return primes.length;
};
