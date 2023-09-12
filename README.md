# THIS HAS MOVED!!!

This is an older repository and no longer maintained in favor of the new (@hakit packages!)[https://github.com/shannonhochkins/ha-component-kit]

## HomeAssistant React Dashboard

## Demo

![](https://github.com/shannonhochkins/ha-dashboard/blob/master/ha-demo.gif)

## Motivation

The goal of this project is to have a wall mounted tablet running a dashboard to control my home.

The goal is really to have one screen single page application to easily navigate between rooms and automate the boring stuff.


## Getting started

Install

```bash
npm run install
```

Run a development server

```
npm run start
```

Add the following entry to your `configuration.yaml` file:

```yaml
panel_custom:
  - name: react-panel-dev
    sidebar_title: React Panel
    sidebar_icon: mdi:react
    url_path: react-panel-dev
    js_url: http://0.0.0.0:8080/main.js
    embed_iframe: true
    config:
      name: World
```

Restart Home Assistant.

## Deploy
Let's assume you've created a directory under the www folder called `react-panel`. Also add this to the package.json `panelServingUrl`

To deploy it, run `npm run build`.

This will generate a new build of the panel in the `dist` folder. Copy the contents of this folder and place it in `<home assistant config>/www/react-panel`.

This will make it available from Home Assistant via the url `/local/react-panel/main.js`.

I create a second custom panel, notice the missing "-dev" which will be the production dashboard.

```yaml
panel_custom:
  - name: react-panel
    sidebar_title: React Panel
    sidebar_icon: mdi:react
    url_path: react-panel-prod
    js_url: /local/react-panel/main.js
    embed_iframe: true
    config:
      name: World
```


## Custom Redirect from the default dashboard so devices auto redirect to the react-panel
This will simply find the react-panel element in the sidebar and click it if it's not active, add this javascript file to the default dashboard resources.

```javscript
export default function customRedirect( {
    const homeAssistant = document.querySelector('home-assistant');
	const root = homeAssistant.shadowRoot.querySelector('home-assistant-main').shadowRoot;
	const sidebarRoot = root.querySelector('ha-sidebar').shadowRoot;
	const reactPanelElement = sidebarRoot.querySelector('paper-listbox').querySelector('a[data-panel="react-panel"]:not([class*="selected"])');
	if(!reactPanelElement) { return; }
	reactPanelElement.click();
}

customRedirect();
```
