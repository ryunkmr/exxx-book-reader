import { ExxxConfig } from '#exxx'

const data = {}

export function initConfig(id) {
  data.conf = new ExxxConfig(id)
  data.conf.init()
}

export function config() {
  return data.conf
}
