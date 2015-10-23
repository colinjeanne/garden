import AppHeader from './appHeader';
import CalendarPage from './calendarPage';
import Constants from '../constants/constants';
import PlantCalendarList from './plantCalendarList';
import PlantsViewPage from './plantsViewPage';
import React from 'react';
import SignInPage from './signInPage';
import TabbedNavigation from './tabbedNavigation';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            viewPage: Constants.PLANTS_PAGE
        };
    }
    
    componentDidMount() {
        UserStore.addChangeListener(
            this.handleUserStoreChange.bind(this));
    }
    
    componentWillUnmount() {
        UserStore.removeChangeListener(this.handleUserStoreChange);
    }
    
    handleUserStoreChange() {
        this.setState({
            displayName: UserStore.getDisplayName()
        });
    }
    
    handleTabSelected(tabId) {
        NavigationActions.showPage(tabId);
    }
    
    render() {
        let displayName;
        let content;
        if (UserStore.isUserSignedIn()) {
            displayName = UserStore.getDisplayName();
            
            let page;
            switch (NavigationStore.getCurrentPage()) {
                case Constants.CALENDAR_PAGE:
                    page = <CalendarPage
                        plantNames={PlantStore.getAllPlantNames()}
                        currentDate="2015-09-30T11:59:59-08:00" />;
                    break;
                
                case Constants.PLANTS_PAGE:
                    page = <PlantsViewContainer />;
                    break;
                
                case Constants.PLANTING_SUMMARY_PAGE:
                    break;
                
                case Constants.SPACE_PLANNING_PAGE:
                    break;
            }
            
            content = (
                <section>
                    <TabbedNavigation
                        id="mainNavigation"
                        tabs={NavigationStore.getAllPages()}
                        onSelect={this.handleTabSelected.bind(this)} />
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
                <AppHeader displayName={displayName} />
                {content}
            </div>
        );
    }
}