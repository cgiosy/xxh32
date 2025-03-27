# xxh32

xxh32 provides the fastest JavaScript implementation of the XXH32 hash algorithm by Cyan4973. It is highly optimized and compact (approximately 0.5kb when gzipped).

## Installation

Install the package using npm (or your preferred package manager):

```sh
npm install xxh32
```

Then, import it into your JavaScript or TypeScript file:

```js
// Import the primary function (handles strings, uses TextEncoder internally)
import { xxh32 } from "xxh32";

// You might also need the raw version for direct Uint8Array hashing
import { xxh32r } from "xxh32/dist/raw.js"; // Adjust path if needed depending on bundler/setup
```

### Direct Usage / CDN

Alternatively, you can use the module directly in environments supporting ES Modules (like modern browsers or Deno) without an installation step, by importing it from a CDN like unpkg:

```js
// For string hashing (uses TextEncoder)
import { xxh32 } from "https://unpkg.com/xxh32@2.0.4/dist/index.bundle.js";

// For direct Uint8Array hashing
import { xxh32r } from "https://unpkg.com/xxh32@2.0.4/dist/raw.bundle.js";
```

Dynamic import is also supported:

```js
// Example using dynamic import for the string hashing function
const { xxh32 } = await import("https://unpkg.com/xxh32@2.0.4/dist/index.bundle.js");
```

## Usage

The library provides functions for hashing strings and raw byte arrays (`Uint8Array`).

*   `xxh32(input: string, seed?: number): number`: Hashes a string (implicitly converts to UTF-8 bytes). Accepts an optional numeric seed.
*   `xxh32r(input: Uint8Array, seed?: number): number`: Hashes a `Uint8Array` directly. Accepts an optional numeric seed.

```javascript
// Hash a string
const hash1 = xxh32("test");
console.log(hash1); // Output: 1042293711

// Provide an optional seed value
const seed = 1234;
const hash2 = xxh32("test", seed);
console.log(hash2); // Output: 1983208713

// Hash a Uint8Array directly
const textBytes = new TextEncoder().encode("test");
const hash3 = xxh32r(textBytes);
console.log(hash3); // Output: 1042293711 (same as string hash)

// Hash arbitrary byte data
const data = new Uint8Array(222);
const hash4 = xxh32r(data);
console.log(hash4); // Output: 2025467952

// Hash arbitrary byte data with a seed
const hash5 = xxh32r(data, seed);
console.log(hash5); // Output: 2335345817
```

## Streaming API

For large inputs or data streams, a streaming API is available. This allows you to process data in chunks without loading everything into memory at once.

Import the streaming function (`xxh32sr` for raw `Uint8Array` streaming):

```js
import { xxh32sr } from "xxh32/dist/stream-raw.js";
```

or from a CDN:

```js
import { xxh32sr } from "https://unpkg.com/xxh32@2.0.4/dist/stream-raw.bundle.js";
```

### Streaming Usage

Create a streamer instance (optionally with a seed), update it with `Uint8Array` chunks using the `.update()` method, and finally call `.digest()` to get the resulting hash number.

```javascript
// Simple streaming example
const streamer1 = xxh32sr(); // Create streamer (no seed)
streamer1.update(new Uint8Array(222)); // Process data chunk
const streamHash1 = streamer1.digest(); // Finalize and get hash
console.log(streamHash1); // Output: 2025467952

// Streaming multiple chunks
const streamer2 = xxh32sr();
streamer2.update(new TextEncoder().encode("te"));
streamer2.update(new TextEncoder().encode("st"));
const streamHash2 = streamer2.digest();
console.log(streamHash2); // Output: 1042293711

// Streaming with a seed
const seed = 1234;
const streamer3 = xxh32sr(seed);
streamer3.update(new Uint8Array(111));
streamer3.update(new Uint8Array(111));
const streamHash3 = streamer3.digest();
console.log(streamHash3); // Output: 2335345817
```
