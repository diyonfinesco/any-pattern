import { describe, it, expect } from 'vitest';
import chalk from 'chalk';
import {
    renderLog,
    renderShape,
    renderAnimal,
    renderMood,
    shapes,
    animals,
    moods,
} from '../src';
import { shapePatterns } from '../src/anyShape';
import { animalPatterns } from '../src/anyAnimal';
import { moodPatterns } from '../src/anyMood';

describe('render API (pure, no side effects)', () => {
    it('renderLog returns plain capturable output when no color is given', () => {
        const out = renderLog('Hi', { char: '#', spacing: 1 });
        expect(out).toContain('#');
        // no ANSI escape codes when uncolored
        expect(out).not.toMatch(/\[/);
    });

    it('renderLog renders punctuation glyphs', () => {
        const out = renderLog('A!', { char: '#' });
        expect(out.split('\n')).toHaveLength(7);
        expect(out).toContain('#');
    });

    it('renderShape returns the raw pattern joined by newlines', () => {
        expect(renderShape('heart')).toBe(shapePatterns['heart'].join('\n'));
    });

    it('renderShape is case-insensitive', () => {
        expect(renderShape('HEART' as never)).toBe(shapePatterns['heart'].join('\n'));
    });

    it('renderShape throws on unknown shape', () => {
        expect(() => renderShape('nope' as never)).toThrow(/not found/);
    });

    it('renderMood defaults to smiley', () => {
        expect(renderMood()).toBe(moodPatterns['smiley'].join('\n'));
    });

    it('rainbow output differs from a flat color (colors forced on)', () => {
        const prev = chalk.level;
        chalk.level = 3; // force ANSI even in a non-TTY test runner
        try {
            const flat = renderShape('diamond', 'red');
            const rainbow = renderShape('diamond', 'rainbow');
            expect(rainbow).not.toBe(flat);
            expect(rainbow).toMatch(/\[/);
        } finally {
            chalk.level = prev;
        }
    });
});

describe('catalogue / type consistency', () => {
    it('exposes every shape, animal, and mood key', () => {
        expect([...shapes].sort()).toEqual(Object.keys(shapePatterns).sort());
        expect([...animals].sort()).toEqual(Object.keys(animalPatterns).sort());
        expect([...moods].sort()).toEqual(Object.keys(moodPatterns).sort());
    });

    it('every catalogued entry renders without throwing', () => {
        for (const s of shapes) expect(() => renderShape(s)).not.toThrow();
        for (const a of animals) expect(() => renderAnimal(a)).not.toThrow();
        for (const m of moods) expect(() => renderMood(m)).not.toThrow();
    });
});
