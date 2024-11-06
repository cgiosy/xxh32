const encoder = new TextEncoder();
let bufferLength = 16384;
let buffer = new ArrayBuffer(bufferLength);
let uint8View = new Uint8Array(buffer);
let dataView = new DataView(buffer);

const rotl32 = (x: number, r: number) => (x << r) | (x >>> 32 - r);

export const xxh32 = (str: string, seed = 0) => {
	const strLen = Math.imul(str.length, 3); // maximum 3 bytes per character
	if (strLen > bufferLength) {
		bufferLength = (strLen - 1 | 4095) + 1 | 0;
		buffer = new ArrayBuffer(bufferLength);
		uint8View = new Uint8Array(buffer);
		dataView = new DataView(buffer);
	}
  
	seed |= 0;
	const len = encoder.encodeInto(str, uint8View).written | 0;
	let i = 0;
	let h = (seed + len | 0) + 0x165667B1 | 0;

	if (len < 16) {
		for (; (i + 3 | 0) < len; i = i + 4 | 0)
			h = Math.imul(rotl32(h + Math.imul(dataView.getUint32(i, true), 0xC2B2AE3D) | 0, 17), 0x27D4EB2F);
	} else {
		let v0 = seed + 0x24234428 | 0;
		let v1 = seed + 0x85EBCA77 | 0;
		let v2 = seed;
		let v3 = seed - 0x9E3779B1 | 0;

		for (; (i + 15 | 0) < len; i = i + 16 | 0) {
			v0 = Math.imul(rotl32(v0 + Math.imul(dataView.getUint32(i + 0 | 0, true), 0x85EBCA77) | 0, 13), 0x9E3779B1);
			v1 = Math.imul(rotl32(v1 + Math.imul(dataView.getUint32(i + 4 | 0, true), 0x85EBCA77) | 0, 13), 0x9E3779B1);
			v2 = Math.imul(rotl32(v2 + Math.imul(dataView.getUint32(i + 8 | 0, true), 0x85EBCA77) | 0, 13), 0x9E3779B1);
			v3 = Math.imul(rotl32(v3 + Math.imul(dataView.getUint32(i + 12 | 0, true), 0x85EBCA77) | 0, 13), 0x9E3779B1);
		}

		h = (((rotl32(v0, 1) + rotl32(v1, 7) | 0) + rotl32(v2, 12) | 0) + rotl32(v3, 18) | 0) + len | 0;
		for (; (i + 3 | 0) < len; i = i + 4 | 0)
			h = Math.imul(rotl32(h + Math.imul(dataView.getUint32(i, true), 0xC2B2AE3D) | 0, 17), 0x27D4EB2F);
	}

	for (; i < len; i = i + 1 | 0)
		h = Math.imul(rotl32(h + Math.imul(dataView.getUint8(i), 0x165667B1) | 0, 11), 0x9E3779B1);
	h = Math.imul(h ^ h >>> 15, 0x85EBCA77);
	h = Math.imul(h ^ h >>> 13, 0xC2B2AE3D);
	return (h ^ h >>> 16) >>> 0;
};
