const getUint32 = (arr: Uint8Array, i: number) => arr[i] | arr[i + 1 | 0] << 8 | arr[i + 2 | 0] << 16 | arr[i + 3 | 0] << 24;

const rotl32 = (x: number, r: number) => (x << r) | (x >>> 32 - r);

const xxh32s = (seed = 0) => {
	seed |= 0;
	let k = 0;
	let u0 = seed + 0x24234428 | 0;
	let u1 = seed + 0x85EBCA77 | 0;
	let u2 = seed;
	let u3 = seed - 0x9E3779B1 | 0;
	let total = 0;
	let small = true;

	const tmp = new Uint8Array(16);
	const self = {
		update: (buf: Uint8Array) => {
			const len = buf.length | 0;
			let v0 = u0;
			let v1 = u1;
			let v2 = u2;
			let v3 = u3;
			let i = 0;

			total = total + len >>> 0;
			small = small && (total < 16) && (len < 16);

			if (k !== 0) {
				while (i < len) {
					tmp[k] = buf[i];
					k = k + 1 | 0;
					i = i + 1 | 0;
					if (k === 16) {
						v0 = Math.imul(rotl32(v0 + Math.imul(getUint32(tmp, 0), 0x85EBCA77) | 0, 13), 0x9E3779B1);
						v1 = Math.imul(rotl32(v1 + Math.imul(getUint32(tmp, 4), 0x85EBCA77) | 0, 13), 0x9E3779B1);
						v2 = Math.imul(rotl32(v2 + Math.imul(getUint32(tmp, 8), 0x85EBCA77) | 0, 13), 0x9E3779B1);
						v3 = Math.imul(rotl32(v3 + Math.imul(getUint32(tmp, 12), 0x85EBCA77) | 0, 13), 0x9E3779B1);
						k = 0;
						break;
					}
				}
			}

			if (len < 256) {
				for (; (i + 15 | 0) < len; i = i + 16 | 0) {
					v0 = Math.imul(rotl32(v0 + Math.imul(getUint32(buf, i + 0 | 0), 0x85EBCA77) | 0, 13), 0x9E3779B1);
					v1 = Math.imul(rotl32(v1 + Math.imul(getUint32(buf, i + 4 | 0), 0x85EBCA77) | 0, 13), 0x9E3779B1);
					v2 = Math.imul(rotl32(v2 + Math.imul(getUint32(buf, i + 8 | 0), 0x85EBCA77) | 0, 13), 0x9E3779B1);
					v3 = Math.imul(rotl32(v3 + Math.imul(getUint32(buf, i + 12 | 0), 0x85EBCA77) | 0, 13), 0x9E3779B1);
				}
			} else {
				const view = new DataView(buf.buffer);
				for (; (i + 15 | 0) < len; i = i + 16 | 0) {
					v0 = Math.imul(rotl32(v0 + Math.imul(view.getUint32(i + 0 | 0, true), 0x85EBCA77) | 0, 13), 0x9E3779B1);
					v1 = Math.imul(rotl32(v1 + Math.imul(view.getUint32(i + 4 | 0, true), 0x85EBCA77) | 0, 13), 0x9E3779B1);
					v2 = Math.imul(rotl32(v2 + Math.imul(view.getUint32(i + 8 | 0, true), 0x85EBCA77) | 0, 13), 0x9E3779B1);
					v3 = Math.imul(rotl32(v3 + Math.imul(view.getUint32(i + 12 | 0, true), 0x85EBCA77) | 0, 13), 0x9E3779B1);
				}
			}

			if (i < len) {
				do {
					tmp[k] = buf[i];
					k = k + 1 | 0;
					if (k === 16) {
						v0 = Math.imul(rotl32(v0 + Math.imul(getUint32(tmp, 0), 0x85EBCA77) | 0, 13), 0x9E3779B1);
						v1 = Math.imul(rotl32(v1 + Math.imul(getUint32(tmp, 4), 0x85EBCA77) | 0, 13), 0x9E3779B1);
						v2 = Math.imul(rotl32(v2 + Math.imul(getUint32(tmp, 8), 0x85EBCA77) | 0, 13), 0x9E3779B1);
						v3 = Math.imul(rotl32(v3 + Math.imul(getUint32(tmp, 12), 0x85EBCA77) | 0, 13), 0x9E3779B1);
						k = 0;
					}
					i = i + 1 | 0;
				} while (i < len);
			}

			u0 = v0;
			u1 = v1;
			u2 = v2;
			u3 = v3;
			return self;
		},
		digest: () => {
			let h = seed + 0x165667B1 | 0;
			if (small === false)
				h = ((rotl32(u0, 1) + rotl32(u1, 7) | 0) + rotl32(u2, 12) | 0) + rotl32(u3, 18) | 0;
			h = h + total | 0;

			let i = 0;
			for (; (i + 3 | 0) < k; i = i + 4 | 0)
				h = Math.imul(rotl32(h + Math.imul(getUint32(tmp, i), 0xC2B2AE3D) | 0, 17), 0x27D4EB2F);

			for (; i < k; i = i + 1 | 0)
				h = Math.imul(rotl32(h + Math.imul(tmp[i], 0x165667B1) | 0, 11), 0x9E3779B1);
			h = Math.imul(h ^ h >>> 15, 0x85EBCA77);
			h = Math.imul(h ^ h >>> 13, 0xC2B2AE3D);
			return (h ^ h >>> 16) >>> 0;
		},
	};

	return self;
};

export default xxh32s;
