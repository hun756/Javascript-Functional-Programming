import * as FP from '../index';

const ITERATIONS = 100000;
const testArray = Array.from({ length: 1000 }, (_, i) => i);
const testObjects = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Person ${i}`,
    age: 20 + (i % 50),
    active: i % 2 === 0,
}));

function benchmark(
    name: string,
    fn: () => void,
    iterations = ITERATIONS
): void {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = performance.now();
    console.log(`${name}: ${(end - start).toFixed(2)}ms`);
}

console.log('=== Performance Benchmarks ===');
console.log(`Array size: ${testArray.length}, Iterations: ${ITERATIONS}`);

console.log('\n--- Map Operations ---');
benchmark('Native map', () => {
    testArray.map(x => x * 2);
});

benchmark('FP map', () => {
    FP.map(testArray, x => x * 2);
});

console.log('\n--- Filter Operations ---');
benchmark('Native filter', () => {
    testArray.filter(x => x % 2 === 0);
});

benchmark('FP filter', () => {
    FP.filter(testArray, x => x % 2 === 0);
});

console.log('\n--- Reduce Operations ---');
benchmark('Native reduce', () => {
    testArray.reduce((acc, x) => acc + x, 0);
});

benchmark('FP reduce', () => {
    FP.reduce(testArray, (acc, x) => acc + x, 0);
});

console.log('\n--- Find Operations ---');
benchmark('Native find', () => {
    testArray.find(x => x > 500);
});

benchmark('FP find', () => {
    FP.find(testArray, x => x > 500);
});

console.log('\n--- Every Operations ---');
benchmark('Native every', () => {
    testArray.every(x => x >= 0);
});

benchmark('FP every', () => {
    FP.every(testArray, x => x >= 0);
});

console.log('\n--- Some Operations ---');
benchmark('Native some', () => {
    testArray.some(x => x > 500);
});

benchmark('FP some', () => {
    FP.some(testArray, x => x > 500);
});

console.log('\n--- Object Operations ---');
benchmark(
    'FP groupBy',
    () => {
        FP.groupBy(testObjects, obj => (obj.age < 30 ? 'young' : 'old'));
    },
    ITERATIONS / 100
);

benchmark(
    'FP pluck',
    () => {
        FP.pluck(testObjects, 'name');
    },
    ITERATIONS / 100
);

benchmark(
    'FP where',
    () => {
        FP.where(testObjects, { active: true });
    },
    ITERATIONS / 100
);

console.log('\n--- Array Utilities ---');
benchmark('FP first', () => {
    FP.first(testArray);
});

benchmark('FP last', () => {
    FP.last(testArray);
});

benchmark(
    'FP shuffle',
    () => {
        FP.shuffle(testArray);
    },
    ITERATIONS / 1000
);

benchmark(
    'FP compact',
    () => {
        FP.compact([...testArray, null, undefined, false, 0, '']);
    },
    ITERATIONS / 100
);

benchmark(
    'FP uniq',
    () => {
        FP.uniq([...testArray, ...testArray.slice(0, 100)]);
    },
    ITERATIONS / 100
);

console.log('\n=== Benchmark Complete ===');
