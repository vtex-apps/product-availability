# Product Availability

## Description

The Product Availability component shows different messages set by the user, depending on the available quantity of the product.

It is only available to be used on the `store.product` block, in your product page.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request

## Table of Contents

- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app or override the default CSS you need import it in your dependencies on `manifest.json` file.

```json
  "dependencies": {
    "vtex.product-availability": "0.x"
  }
```

Then, add `product-availability` block to your `blocks.json`

Now, you can change the behavior of the `product-availability` block that is in the minicart. See an example of how to configure **without** showing availability:

```json
"product-availability": {
  "props": {
    "threshold": "10",
    "lowStockMessage": "Only {quantity} left!",
    "highStockMessage": "Item in stock!",
  }
}
```

See an example of how to configure **showing availability**:

```json
"product-availability": {
  "props": {
    "showAvailability": "stock",
    "showAvailabilityMessage": "There are {quantity} available!"
  }
}
```

### Blocks API

When implementing this app as a block, various inner blocks may be available. The following interface lists the available blocks within product-availability and describes if they are required or optional.

```json
{
  "product-availability": {
    "component": "ProductAvailability"
  }
}
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the product-availability's behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name           | Type      | Description                                                                                 |
| ------------------- | --------- | ------------------------------------------------------------------------------------------- |
| `threshold`     | `Number` | DefineMinimum quantity that makes low stock message appear (if message is set). Default: 0    |
| `lowStockMessage`        | `String` | String to be shown to user when stock is lower than threshold. Should have {quantity} inside the given string, to be replaced for the threshold property. Example: \"Only {quantity} left!\". Leave empty to not show. Default: ""              |
| `highStockMessage`  | `String` | String to be shown when stock is higher or equal than threshold. If left empty, won\'t show. Default: ""                                                              |
| `showAvailability`  | `String` | Enables the possibility to show the available items instead of lowStockMessage or highStockMessage. Accepted value "stock". Default "".                                                           |
| `showAvailabilityMessage`  | `String` | String to be shown when show available option is true. Should have {quantity} inside the given string, to be replaced for the available property. Example: \"There are {quantity} available!\". Leave empty to not show. Default: ""                                                              |

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.product-availability.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS Namespaces

Below, we describe the namespaces that are defined in the product-availability.

| Token name                 | Component                                                                                                                                                                                                                                                                                                                                                                     | Description                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `container`                | [index](https://github.com/vtex-apps/product-availability/blob/master/react/components/ProductAvailability.tsx) | The main container of `ProductAvailability`                      |
| `lowStockText`          | [index](https://github.com/vtex-apps/product-availability/blob/master/react/components/LowStock.tsx)    |  Normal text for the low stock message.                                        
| `lowStockHighlight`           | [index](https://github.com/vtex-apps/product-availability/blob/master/react/components/LowStock.tsx)   |  Number of the low stock message that is supposed to be highlighted.  |
| `highStockText`           | [index](https://github.com/vtex-apps/product-availability/blob/master/react/components/HighStock.tsx)   | Text of the hight stock message.    |
| `showAvailableText`           | [index](https://github.com/vtex-apps/product-availability/blob/master/react/components/ShowAvailable.tsx)   | Text of the show available message.    |
| `showAvailableTextHighlight`           | [index](https://github.com/vtex-apps/product-availability/blob/master/react/components/ShowAvailable.tsx)   | Number of the available items that is supposed to be highlighted.

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/product-availability/issues). Also feel free to [open issues](https://github.com/vtex-apps/product-availability/issues/new) or contribute with pull requests.

## Tests

To execute our tests go to `react/` folder and run `yarn test`

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/product-availability.svg?branch=master)](https://travis-ci.org/vtex-apps/product-availability)
[![Coverage Status](https://coveralls.io/repos/github/vtex-apps/product-availability/badge.svg?branch=master)](https://coveralls.io/github/vtex-apps/product-availability?branch=master)