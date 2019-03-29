const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')

module.exports = connect(mapStateToProps)(InfoScreen)

function mapStateToProps (state) {
  return {}
}

inherits(InfoScreen, Component)
function InfoScreen () {
  Component.call(this)
}

InfoScreen.prototype.render = function () {
  const state = this.props
  const version = global.platform.getVersion()

  return (
    h('.flex-column.flex-grow', {
      style: {
        maxWidth: '400px',
      },
    }, [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
          onClick: (event) => {
            state.dispatch(actions.goHome())
          },
        }),
        h('h2.page-subtitle', 'Info'),
      ]),

      // main view
      h('.flex-column.flex-justify-center.flex-grow.select-none', [
        h('.flex-space-around', {
          style: {
            padding: '20px',
          },
        }, [
          // current version number

          h('.info.info-gray', [
            h('div', 'SOV Wallet'),
            h('div', {
              style: {
                marginBottom: '10px',
              },
            }, `Version: ${version}`),
          ]),
          
            h('hr', {
            style: {
              margin: '10px 0 ',
              width: '7em',
            },
          }),


          h('div', {
            style: {
              marginBottom: '5px',
            }},
            [
            
             h('div', [
                h('a.info', {
                  href: 'https://www.soundmoneycoin.io/',
                  target: '_blank',
                }, 'Official Website'),
              ]),
            
             h('div', [
                h('a.info', {
                  href: 'https://bitcointalk.org/index.php?topic=5117492.msg50041717#msg50041717',
                  target: '_blank',
                }, 'BTC Thread'),
              ]),
              h('div', [
                h('a.info', {
                  href: 'https://github.com/soundmoneycoin',
                  target: '_blank',
                }, 'Github'),
              ]),

            ]
          ),

          h('hr', {
            style: {
              margin: '10px 0 ',
              width: '7em',
            },
          }),

          h('div', {
            style: {
              paddingLeft: '0px',
            }},
            [
              h('div', [
                h('a.info', {
                  href: 'https://twitter.com/soundmoneycoin',
                  target: '_blank',
                }, 'Twitter'),
              ]),

              h('div', [
                h('a.info', {
                  href: 'https://t.me/soundmoneycoingroup',
                  target: '_blank',
                }, 'Telegram'),
              ]),
              ]),
            
              h('div', [
                  h('a.info', {
                    href: 'https://discord.gg/up77nXY',
                    target: '_blank',
                  }, 'Discord'),
                 ]),
            
        ]),
      ]),
    ])
  )
}
InfoScreen.prototype.navigateTo = function (url) {
  global.platform.openWindow({ url })
}
