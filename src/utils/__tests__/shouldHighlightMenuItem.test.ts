import { describe, expect, it } from 'vitest';

import { shouldHighlightMenuItem } from '../shouldHighlightMenuItem';

describe('shouldHighlightMenuItem', () => {
  it('returns true when currentPath starts with menuItemPath', () => {
    expect(shouldHighlightMenuItem('/home', '/home/about')).toBe(true);
    expect(shouldHighlightMenuItem('/about', '/about')).toBe(true);
    expect(shouldHighlightMenuItem('/services', '/services/item/123')).toBe(
      true,
    );
  });

  it('returns false when currentPath does not start with menuItemPath', () => {
    expect(shouldHighlightMenuItem('/about', '/home/about')).toBe(false);
    expect(shouldHighlightMenuItem('/services', '/industries')).toBe(false);
    expect(shouldHighlightMenuItem('/case-studies', '/case')).toBe(false);
    expect(shouldHighlightMenuItem('/case', '/case-studies')).toBe(false);
  });

  it('handles empty menuItemPath correctly', () => {
    expect(shouldHighlightMenuItem('', '/home')).toBe(false);
    expect(shouldHighlightMenuItem('/', '/home')).toBe(false);
  });

  it('returns false when menuItemPath is longer than currentPath', () => {
    expect(shouldHighlightMenuItem('/home/about', '/home')).toBe(false);
    expect(shouldHighlightMenuItem('/services/details', '/services')).toBe(
      false,
    );
  });

  it('handles trailing slashes correctly', () => {
    expect(shouldHighlightMenuItem('/home/', '/home/')).toBe(true);
    expect(shouldHighlightMenuItem('/home/', '/home/about')).toBe(true);
    expect(shouldHighlightMenuItem('/home/', '/home')).toBe(true);
  });
});
