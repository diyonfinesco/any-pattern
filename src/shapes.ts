export const shapePatterns: { [key: string]: string[] } = {
    square: [
        '*****',
        '*****',
        '*****',
        '*****',
        '*****'
    ],
    'hollow square': [
        '*****',
        '*   *',
        '*   *',
        '*   *',
        '*****',
    ],
    'right triangle': [
        '    *',
        '   **',
        '  ***',
        ' ****',
        '*****',
    ],
    'left triangle': [
        '*',
        '**',
        '***',
        '****',
        '*****',
    ],
    'downward triangle': [
        '*****',
        '****',
        '***',
        '**',
        '*',
    ],
    'hollow triangle': [ // Note: 6 lines high
        '*',
        '**',
        '* *',
        '*  *',
        '*   *',
        '******',
    ],
    pyramid: [
        '    *',
        '   ***',
        '  *****',
        ' *******',
        '*********',
    ],
    'reversed pyramid': [
        '*********',
        ' *******',
        '  *****',
        '   ***',
        '    *',
    ],
    'hollow pyramid': [
        '    *',
        '   * *',
        '  *   *',
        ' *     *',
        '*********',
    ],
    diamond: [
        '    *',
        '   ***',
        '  *****',
        ' *******',
        '*********',
        ' *******',
        '  *****',
        '   ***',
        '    *',
    ],
    'hollow diamond': [
        '    *',
        '   * *',
        '  *   *',
        ' *     *',
        '*       *',
        ' *     *',
        '  *   *',
        '   * *',
        '    *',
    ],
    hourglass: [
        '*********',
        ' *******',
        '  *****',
        '   ***',
        '    *',
        '   ***',
        '  *****',
        ' *******',
        '*********',
    ],
    heart: [ // Note: 8 lines high
        '  ***   ***  ',
        ' ***** ***** ',
        ' ***********',
        '  ********* ',
        '   *******  ',
        '    *****   ',
        '     ***    ',
        '      *     '
    ]
};