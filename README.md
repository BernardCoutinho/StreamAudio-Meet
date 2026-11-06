# StreamAudio Meet v0.1.4 — Ajuste de ganho

Extensão experimental Chrome Manifest V3, para Google Meet. Intercepta a solicitação de compartilhamento de janela para selecionar `windowAudio: "window"` e aplica ganho somente à trilha de áudio da apresentação.

## Instalação
1. Extraia o ZIP.
2. Acesse `chrome://extensions`, ative **Modo do desenvolvedor** e clique em **Carregar sem compactação**.
3. Selecione a pasta extraída. Desative antes a versão anterior da extensão.
4. Recarregue as abas do Google Meet.

## Uso
1. Clique no ícone StreamAudio (fixe-o na barra se necessário).
2. Ajuste o ganho entre **0% e 1000%**; valor inicial **300%**.
3. No Meet, compartilhe uma **janela** e ative **Compartilhar também o áudio do app**.
4. O valor pode ser alterado durante a apresentação. A configuração fica salva localmente no navegador.

Em **0%**, o áudio da apresentação fica silenciado pela extensão, mas a imagem compartilhada e a reprodução local continuam normais.

**Importante:** até 1000% significa multiplicação de amplitude do sinal, e não aumento linear da sensação de volume. Ganhos altos podem causar clipping/distorção e o Meet pode aplicar processamento adicional. A extensão não aumenta o volume do headset nem o do microfone.

## Validação
Teste com outra pessoa: 300%, 500%, 700%, 1000%, mantendo a saída local inalterada e verificando distorções. Reconfirme isolamento com Spotify + jogo e encerramento da apresentação.

Sem servidores, sem gravação e sem coleta de áudio. Permissão `storage` armazena apenas o ganho.
