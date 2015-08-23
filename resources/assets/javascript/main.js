import PlantCalendarList from './components/plantCalendarList';
import PlantsViewPage from './components/plantsViewPage';
import React from 'react';
import TabbedNavigation from './components/tabbedNavigation';

const signinCallback = () => {};

const mainNavigation = [
    {
        key: 'calendar',
        title: 'Calendar',
        handleSelect: () => {}
    },
    {
        key: 'plants',
        title: 'Plants',
        handleSelect: () =>
            React.render(
                <PlantsViewPage />,
                document.getElementById('content')
            )
    },
    {
        key: 'plantingSummary',
        title: 'Planting Summary',
        handleSelect: () => {}
    },
    {
        key: 'spacePlanning',
        title: 'Space Planning',
        handleSelect: () => {}
    },
];

React.render(
    <TabbedNavigation data={mainNavigation} />,
    document.getElementById('mainNavigation')
);

window.signinCallback = signinCallback;
