// セットアップページの処理

// 初期設定を送信し、セットアップを実行する
async function submitSetup() {
  const savePath = document.getElementById('savePath').value

  const config = {
    savePath
  }

  const result = await window.api.pages.setup.invoke('ryunkmr@exxx-book-reader:config:submit', config)
  if (result[0].success) {
    window.location = './index.html'
  } else {
    toast({
      color: 'danger',
      content: result[0].message,
      close: true
    })
  }
}