import AppHeader from './appHeader';
import Constants from '../constants/constants';
import NavigationStore from '../stores/navigationStore';
import PlantCalendarList from './plantCalendarList';
import PlantStore from '../stores/plantStore';
import PlantsViewPage from './plantsViewPage';
import React from 'react';
import SignInPage from './signInPage';
import TabbedNavigation from './tabbedNavigation';
import UserStore from '../stores/userStore';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            viewPage: Constants.PLANTS_PAGE
        };
    }
    
    componentDidMount() {
        NavigationStore.addChangeListener(
            this.handleNavigationStoreChange.bind(this));
        
        PlantStore.addChangeListener(this.handlePlantStoreChange.bind(this));
        
        UserStore.addChangeListener(
            this.handleUserStoreChange.bind(this));
    }
    
    componentWillUnmount() {
        NavigationStore.removeChangeListener(this.handleNavigationStoreChange);
        
        PlantStore.removeChangeListener(this.handlePlantStoreChange);
        
        UserStore.removeChangeListener(this.handleUserStoreChange);
    }
    
    handleNavigationStoreChange() {
        this.setState({
            viewPage: NavigationStore.getCurrentPage()
        });
    }
    
    handlePlantStoreChange() {
        this.setState({
            plants: PlantStore.getAll()
        });
    }
    
    handleUserStoreChange() {
        this.setState({
            displayName: UserStore.getDisplayName()
        });
    }
    
    render() {
        let displayName;
        let content;
        if (UserStore.isUserSignedIn()) {
            displayName = UserStore.getDisplayName();
            
            let page;
            switch (NavigationStore.getCurrentPage()) {
                case Constants.CALENDAR_PAGE:
                    break;
                
                case Constants.PLANTS_PAGE:
                    page = <PlantsViewPage
                        plants={PlantStore.getAll()}
                        id="content" />;
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