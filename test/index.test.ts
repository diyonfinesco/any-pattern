import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import stripAnsi from 'strip-ansi';
import {
    anyLog,
    anyShape,
    anyAnimal,
    anyMood,
    renderLog,
    renderShape,
} from '../src/index';
import { shapePatterns } from '../src/anyShape';
import { animalPatterns } from '../src/anyAnimal';
import { moodPatterns } from '../src/anyMood';

describe('print API', () => {
    let logs: string[];
    let warns: string[];

    beforeEach(() => {
        logs = [];
        warns = [];

        vi.spyOn(console, 'log').mockImplementation((message?: unknown) => {
            logs.push(message === undefined ? '' : stripAnsi(String(message)));
            return undefined;
        });

        vi.spyOn(console, 'warn').mockImplementation((message?: unknown) => {
            warns.push(stripAnsi(String(message ?? '')));
            return undefined;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('anyLog prints a single banner block', () => {
        anyLog('Hi', 'cyan', { char: '#', spacing: 1, scale: 1 });

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBe(renderLog('Hi', { char: '#', spacing: 1, scale: 1 }));
    });

    it('anyShape prints the pattern then a trailing blank line', () => {
        anyShape('heart', 'yellow');

        expect(logs[0]).toBe(renderShape('heart'));
        expect(logs[1]).toBe('');
        expect(warns).toHaveLength(0);
    });

    it('anyShape warns on unknown shape', () => {
        anyShape('non-existent-shape' as never, 'cyan');
        expect(warns).toContain('⚠️ Shape "non-existent-shape" not found.');
    });

    it('anyAnimal prints the pattern then a trailing blank line', () => {
        anyAnimal('cat', 'magenta');

        expect(logs[0]).toBe(animalPatterns['cat'].join('\n'));
        expect(logs[1]).toBe('');
    });

    it('anyAnimal warns on unknown animal', () => {
        anyAnimal('dragon' as never, 'red');
        expect(warns).toContain('⚠️ Animal "dragon" not found.');
    });

    it('anyMood prints without a trailing blank line', () => {
        anyMood('smiley', 'blue');

        expect(logs).toEqual([moodPatterns['smiley'].join('\n')]);
        expect(warns).toHaveLength(0);
    });

    it('anyMood defaults to smiley when called with no name', () => {
        anyMood();
        expect(logs).toEqual([moodPatterns['smiley'].join('\n')]);
    });

    it('anyMood warns on unknown mood', () => {
        anyMood('grumpy' as never, 'blue');
        expect(warns).toContain('⚠️ Mood "grumpy" not found.');
    });

    it('rainbow color renders without warning', () => {
        anyShape('star', 'rainbow');
        expect(warns).toHaveLength(0);
        expect(logs[0]).toBe(shapePatterns['star'].join('\n'));
    });
});
