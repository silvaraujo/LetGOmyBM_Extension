chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: 'OFF'
    });
});

const report = 'https://app.buzzmonitor.com.br/reports';

//gerenciador de estado de atividade da extensão
chrome.action.onClicked.addListener(async (tab) => {
    if ( tab.url.startsWith(report) ) {

        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

        const nextState = prevState === 'ON' ? 'OFF' : 'ON';


        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState
        });

        if (nextState === 'ON') {

            await chrome.scripting.insertCSS({
                files: ['hide.css'],
                target: { tabId: tab.id }
            });
        } else if (nextState === 'OFF') {

            await chrome.scripting.removeCSS({
                files: ['hide.css'],
                target: { tabId: tab.id }
            });
        }
    }
});

//gerenciador de comandos 'para efeitos de teste'
chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
});