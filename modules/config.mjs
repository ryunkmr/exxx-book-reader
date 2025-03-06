import { ExxxConfig } from '#exxx'

const data = {}

const conf = new ExxxConfig(accessor.json.id)
conf.init()

export function initConfig(id) {
  data.conf = new ExxxConfig(id)
  data.conf.init()
}

export function config() {
  return data.conf
}
