# Sorting Algo for Teliko

- `git clone https://github.com/Froskk/nebula-template.git sort-test`
- `cd sort-test`
- `pnpm i`
- `pnpm t`
- `pnpm run log` for detailed logging os sort.ts input/results

# Try to break it

| Method 1                                   | Method 2                                               |
| ------------------------------------------ | ------------------------------------------------------ |
| Add a mock dataset to `mocks/scenarios`    | Add a mock dataset to `mocks/scenario`                 |
| Add its expected order to `mocks/expected` | `pnpm t`                                               |
| `pnpm t`                                   | Double-check the output and add it to `mocks/expected` |

# Extra tests

Check unit tests for individual functions by moving files from `__skipped__` to `__tests__`
