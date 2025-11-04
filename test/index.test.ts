import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import stripAnsi from 'strip-ansi';
import { anyLog, anyShape, anyAnimal, anyMood } from '../src/index';
import { logPatterns } from '../src/anyLog';
import { shapePatterns } from '../src/anyShape';
import { animalPatterns } from '../src/anyAnimal';
import { moodPatterns } from '../src/anyMood';

describe('any-pattern exports', () => {
    const logs: string[] = [];
    const warns: string[] = [];

    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation((...args: unknown[]) => {
            if (args.length === 0) {
                logs.push('');
                return undefined;
            }

            const [first] = args;
            logs.push(stripAnsi(String(first ?? '')));
            return undefined;
        });

        vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
            const [first] = args;
            warns.push(stripAnsi(String(first ?? '')));
            return undefined;
        });
    });

    afterEach(() => {
        logs.length = 0;
        warns.length = 0;
        vi.restoreAllMocks();
    });

    it('renders log banner output via anyLog', () => {
        const expected = logPatterns('Hi', { char: '#', spacing: 1, scale: 1 });

        anyLog('Hi', 'cyan', { char: '#', spacing: 1, scale: 1 });

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBe(expected);
    });

    it('renders a known shape pattern and appends a blank line', () => {
        const heart = shapePatterns['heart'];

        anyShape('heart', 'magentaBright');

        expect(logs.slice(0, heart.length)).toEqual(heart);
        expect(logs[heart.length]).toBe('');
    });

    it('warns when a shape is missing', () => {
        anyShape('not-a-shape' as never, 'red');

        expect(warns).toContain('⚠️ Shape "not-a-shape" not found.');
    });

    it('renders an animal pattern', () => {
        const cat = animalPatterns['cat'];

        anyAnimal('cat', 'yellow');

        expect(logs.slice(0, cat.length)).toEqual(cat);
    });

    it('renders a mood pattern without bold formatting', () => {
        const cool = moodPatterns['cool'];

        anyMood('cool', 'blue');

        expect(logs).toEqual(cool);
    });

    it('warns when a mood is missing', () => {
        anyMood('grumpy' as never, 'green');

        expect(warns).toContain('⚠️ Mood "grumpy" not found.');
    });
});
