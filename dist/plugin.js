exports.version = 1
exports.description = "To easily make basic customizations of the look"
exports.apiRequired = 9.6
exports.repo = "rejetto/hfs-theme-customizer"

exports.config = {
    textColor: { type: 'color', helperText: "Leave empty for default color" },
    bgColor: { type: 'color', label: "Background color" },
    linkColor: { type: 'color' },
    buttonTextColor: { type: 'color' },
    buttonBgColor: { type: 'color', label: "Button background color" },
    bgImage: { type: 'real_path' },
    css: { type: 'string', multiline: true, label: "CSS", helperText: "You can enter here any custom CSS code" },
}

exports.configDialog = { maxWidth: '30em' }

exports.init = api => {
    const URI_PREFIX = api.Const.SPECIAL_URI + 'theme-customizer/'
    return {
        middleware(ctx) {
            const { bgImage } = api.getConfig()
            if (ctx.path === URI_PREFIX + 'bg')
                return api.require('./serveFile').serveFile(ctx, bgImage)
        },
        customHtml() {
            const c = api.getConfig()
            const { prefix } = api.require('./misc')
            return {
                style: `:root body:not(.less-important) {
                    ${c.bgImage ? `background-image: url(${URI_PREFIX}bg);` : ''}
                    ${prefix('--bg:',c.bgColor) };
                    ${prefix('--text:',c.textColor) };
                    ${prefix('--button-bg:',c.buttonBgColor) };
                    ${prefix('--button-text:',c.buttonTextColor) };
                    ${prefix('a { color:',c.linkColor,'}') };
                }
                ${c.css || ''}
                `
            }
        }
    }
}