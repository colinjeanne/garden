import Constants from '../constants/constants';
import NavigationStore from '../stores/navigationStore';
import PlantCalendarList from './plantCalendarList';
import PlantsViewPage from './plantsViewPage';
import React from 'react';
import TabbedNavigation from './tabbedNavigation';

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
    }
    
    componentWillUnmount() {
        NavigationStore.removeChangeListener(this.handleNavigationStoreChange);
    }
    
    handleNavigationStoreChange() {
        this.setState({
            viewPage: NavigationStore.getCurrentPage()
        });
    }
    
    render() {
        let page;
        switch (this.state.viewPage) {
            case Constants.CALENDAR_PAGE:
                break;
            
            case Constants.PLANTS_PAGE:
                page = <PlantsViewPage id="content" />;
                break;
            
            case Constants.PLANTING_SUMMARY_PAGE:
                break;
            
            case Constants.SPACE_PLANNING_PAGE:
                break;
        }
        
        return (
            <section>
                <TabbedNavigation
                    id="mainNavigation"
                    tabs={NavigationStore.getAllPages()} />
                {page}
            </section>
        );
    }
}