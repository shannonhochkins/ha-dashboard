# HomeAssistant React Dashboard

## Motivation

The goal of this project is to have a wall mounted tablet running a dashboard to control my home.

The goal is really to have one screen without any menu so I can have a global view of the more important thing in the home: alarm, lights, camera.


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
