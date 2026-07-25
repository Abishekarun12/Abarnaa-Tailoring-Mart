/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img
        src="/images/logo.png"
        alt=""
        style={{ width: 24, height: 24, borderRadius: '9999px', objectFit: 'cover' }}
      />
      <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.02em' }}>
        Abarnaa Tailoring Mart
      </span>
    </div>
  );
}

export function StudioIcon() {
  return (
    <img
      src="/images/logo.png"
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '9999px' }}
    />
  );
}
