import { render, screen } from '@testing-library/react';

import VideoPlayer from './video-player';
import { films } from '../../mocks/films';

describe('Component: AudioPlayer', () => {
  it('should render correctly', () => {
    const film = films[0];

    render(<VideoPlayer isPlaying {...film} />);

    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toHaveAttribute('src', film.previewVideoLink);
    expect(screen.getByTestId('video')).toHaveAttribute('poster', film.previewImage);
  });
});
