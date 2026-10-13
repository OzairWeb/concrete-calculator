# Concrete material calculator

A small HTML, CSS and JavaScript tool from [Ozairwebs](https://ozairwebs.com/) for preliminary cement, sand and aggregate estimates. Enter a known wet concrete volume, or calculate it from length, width and depth. Metric and imperial inputs use the same underlying volume calculation.

## Run it

Download the repository and open `index.html` in a browser. No build process or backend is required. The optional pie chart loads Chart.js from a CDN; numerical results still work if that library is unavailable. The existing [360civil Engineering demo](https://360civil-engineering.com/concrete-calculator-cement-sand-and-aggregate-dry-quantities/) is a separately published implementation and may differ from this repository.

## Calculation method

1. Convert wet volume to cubic metres. Multiply cubic feet by `0.0283168`.
2. Multiply wet volume by the estimating dry-volume factor `1.54`.
3. Divide dry volume between materials according to the selected ratio.
4. Convert material volumes to cubic feet. Divide cement volume in cubic feet by `1.226` to estimate bags.

Presets retained from the original tool are 1:5:10, 1:4:8, 1:3:6, 1:2:4, 1:1.5:3 and 1:1:2. Historical M labels identify these presets; they do not verify concrete strength or replace an approved mix design. The bag conversion is a fixed volumetric approximation, not an adjustable cement-density model.

## Worked example

For **1 m³** wet volume and the **1:2:4** preset, dry volume is **1.54 m³**. Cement receives **0.22 m³**, sand **0.44 m³**, and aggregate **0.88 m³**. Cement is approximately **6.34 bags** under the built-in bag-volume assumption. Display rounding is not an added waste allowance.

## Inputs and results

Volume and every active dimension must be finite and greater than zero. Invalid input clears the previous result. The table is the primary output; the chart shows ratio shares rather than weights. Labels, keyboard focus and a stacked mobile layout support use on smaller screens.

## Practical verdict

Useful for an initial quantity comparison or demonstrating a custom calculation interface. Confirm project mix design, material properties, site waste and ordering quantities separately before procurement. This tool does not determine structural suitability, account for reinforcement or estimate labour, delivery and taxes.

## Development and feedback

`index.html` contains the form, `script.js` handles calculations, and `style.css` controls presentation. Test a known example, equivalent unit inputs, negative dimensions, a narrow screen and operation without Chart.js before changing calculations.

Report reproducible problems through issues with input values, expected output and browser details. Keep private project data out of issues. For a calculator or website tailored to your workflow, [contact Ozairwebs](https://ozairwebs.com/company/contact/).

