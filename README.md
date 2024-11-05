# xxh32

Fastest 0.5kb(gzip) JavaScript implementation of [Cyan4973's XXH32](https://github.com/Cyan4973/xxHash) (xxHash32) algorithm.

## Installation

```sh
npm i xxh32
```

and import it:

```js
import { xxh32 } from "xxh32";
```

### Without installation

You can directly import URL in ES Modules. (works in Browser, Deno)

```js
import { xxh32 } from "https://unpkg.com/xxh32@2.0.0/dist/index.bundle.js";
import { xxh32r } from "https://unpkg.com/xxh32@2.0.0/dist/raw.bundle.js"; // for Uint8Array
```

or use dynamic import.

```js
const { xxh32 } = await import("https://unpkg.com/xxh32@2.0.0/dist/index.bundle.js");
```

## Usage

```js
xxh32("test") // === 1042293711
xxh32r(new TextEncoder().encode("test")) // === 1042293711

const seed = 1234;
xxh32("test", seed) // === 1983208713

xxh32r(new Uint8Array(222)) // === 2025467952
xxh32r(new Uint8Array(222), seed) // === 2335345817
```

## Streaming

```js
import { xxh32sr } from "xxh32/dist/stream.js";
```

or

```js
import { xxh32sr } from "https://unpkg.com/xxh32@2.0.0/dist/stream-raw.bundle.js";
```

### Usage (Streaming)

```js
xxh32sr().update(new Uint8Array(222)).digest() // === 2025467952

xxh32sr()
  .update(new TextEncoder().encode("te"))
  .update(new TextEncoder().encode("st"))
  .digest() // === 1042293711

const seed = 1234;
xxh32sr(seed)
  .update(new Uint8Array(111))
  .update(new Uint8Array(111))
  .digest() // === 2335345817
```
