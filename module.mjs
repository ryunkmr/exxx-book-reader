import { ExxxConfig, Navigator } from '#exxx'
import { ConfigKeys } from './modules/constants.mjs'

export default function (accessor) {
  // プラグインロード時
  accessor.listen('plugin.load', () => {
    // ビューセットアップ
    const nav = new Navigator()
    nav.register([
      { alias: 'setup', url: './views/setup.html' }
    ])

    // 設定のセットアップ

    // 必要な設定がされているか確認
    const conf = new ExxxConfig(accessor.json.id)

    // 保存先
    if (!conf.store.has(ConfigKeys.savePath)) {
      // セットアップ画面表示
      nav.forward('setup')
    }
  })
}