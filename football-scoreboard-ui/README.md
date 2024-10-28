# Football Scoreboard UI

This application is built with **React**, **TypeScript**, and **Vite**. It provides an interface for managing live football match scores.

## Features

- **Add Matches**: Start new matches by entering team names.
- **Update Scores**: Modify scores for ongoing matches.
- **Finish Matches**: Mark matches as finished and remove them from the scoreboard.
- **Match Summary**: View ongoing matches sorted by total score.

## Installation

Run the following command to install dependencies:

```bash
pnpm install
```

## Development

- **Start the Development Server**:

   ```bash
   pnpm run dev
   ```

   Access the application at [http://localhost:5173/](http://localhost:5173/).

- **Build the Project**:

   ```bash
   pnpm run build
   ```

- **Preview the Production Build**:

   ```bash
   pnpm run preview
   ```

## ESLint Configuration

For production apps, consider updating the ESLint config for type-aware linting:

1. Configure `parserOptions` in your ESLint config:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

2. Use `tseslint.configs.recommendedTypeChecked` or `strictTypeChecked`, and install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react).

## License

MIT License.