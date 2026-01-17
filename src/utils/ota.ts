import { OTA_SELECT_ENTRY_SIZE, OTA_SELECT_SECTOR_SIZE } from '../constants/app';

type MinimalOtaEntry = {
  subtype?: number;
};

type OtaDetectionResult = {
  slotId: string | null;
  summary: string;
};

function readUint32LE(buffer: Uint8Array, offset: number): number | null {
  if (!buffer || offset == null || offset < 0 || offset + 4 > buffer.length) return null;
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  return view.getUint32(offset, true);
}


/**
 * Determine the active OTA slot from *real* ESP-IDF otadata contents.
 *
 * Expected layout:
 * - Two redundant OTA select entries located at:
 *   - 0x0000 (sector 0)
 *   - 0x1000 (sector 1)
 * Each entry begins at the sector start; the struct itself is small (e.g. 32 bytes),
 * but the stride between entries is 0x1000.
 */
export function detectActiveOtaSlot(
  otadata: Uint8Array,
  otaEntries: MinimalOtaEntry[]
): OtaDetectionResult {
  const otaCount = otaEntries?.length ?? 0;

  if (!otadata?.length || !otaCount) {
    return { slotId: null, summary: "Active slot unknown." };
  }

  // Require enough data to read at least the first entry.
  // (Full otadata is typically 0x2000, but we only need the sector starts.)
  const maxEntriesFromBuffer = Math.floor(otadata.length / OTA_SELECT_SECTOR_SIZE);
  const entryCount = Math.min(2, maxEntriesFromBuffer);

  if (entryCount <= 0) {
    return { slotId: null, summary: "Active slot unknown." };
  }

  const candidates: { seq: number; slotIndex: number; state: number | null }[] = [];

  for (let index = 0; index < entryCount; index += 1) {
    const base = index * OTA_SELECT_SECTOR_SIZE;

    // ota_seq is the first u32 of the ota select struct.
    const seq = readUint32LE(otadata, base);
    if (seq == null) continue;

    // Common invalid markers.
    if (seq === 0xffffffff || seq === 0x00000000) continue;

    const slotIndex = (seq - 1) % otaCount;
    if (slotIndex < 0 || slotIndex >= otaCount) continue;

    // NOTE: state offset varies by implementation; keep for debug only.
    const stateOffset = base + 16;
    const state = stateOffset < otadata.length ? otadata[stateOffset] : null;

    candidates.push({ seq, slotIndex, state });
  }

  if (!candidates.length) {
    return { slotId: null, summary: "No valid OTA selection found" };
  }

  // Highest valid sequence wins.
  candidates.sort((a, b) => b.seq - a.seq);
  const winner = candidates[0];
  const slotId = `ota_${winner.slotIndex}`;

  return {
    slotId,
    summary: `Active slot: ${slotId} (sequence ${winner.seq})`,
  };
}

