import AppHeader from './appHeader';
import CalendarPageContainer from './calendarPageContainer';
import CompanionPage from './companionPage';
import Constants from '../constants/constants';
import PlantsViewContainer from './plantsViewContainer';
import React from 'react';
import SignInPage from './signInPage';
import SummaryPageContainer from './summaryPageContainer';
import TabbedNavigation from './tabbedNavigation';

const app = props => {
    let content;
    if (props.displayName) {
        let page;
        switch (props.page) {
            case Constants.pages.CALENDAR:
                page = <CalendarPageContainer />;
                break;
            
            case Constants.pages.PLANTS:
                page = <PlantsViewContainer />;
                break;
            
            case Constants.pages.PLANTING_SUMMARY:
                page = <SummaryPageContainer />;
                break;
            
            case Constants.pages.SPACE_PLANNING:
                page = <CompanionPage />;
                break;
        }
        
        content = (
            <section>
                <TabbedNavigation
                    id="mainNavigation"
                    onSelect={props.onTabSelected}
                    tabs={Constants.pages} />
                {page}
            </section>
        );
    } else {
        content = (
            <section>
                <SignInPage />
            </section>
        );
    }
    
    return (
        <div>
            <AppHeader displayName={props.displayName} />
            {content}
        </div>
    );
};

app.propTypes = {
    displayName: React.PropTypes.string,
    onTabSelected: React.PropTypes.func.isRequired,
    page: React.PropTypes.string.isRequired,
};

export default app;