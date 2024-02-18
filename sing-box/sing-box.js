const { type, name } = $arguments
if (type == "1") {
  subtype = 'collection'
} else {
  subtype = 'subscription'
}

let config = JSON.parse($files[0])
let proxies = JSON.parse(await produceArtifact({
  type: subtype,
  name: name,
  platform: 'sing-box'
}))

proxies.map(p => {
  config.outbounds.push(p)
  config.outbounds.map(i => {
    if (['all'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /港|hk|hongkong|kong kong|🇭🇰/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['hk-auto'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /台|tw|taiwan|🇹🇼/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['tw-auto'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /日本|jp|japan|🇯🇵/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['jp-auto'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /^(?!.*(?:us)).*(新|sg|singapore|🇸🇬)/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['sg-auto'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /美|us|unitedstates|united states|🇺🇸/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['us-auto'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})

$content = JSON.stringify(config, null, 2)
