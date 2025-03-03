// セットアップページの処理

// 初期設定を送信し、セットアップを実行する
async function submitSetup() {
  const savePath = document.getElementById('savePath').value

  const config = {
    savePath
  }

  const result = await window.api.pages.setup.submit(config)
  if (result) {
    window.location = './index.html'
  } else {
    console.log("設定失敗")
  }
}