import {NavigationActions} from 'react-navigation';


let navigator ;


export const setNavigator = (Nav) => {
    navigator = Nav;
};


export const navigate = (routeName,params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName:routeName,
            params:params
        })
    );
};