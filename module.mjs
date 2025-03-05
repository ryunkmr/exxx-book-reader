import { ExxxConfig, Navigator } from '#exxx'
import { ConfigKeys } from './modules/constants.mjs'
import { join, dirname } from 'path'

export default function (accessor) {
  // プラグインロード時
  accessor.listen('plugin.load', async () => {
    const dir = dirname(import.meta.url)

    // ビューセットアップ
    const nav = new Navigator()
    nav.register([
      { alias: 'setup', url: join(dir, 'views/setup.html') }
    ])

    // 設定のセットアップ

    // 必要な設定がされているか確認
    const conf = new ExxxConfig(accessor.json.id)

    conf.init()

    // 保存先
    if (!conf.has(ConfigKeys.savePath)) {
      // セットアップ画面表示
      await nav.forward('setup')
    }
  })
}