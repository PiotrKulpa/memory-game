# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Dependencies](#dependencies)
* [Details](#details)
* [Rules](#rules)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Dependencies

The app is built with the following code dependencies:

1. Font Awesome
2. Google Fonts: Coda (designer Vernon Adams)
3. Main CSS file in css/app.css folder
4. Main JS file in js/app.js folder

## Details

* Assets: css/app.css, img/geometry2.png, js/app.js
* Main functionality is in app.js
* Game based on functions
* init() loads game when browser is opened and when refresh button is clicked
* when game starts it: gets all cards, shuffles cards, displays cards, adds listener to every cards
* when card is clicked game: checks (odd/even) click and fires odd or even click method
* when odd card is clicked game pushes it to opened card array
* when even card is clicked game compares this card with array of opened cards and sets style. When cards match game pushes last opened card to array of opened cards. When cards don't match game removes 2 last cards from array of opened cards.
* when array of opened cards is 16 game shows popup with time, moves and stars rating

## Rules

Check all similar cards as fast as You can. When two cards match game should show them with green background. Otherwise game will hide not matching cards.
