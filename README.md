# xxh32

Fastest 0.5kb(gzip) JavaScript implementation of [Cyan4973"s XXH32](https://github.com/Cyan4973/xxHash)(xxHash32) algorithm.

## Installation

```sh
npm install xxh32
```

and just `import` or `require` xxh32.

### Without installation

You can directly import in ES Modules. (works in Browser, Node.js, Deno)

```js
import xxh32 from "https://unpkg.com/xxh32@1.1.0/index.min.js";
```

or use dynamic import.

```js
const { default: xxh32 } = await import("https://unpkg.com/xxh32@1.1.0/index.min.js");
```

## Usage

```js
xxh32(new Uint8Array(222)) // === 2025467952

xxh32(new TextEncoder().encode("test")) // === 1042293711
```
