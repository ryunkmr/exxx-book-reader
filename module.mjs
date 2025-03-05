import { ExxxConfig, Navigator } from '#exxx'
import { ConfigKeys } from './modules/constants.mjs'
import { join, dirname } from 'path'

// ビューセットアップ
const nav = new Navigator()
nav.register([
  { alias: 'setup', url: join(dir, 'views/setup.html') }
])

async function showSetup(retry) {
  try {
    if (retry <= 0) return
    await nav.forward('setup')
  } catch (error) {
    console.error(error)

    setTimeout(() => showSetup(retry), 1)
  }
}

export default function (accessor) {
  // プラグインロード時
  accessor.listen('plugin.load', async () => {
    const dir = dirname(import.meta.url)

    

    // 設定のセットアップ

    // 必要な設定がされているか確認
    const conf = new ExxxConfig(accessor.json.id)

    conf.init()

    // 保存先
    if (!conf.has(ConfigKeys.savePath)) {
      // セットアップ画面表示

        showSetup(1)
    }
  })
}