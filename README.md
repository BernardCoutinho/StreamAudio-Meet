# StreamAudio Meet

**Share only the audio you want on Google Meet.**

StreamAudio Meet is a free, lightweight Chrome extension that lets you share a specific application's audio during Google Meet presentations without broadcasting every sound from your computer.

## Features

- **Application audio isolation** — Share audio associated with the selected window instead of your entire system.
- **Independent transmission volume** — Adjust audio gain from 0% to 1000%.
- **Mute presentation audio** — Set gain to 0% without stopping screen sharing.
- **Preserved local audio** — Keep listening to your applications at their normal volume.
- **Separate microphone** — Presentation audio remains independent from your microphone.
- **Lightweight** — No additional audio drivers or desktop applications required.

## How It Works

StreamAudio Meet uses Chrome's native window audio capture capabilities and the Web Audio API to control the audio sent through Google Meet presentations.

The extension requests application-specific audio capture and applies gain to the captured audio stream.

It does not need to modify your system's application volume settings.

## Installation

### Manual Installation

1. Download the latest release from this repository.
2. Extract the ZIP file.
3. Open `chrome://extensions` in Google Chrome.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the extracted extension folder.
7. Open or reload Google Meet.

## How to Use

1. Join a Google Meet meeting.
2. Click **Present now** and select an application window.
3. Enable audio sharing.
4. Start presenting.
5. Open the StreamAudio Meet extension popup.
6. Adjust the transmission gain from 0% to 1000%.

Your local application audio remains unchanged.

## Compatibility

- Google Chrome on Windows 11
- Google Meet
- Chrome versions supporting application-specific window audio capture

Compatibility may vary depending on Chrome updates, application behavior, and Google Meet changes.

## Limitations

- Audio isolation depends on Chrome's window audio capture implementation.
- Applications using multiple unrelated processes may not be fully isolated.
- High amplification levels may cause clipping or distortion.
- Google Meet or Chrome updates may affect compatibility.
- This is an independent community project, not an official Google product.

## Privacy

StreamAudio Meet is designed to process captured audio locally in the browser.

The project does not require user accounts or cloud services.

Review the source code and the repository's privacy documentation for implementation details.

## Contributing

Contributions, suggestions, and bug reports are welcome.

If you find the project useful, consider giving it a ⭐ on GitHub.

## License

Distributed under the MIT License.

---

**Free and open source, built for the community.**
