# Football Scoreboard Library

A TypeScript library for managing football matches, including creating, updating scores, finishing matches, and generating a summary. This library is part of a `pnpm`-managed monorepo.

## Installation

To install the library within the monorepo, use:

```bash
pnpm install
```

## Usage

### Creating a Match

```typescript
import { createMatch } from "football-scoreboard-library/core/match";

const match = createMatch("Team A", "Team B");
```

### Updating a Match Score

```typescript
import { updateScore } from "football-scoreboard-library/core/scoreboard";

updateScore(matches, matchId, 2, 1);
```

### Finishing a Match

```typescript
import { finishMatch } from "football-scoreboard-library/core/match";

finishMatch(matches, matchId);
```

### Getting a Summary

```typescript
import { getSummary } from "football-scoreboard-library/core/summary";

const summary = getSummary(matches);
```

## Project Structure

```
/src/
  /core/
    /match/
    /scoreboard/
    /summary/
    /utils/
```

## Monorepo Setup

This library is part of a `pnpm`-managed monorepo. To install dependencies across the workspace:

```bash
pnpm install
```

### Building the Library

To build the library:

```bash
pnpm run build
```

## Development

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Build the project**:

   ```bash
   pnpm run build
   ```

3. **Run tests**:

   ```bash
   pnpm run test
   ```

## License

MIT License.
