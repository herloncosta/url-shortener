// --- ELEMENTOS DO DOM ---
const shortenForm = document.getElementById('shortenForm')
const longUrlInput = document.getElementById('longUrlInput')
const shortenBtn = document.getElementById('shortenBtn')
const resultArea = document.getElementById('resultArea')
const shortenedUrl = document.getElementById('shortenedUrl')
const copyBtn = document.getElementById('copyBtn')
const historyList = document.getElementById('historyList')
const noHistory = document.getElementById('noHistory')
const notificationModal = document.getElementById('notificationModal')
const notificationMessage = document.getElementById('notificationMessage')

// --- ESTADO DA APLICAÇÃO ---
let urlHistory = []

// --- FUNÇÕES ---

/**
 * Exibe uma notificação na tela.
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - O tipo de notificação ('success', 'error').
 */
function showNotification(message, type = 'success') {
  notificationMessage.textContent = message

  // Ajusta a cor com base no tipo
  notificationModal.className =
    'fixed top-5 right-5 text-white py-3 px-6 rounded-lg shadow-xl' // Reset
  if (type === 'success') {
    notificationModal.classList.add('bg-green-500')
  } else {
    notificationModal.classList.add('bg-red-500')
  }

  // Animação de entrada
  notificationModal.classList.remove('hidden', 'modal-leave-active')
  notificationModal.classList.add('modal-enter')
  requestAnimationFrame(() => {
    notificationModal.classList.add('modal-enter-active')
  })

  // Esconde a notificação após 3 segundos
  setTimeout(() => {
    notificationModal.classList.remove('modal-enter-active')
    notificationModal.classList.add('modal-leave-active')
    setTimeout(() => notificationModal.classList.add('hidden'), 200)
  }, 3000)
}

/**
 * Renderiza a lista de histórico de URLs.
 */
function renderHistory() {
  historyList.innerHTML = '' // Limpa a lista atual
  if (urlHistory.length === 0) {
    historyList.appendChild(noHistory)
    noHistory.style.display = 'block'
  } else {
    noHistory.style.display = 'none'
    urlHistory.forEach((item) => {
      const historyItem = document.createElement('div')
      historyItem.className =
        'bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'
      historyItem.innerHTML = `
                    <div class="flex-grow">
                        <p class="text-blue-600 dark:text-blue-400 font-semibold text-sm break-all">${item.short}</p>
                        <p class="text-gray-500 dark:text-gray-400 text-xs mt-1 truncate">${item.long}</p>
                    </div>
                    <button class="history-copy-btn text-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium py-1 px-3 rounded-md transition" data-short-url="${item.short}">
                        Copiar
                    </button>
                `
      historyList.appendChild(historyItem)
    })
  }
}

/**
 * Simula uma chamada de API para encurtar a URL.
 * Substitua esta função pela sua chamada de backend real.
 * @param {string} longUrl - A URL longa para encurtar.
 * @returns {Promise<string>} Uma promessa que resolve com a URL curta.
 */
async function shortenUrlApi(longUrl) {
  // Exibindo um estado de carregamento no botão
  shortenBtn.disabled = true
  shortenBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Encurtando...`

  console.log(`Enviando para o backend: ${longUrl}`)

  // *** TODO: INTEGRAR COM O BACKEND ***
  // const response = await fetch('https://seu-backend.com/api/shorten', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ url })
  // });
  // if (!response.ok) {
  //     throw new Error('Falha ao encurtar a URL.');
  // }
  // const data = await response.json();
  // return data.shortUrl;

  // Simulação com um delay de 1 segundo
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Gera um hash aleatório para a simulação
      const hash = Math.random().toString(36).substring(2, 8)
      const shortUrl = `https://cur.to/${hash}`
      resolve(shortUrl)
    }, 1000)
  })
}

/**
 * Manipula o envio do formulário.
 * @param {Event} e - O objeto do evento.
 */
async function handleShortenSubmit(e) {
  e.preventDefault()
  const longUrl = longUrlInput.value.trim()
  if (!longUrl) return

  try {
    const shortUrl = await shortenUrlApi(longUrl)

    shortenedUrl.textContent = shortUrl
    copyBtn.dataset.shortUrl = shortUrl // Adiciona a URL ao botão de cópia
    resultArea.classList.remove('hidden')

    // Adiciona ao histórico (evita duplicados)
    if (!urlHistory.some((item) => item.short === shortUrl)) {
      urlHistory.unshift({ long: longUrl, short: shortUrl })
      // Mantém o histórico com no máximo 5 itens para este exemplo
      if (urlHistory.length > 5) {
        urlHistory.pop()
      }
      renderHistory()
    }

    longUrlInput.value = '' // Limpa o input
  } catch (error) {
    console.error(error)
    showNotification(
      'Não foi possível encurtar a URL. Tente novamente.',
      'error'
    )
  } finally {
    // Restaura o estado do botão
    shortenBtn.disabled = false
    shortenBtn.innerHTML = 'Encurtar'
  }
}

/**
 * Copia um texto para a área de transferência.
 * @param {string} text - O texto a ser copiado.
 * @param {HTMLElement} buttonElement - O botão que acionou a cópia.
 */
function copyToClipboard(text, buttonElement) {
  // Usa a API Clipboard se disponível (mais moderna e segura)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification('URL copiada com sucesso!')
        // Feedback visual no botão
        const originalText = buttonElement.innerHTML
        buttonElement.innerHTML = 'Copiado!'
        setTimeout(() => {
          buttonElement.innerHTML = originalText
        }, 2000)
      })
      .catch((err) => {
        console.error('Falha ao copiar: ', err)
        showNotification('Falha ao copiar a URL.', 'error')
      })
  } else {
    // Fallback para `document.execCommand`
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      showNotification('URL copiada com sucesso!')
      const originalText = buttonElement.innerHTML
      buttonElement.innerHTML = 'Copiado!'
      setTimeout(() => {
        buttonElement.innerHTML = originalText
      }, 2000)
    } catch (err) {
      console.error('Fallback: Falha ao copiar', err)
      showNotification('Falha ao copiar a URL.', 'error')
    }
    document.body.removeChild(textArea)
  }
}

// --- EVENT LISTENERS ---
shortenForm.addEventListener('submit', handleShortenSubmit)

copyBtn.addEventListener('click', (e) => {
  const urlToCopy = e.currentTarget.dataset.shortUrl
  if (urlToCopy) {
    copyToClipboard(urlToCopy, e.currentTarget)
  }
})

historyList.addEventListener('click', (e) => {
  // Delegação de evento para os botões de cópia no histórico
  if (e.target.classList.contains('history-copy-btn')) {
    const urlToCopy = e.target.dataset.shortUrl
    if (urlToCopy) {
      copyToClipboard(urlToCopy, e.target)
    }
  }
})

// --- INICIALIZAÇÃO ---
renderHistory() // Renderiza o estado inicial do histórico
