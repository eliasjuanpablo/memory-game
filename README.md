# Memory Game

This project was heavily inspired by [this frontendmentor's challenge](https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM). Please note it's not pixel perfect because of premium access reasons.

## Live Demo

You can test it live [here](https://frontendmentor-memory-game.netlify.app/)

## Running it locally

Install dependencies with `npm install`

Start local development server with `npm start`

## Design decisions

Even though this is a fairly simple game, a few design decisions were made:

- The domain is handled by a class called `GameManager`, which encapsulates the game's rules and exposes a set of public methods for client code interaction purposes. The latter (i.e. the `App` component) is responsible for representing the current game state and handling user interaction. This aims to decouple presentation from domain rules, and I'm sure it can be improved (`App` seems a bit busy but I didn't want it to get too overengineered).

- The `App` component doesn't interact directly with `GameManager` but through a custom hook called `useGameManager` which allows rerendering everytime the game's internal state is changed.

- The game rules could've lived inside the custom hook, but it's considerably easier to unit test a plain object state/methods. My goal was to finish the game's logic before even showing a decent grid on the screen.

- The `App` component receives optional props that can override the default `GameManager`, so that it's easier to test and hipothetically allow it to interact with different rules (e.g. another "GameManager" class that would implement the same interface but would have other rules). It's meant to be a simplistic dependency injection mechanism.

- If you get considerably inspired, the `GameManager` class could live on a server, and the presentational code wouldn't notice the change as the communication would happen inside the custom hook. One or two tweaks should allow it to become a multiplayer online game.
