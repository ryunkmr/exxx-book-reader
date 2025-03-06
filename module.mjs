import { Navigator } from '#exxx'
import { ConfigKeys } from './modules/constants.mjs'
import { join, dirname } from 'path'
import { config, initConfig } from './modules/config.mjs'
import { mkdir } from 'fs/promises'

const dir = dirname(import.meta.url)

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
    // 設定のセットアップ

    // 必要な設定がされているか確認
    initConfig(accessor.json.id)

    const conf = config()

    // 保存先
    if (!conf.has(ConfigKeys.savePath)) {
      // セットアップ画面表示
      showSetup(1)
    }
  })

  // 設定セットアップイベント
  accessor.listen('ryunkmr@exxx-book-reader:config:submit', async value => {
    try {
      const conf = config()

      // 保存先パスの指定チェック
      if (config && value.savePath) {
        // 設定に反映&ディレクトリ作成
        conf.set(ConfigKeys.savePath, value.savePath)
        await mkdir(value.savePath, { recursive: true })

        return {
          success: true
        }
      }

      return {
        success: false,
        message: '書籍保存先のディレクトリパスが指定されていません。'
      }
    } catch (error) {
      console.error('設定セットアップ中にエラーが発生しました。', error)
      return {
        success: false,
        message: error.message
      }
    }
  })
}