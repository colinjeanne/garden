import AppHeader from './appHeader';
import CalendarPageContainer from './calendarPageContainer';
import Constants from '../constants/constants';
import PlantsViewContainer from './plantsViewContainer';
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
                    page = <CalendarPageContainer />;
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
                        onSelect={this.handleTabSelected.bind(this)}
                        tabs={NavigationStore.getAllPages()} />
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