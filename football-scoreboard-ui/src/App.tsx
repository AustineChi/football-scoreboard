import { useScoreboard } from './hooks/useScoreboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scoreboard from './components/scoreboard/Scoreboard.component';
import Summary from './components/summary/Summary.component';
import MatchForm from './components/match/MatchForm.component';

function App() {
  const { scoreboard, addMatch, updateMatchScore, finishMatchById } =
    useScoreboard();

  return (
    <div className="container mx-auto max-w-[770px] p-6">
      <h1 className="text-4xl font-bold text-center my-6">
        Football Scoreboard
      </h1>

      <ToastContainer />

      <MatchForm onAddMatch={addMatch} />

      <Scoreboard
        matches={scoreboard.matches}
        onUpdateScore={updateMatchScore}
        onFinishMatch={finishMatchById}
      />

      <Summary matches={scoreboard.matches} />
    </div>
  );
}

export default App;
