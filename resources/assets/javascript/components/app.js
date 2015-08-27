import NavigationStore from '../stores/navigationStore';
import PlantCalendarList from './plantCalendarList';
import PlantsViewPage from './plantsViewPage';
import React from 'react';
import TabbedNavigation from './tabbedNavigation';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            viewPage: 'plants'
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
        if (this.state.viewPage === 'plants') {
            page = <PlantsViewPage id="content" />
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