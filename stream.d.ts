type XXH32Stream = {
    update: (buf: Uint8Array) => XXH32Stream;
    digest: () => number;
};

export default function xxh32s(seed?: number): XXH32Stream;
