import stripAnsi from 'strip-ansi';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { anyAnimal, anyLog, anyMood, anyShape } from '../src';
import { logPatterns } from '../src/anyLog';
import { animalPatterns } from '../src/anyAnimal';
import { moodPatterns } from '../src/anyMood';
import { shapePatterns } from '../src/anyShape';

describe('any-pattern API', () => {
    let logs: string[];
    let warnings: string[];

    beforeEach(() => {
        logs = [];
        warnings = [];

        vi.spyOn(console, 'log').mockImplementation((message?: unknown) => {
            if (message === undefined) {
                logs.push('');
                return undefined;
            }

            logs.push(stripAnsi(String(message)));
            return undefined;
        });

        vi.spyOn(console, 'warn').mockImplementation((message?: unknown) => {
            warnings.push(stripAnsi(String(message ?? '')));
            return undefined;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders banner text with default options', () => {
        anyLog('Hi');

        expect(logs).toHaveLength(1);
        expect(warnings).toHaveLength(0);

        const expected = logPatterns('hi', { char: '*', spacing: 2, scale: 1 });
        expect(logs[0]).toBe(expected);
    });

    it('respects custom log rendering options', () => {
        anyLog('Aa', 'green', { char: '#', spacing: 1, scale: 1 });

        const expected = logPatterns('aa', { char: '#', spacing: 1, scale: 1 });
        expect(logs[0]).toBe(expected);
    });

    it('prints known shapes and adds a trailing blank line', () => {
        anyShape('heart', 'yellow');

        const pattern = shapePatterns['heart'];
        expect(pattern).toBeDefined();

        expect(logs.slice(0, pattern!.length)).toEqual(pattern);
        expect(logs[pattern!.length]).toBe('');
        expect(warnings).toHaveLength(0);
    });

    it('warns when a shape is missing', () => {
        anyShape('non-existent-shape', 'cyan');

        expect(warnings).toContain('⚠️ Shape "non-existent-shape" not found.');
    });

    it('prints animals and appends a blank separator line', () => {
        anyAnimal('cat', 'magenta');

        const pattern = animalPatterns['cat'];
        expect(pattern).toBeDefined();

        expect(logs.slice(0, pattern!.length)).toEqual(pattern);
        expect(logs[pattern!.length]).toBe('');
    });

    it('warns when an animal is missing', () => {
        anyAnimal('dragon', 'red');

        expect(warnings).toContain('⚠️ Animal "dragon" not found.');
    });

    it('prints moods without appending a blank line', () => {
        anyMood('smiley', 'blue');

        const pattern = moodPatterns['smiley'];
        expect(pattern).toBeDefined();

        expect(logs).toEqual(pattern);
        expect(warnings).toHaveLength(0);
    });

    it('warns when a mood is missing', () => {
        anyMood('grumpy', 'blue');

        expect(warnings).toContain('⚠️ Mood "grumpy" not found.');
    });
});
