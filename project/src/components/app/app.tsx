import MainScreen from '../../pages/main-screen/main-screen';
import { Film } from '../../types/film';

type AppProps = {
  films: Film[];
};

const App = ({ films }: AppProps): JSX.Element => (
  <MainScreen films={films} />
);

export default App;
