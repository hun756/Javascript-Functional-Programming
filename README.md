# TypeScript Functional Programming Library - V2 (In Development)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

🚧 **This project is currently being rewritten from scratch for better performance and maintainability.**

The previous implementation has been moved to the `deprecated/` folder.

## Current Status

Currently implementing core functions one by one with:
- Modern TypeScript practices
- Optimized performance
- Comprehensive testing
- Clean, maintainable code

### Currently Available Functions

#### Array Functions

##### `compact<T>(array: (T | null | undefined | false | 0 | "")[]): T[]`
Creates an array with all falsy values removed.

```typescript
import { compact } from 'typescript-functional-programming';

compact([0, 1, false, 2, '', 3, null, undefined, NaN, 4])
// => [1, 2, 3, 4]
```

## Development Status

- ✅ Project structure setup
- ✅ TypeScript configuration
- ✅ Jest testing setup
- ✅ `compact` function implemented
- 🚧 More functions coming soon...

## Installation

```bash
npm install typescript-functional-programming
```
## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
src/
├── arrays/           # Array-specific functions
│   └── index.ts      # Array functions (compact, etc.)
├── __tests__/        # Test suites
│   └── arrays.test.ts
└── index.ts          # Main entry point

deprecated/           # Previous implementation (archived)
├── src/              # Old source code
├── jest.config*.js   # Old configs
└── tsconfig*.json    # Old configs
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement new functions with tests
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.