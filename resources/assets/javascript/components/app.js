import AppHeader from './appHeader';
import CalendarPage from './calendarPage';
import CalendarStore from '../stores/calendarStore';
import Constants from '../constants/constants';
import NavigationActions from '../actions/navigationActions';
import NavigationStore from '../stores/navigationStore';
import PlantActions from '../actions/plantActions';
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
        CalendarStore.addChangeListener(
            this.handleCalendarStoreChange.bind(this));
        
        NavigationStore.addChangeListener(
            this.handleNavigationStoreChange.bind(this));
        
        PlantStore.addChangeListener(this.handlePlantStoreChange.bind(this));
        
        UserStore.addChangeListener(
            this.handleUserStoreChange.bind(this));
    }
    
    componentWillUnmount() {
        CalendarStore.removeChangeListener(this.handleCalendarStoreChange);
        
        NavigationStore.removeChangeListener(this.handleNavigationStoreChange);
        
        PlantStore.removeChangeListener(this.handlePlantStoreChange);
        
        UserStore.removeChangeListener(this.handleUserStoreChange);
    }
    
    handleCalendarStoreChange() {
        this.forceUpdate();
    }
    
    handleNavigationStoreChange() {
        this.setState({
            viewPage: NavigationStore.getCurrentPage(),
            selectedPlantName: NavigationStore.getSelectedPlantName(),
            filterString: NavigationStore.getFilterString(),
            sortType: NavigationStore.getSortType()
        });
    }
    
    handlePlantStoreChange() {
        this.setState({
            plants: PlantStore.getAll(),
            selectedPlantName: NavigationStore.getSelectedPlantName()
        });
    }
    
    handleUserStoreChange() {
        this.setState({
            displayName: UserStore.getDisplayName()
        });
    }
    
    handleTabSelected(tabId) {
        NavigationActions.showPage(tabId);
    }
    
    handleAddPlant(plantName) {
        PlantActions.createPlant(plantName);
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
                    page = <PlantsViewPage
                        plants={PlantStore.getAll()}
                        selectedPlantName={NavigationStore.getSelectedPlantName()}
                        filterString={NavigationStore.getFilterString()}
                        sortType={NavigationStore.getSortType()}
                        onAddPlant={this.handleAddPlant.bind(this)} />;
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