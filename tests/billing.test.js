const calculateCost = require('../libs/billing-lib');

test("Lowest tier", () => {
    const storage = 10;
    const expectedCost = 4000;

    const actualCost = calculateCost(storage);

    expect(actualCost).toEqual(expectedCost);
});

test("Middle tier", () => {
    const storage = 100;
    const expectedCost = 20000;

    const actualCost = calculateCost(storage);

    expect(actualCost).toEqual(expectedCost);
});

test("High tier", () => {
    const storage = 101;
    const expectedCost = 10100;

    const actualCost = calculateCost(storage);

    expect(actualCost).toEqual(expectedCost);
});