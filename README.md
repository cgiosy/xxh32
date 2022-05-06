# xxh32

Fastest 0.5kb(gzip) JavaScript implementation of [Cyan4973's XXH32](https://github.com/Cyan4973/xxHash) (xxHash32) algorithm.

## Installation

```sh
npm install xxh32
```

and import it:

```js
import xxh32 from "xxh32";
```

### Without installation

You can directly import URL in ES Modules. (works in Browser, Deno)

```js
import xxh32 from "https://unpkg.com/xxh32@1.3.0/index.min.js";
```

or use dynamic import.

```js
const { default: xxh32 } = await import("https://unpkg.com/xxh32@1.3.0/index.min.js");
```

## Usage

```js
xxh32(new Uint8Array(222)) // === 2025467952

xxh32(new TextEncoder().encode("test")) // === 1042293711

const seed = 1234;
xxh32(new Uint8Array(222), seed) // === 2335345817
```

## Streaming

```js
import xxh32s from "xxh32/stream.min.js";
```

or

```js
import xxh32s from "https://unpkg.com/xxh32@1.3.0/stream.min.js";
```

### Usage (Streaming)

```js
xxh32s().update(new Uint8Array(222)).digest() // === 2025467952

xxh32s()
  .update(new TextEncoder().encode("te"))
  .update(new TextEncoder().encode("st"))
  .digest() // === 1042293711

const seed = 1234;
xxh32s(seed)
  .update(new Uint8Array(111))
  .update(new Uint8Array(111))
  .digest() // === 2335345817
```
