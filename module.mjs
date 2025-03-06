import { Navigator } from '#exxx'
import { ConfigKeys } from './modules/constants.mjs'
import { join, dirname } from 'path'
import { bookReaderConfig } from './modules/config.mjs'

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

    // 保存先
    if (!bookReaderConfig.has(ConfigKeys.savePath)) {
      // セットアップ画面表示
      showSetup(1)
    }
  })

  // 設定セットアップイベント
  accessor.listen('ryunkmr@exxx-book-reader:config:submit', async config => {
    try {
      // 保存先パスの指定チェック
      if (config && config.savePath) {
        // 設定に反映&ディレクトリ作成
        bookReaderConfig.set(ConfigKeys.savePath, config.savePath)
        await mkdir(config.savePath, { recursive: true })

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