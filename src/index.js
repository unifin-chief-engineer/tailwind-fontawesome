const plugin = require('tailwindcss/plugin');

const icons = require('./manifest.js');

module.exports = plugin.withOptions(
    (options) => {
        return function ({ e, addUtilities, theme }) {
            const { pro, version, family, custom } = options || {};
            const configuredIcons = [...icons, ...(custom || [])];
            const escapeClassName =
                typeof e === 'function'
                    ? e
                    : (className) => className.replace(/([^a-zA-Z0-9-_])/g, '\\$1');
            const sharedIconStyles = {
                display: 'inline-block',
                'text-rendering': 'auto',
                '-webkit-font-smoothing': 'antialiased'
            };

            const fontVersion = version === 6 ? 'Font Awesome 6' : 'Font Awesome 5';
            let fontFamily = pro ? '"' + fontVersion + ' Pro"' : '"' + fontVersion + ' Free"';

            if (family === 'sharp') {
                fontFamily = '"Font Awesome 6 Sharp"';
            }

            const iconStyle = theme('iconStyle');
            const iconSpacing = theme('iconSpacing');

            const utilities = [
                // Positioning
                {
                    '.icon-before': {
                        '&::before': {
                            ...sharedIconStyles,
                            fontFamily: fontFamily,
                            verticalAlign: 'middle'
                        },
                        '&::after': {
                            content: '"" !important'
                        }
                    },
                    '.icon-after': {
                        '&::before': {
                            content: '"" !important'
                        },
                        '&::after': {
                            ...sharedIconStyles,
                            fontFamily: fontFamily,
                            verticalAlign: 'middle'
                        }
                    },
                    '.icon-outside': {
                        '&::before': {
                            ...sharedIconStyles,
                            fontFamily: fontFamily,
                            verticalAlign: 'middle',
                            position: 'absolute',
                            transform: 'translateX(-1.5em)'
                        },
                        '&::after': {
                            content: '"" !important'
                        }
                    },
                    '.icon-inline': {
                        ...sharedIconStyles,
                        fontFamily: fontFamily,
                        verticalAlign: 'middle'
                    }
                },
                // Styles
                Object.entries(iconStyle).map(([key, value]) => {
                    return {
                        [`.${escapeClassName(`icon-${key}`)}`]: {
                            '&::before,&::after': {
                                fontWeight: `${value}`
                            }
                        }
                    };
                }),
                {
                    '.icon-duotone': {
                        '&.icon-inline,&::before,&::after': {
                            fontFamily: '"' + fontVersion + ' Duotone"'
                        }
                    },
                    '.icon-brands': {
                        '&.icon-inline,&::before,&::after': {
                            fontFamily: '"' + fontVersion + ' Brands"'
                        }
                    }
                },
                // Spacing
                Object.entries(iconSpacing).map(([key, value]) => {
                    return {
                        [`.${escapeClassName(`icon-space-${key}`)}`]: {
                            '&.icon-before::before': {
                                marginRight: `${value}`
                            },
                            '&.icon-after::after': {
                                marginLeft: `${value}`
                            }
                        }
                    };
                }),
                // Alignment
                {
                    '.icon-baseline': {
                        '&::before': {
                            verticalAlign: 'baseline !important'
                        },
                        '&::after': {
                            verticalAlign: 'baseline !important'
                        }
                    },
                    '.icon-sub': {
                        '&::before': {
                            verticalAlign: 'sub !important'
                        },
                        '&::after': {
                            verticalAlign: 'sub !important'
                        }
                    },
                    '.icon-super': {
                        '&::before': {
                            verticalAlign: 'super !important'
                        },
                        '&::after': {
                            verticalAlign: 'super !important'
                        }
                    },
                    '.icon-top': {
                        '&::before': {
                            verticalAlign: 'top !important'
                        },
                        '&::after': {
                            verticalAlign: 'top !important'
                        }
                    },
                    '.icon-middle': {
                        '&::before': {
                            verticalAlign: 'middle !important'
                        },
                        '&::after': {
                            verticalAlign: 'middle !important'
                        }
                    },
                    '.icon-bottom': {
                        '&::before': {
                            verticalAlign: 'bottom !important'
                        },
                        '&::after': {
                            verticalAlign: 'bottom !important'
                        }
                    }
                },
                // Icons
                configuredIcons.map((icon) => {
                    return {
                        [`.${escapeClassName(`icon-${icon.name}`)}`]: {
                            '&::before': {
                                content: `"\\${icon.code}"`
                            },
                            '&::after': {
                                content: `"\\${icon.code}"`
                            }
                        }
                    };
                })
            ];

            addUtilities(utilities.flat());
        };
    },
    () => ({
        theme: {
            iconStyle: {
                thin: '100',
                light: '300',
                regular: '400',
                solid: '900'
            },
            iconSpacing: (theme) => ({
                xs: theme('spacing.1'),
                sm: theme('spacing.2'),
                md: theme('spacing.3'),
                lg: theme('spacing.4'),
                xl: theme('spacing.5'),
                '2xl': theme('spacing.6'),
                '3xl': theme('spacing.7')
            })
        }
    })
);
