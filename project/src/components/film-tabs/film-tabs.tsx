import { useState } from 'react';
import { Film } from '../../types/film';
import FilmTabsOverview from '../film-tabs-overview/film-tabs-overview';
import FilmTabsDetails from '../film-tabs-details/film-tabs-details';
import FilmTabsReviews from '../film-tabs-reviews/film-tabs-reviews';

type FilmTabsProps = {
  film: Film;
}

const FilmTabs = ({ film }: FilmTabsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { name: 'overview', title: 'Overview', },
    { name: 'details', title: 'Details', },
    { name: 'reviews', title: 'Reviews', },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <FilmTabsOverview {...film} />;
      case 'details': return <FilmTabsDetails {...film} />;
      case 'reviews': return <FilmTabsReviews id={film.id} />;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabs.map((item) => (
            <li
              key={item.name}
              className={`film-nav__item ${item.name === activeTab ? 'film-nav__item--active' : ''}`}
            >
              <button
                key={item.name}
                className={'film-nav__link'}
                onClick={() => setActiveTab(item.name)}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {renderTab()}
    </div >
  );
};

export default FilmTabs;
